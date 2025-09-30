import logging
from typing import Literal

from agents.supervisor_agent.state import SupervisorState
from common.constants import StatusCode
from common.errors.graph import GraphErrorCode, GraphErrorMessage
from common.exceptions.graph import GraphException
from langchain_core.messages import AIMessage
from langgraph.types import Command
from services import auth_service

from .agent import create_order_agent
from .state import OrderAgentState


def create_agent_node(llm, checkpointer=None):
    """
    Create a subgraph for the order agent.
    This subgraph is responsible for handling get orders

    Args:
        llm: The language model to be used by the order agent.
    """
    order_agent = create_order_agent(llm, checkpointer)

    def node(state: SupervisorState) -> Command[Literal["supervisor_agent"]]:
        """Create a order agent node."""

        # Validate query intent
        query_intent = state.get("query_intent")
        if query_intent != "order":
            logging.error(f"Delegate to order agent but the intent is not order, it is: {query_intent}")
            raise GraphException(
                status_code=StatusCode.BAD_REQUEST,
                error_code=GraphErrorCode.WRONG_DELEGATION,
                message=GraphErrorMessage.WRONG_DELEGATION,
            )

        # Get user by ID
        user_id = state.get("user_id")
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

        user = auth_response.data["user"]

        # extract necessary state information for the order agent
        order_state: OrderAgentState = {
            "user": user,
            "messages": state.get("messages", []),
        }
        order_agent_response = order_agent.invoke(order_state)
        supervisor_state_update = {
            "messages": [AIMessage(content=order_agent_response["messages"][-1].content, name="order_agent")],
        }

        # Update the next step in the state if tool request to finish --> deliver to user action
        if order_agent_response.get("next") == "FINISH":
            supervisor_state_update["next"] = order_agent_response.get("next")

        return Command(update=supervisor_state_update, goto="supervisor_agent")

    return node
