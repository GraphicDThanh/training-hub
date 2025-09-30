from typing import Literal

from agents.supervisor_agent.state import SupervisorState
from common.constants import StatusCode
from common.errors.graph import GraphErrorCode, GraphErrorMessage
from common.exceptions.graph import GraphException
from langchain_core.messages import AIMessage
from langgraph.types import Command
from services import auth_service

from .agent import create_cart_agent as create_agent
from .state import CartAgentState


def create_agent_node(llm, checkpointer=None):
    """Create a cart agent node function that handles user cart operations.

    Args:
        llm: Language model instance to use for the cart agent
        checkpointer (optional): Checkpointer instance for persistence. Defaults to None.

    Returns:
        callable: A node function that processes cart operations and returns a Command.
            The node function takes a State argument and returns a Command targeting
            the supervisor agent.

    Raises:
        ValueError: If user_id is not present in the state.

    The node function:
    - Extracts user_id and query_intent from the state
    - Creates a customer state with user info and query intent
    - Invokes the cart agent to process the request
    - Returns a Command with:
        - Updated state containing cart agent messages
        - Next step targeting supervisor_agent
        - Optional FINISH flag to end conversation

    Note:
        Currently contains a temporary fix allowing sub-agent to force conversation end
        rather than leaving that control to the supervisor agent.
    """
    agent = create_agent(llm, checkpointer)

    def node(state: SupervisorState, config=None) -> Command[Literal["supervisor_agent"]]:
        """Create a cart-agent node."""
        # Validate user for authorized agent
        user_id = state.get("user_id")
        if not user_id:
            raise ValueError("User ID is required to create a cart agent.")

        active_cart = state.get("active_cart")
        if not active_cart:
            raise ValueError("User's active cart is required to use cart agent.")

        auth_response = auth_service.get_user_by_id(user_id)
        if not auth_response.success:
            return Command(
                update={
                    "messages": [
                        AIMessage(
                            content=f"User with ID: {user_id} not found. Please help login again.",
                            name="customer_agent",
                        ),
                    ],
                },
                goto="supervisor_agent",
            )

        # Validate query intent
        query_intent = state.get("query_intent")
        if query_intent != "cart":
            raise GraphException(
                status_code=StatusCode.BAD_REQUEST,
                error_code=GraphErrorCode.WRONG_DELEGATION,
                message=GraphErrorMessage.WRONG_DELEGATION,
            )

        # Determine cart state
        cart_agent_state: CartAgentState = {
            "active_cart": active_cart,
            "product_retrieved_intermediate_step": state.get(
                "product_retrieved_intermediate_step",
            ),
            "cart_checkout_user_data": state.get("cart_checkout_user_data"),
            "messages": state.get("messages", []),
        }

        result = agent.invoke(cart_agent_state, config) if config else agent.invoke(cart_agent_state)
        state_update = {
            "messages": [AIMessage(content=result["messages"][-1].content, name="cart_agent")],
        }

        # FIXME: This allow state update to end conversation
        # In theory, the supervisor should know when to end the conversation.
        # But for now, supervisor not able to do that cause infinity loop calling to sub-agent
        # So that, this where we force to finish from sub-agent to fix the issue.
        if result.get("next") == "FINISH":
            state_update["next"] = result.get("next")

        return Command(update=state_update, goto="supervisor_agent")

    return node
