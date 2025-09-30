from typing import Literal

from langchain_core.messages import AIMessage
from langgraph.types import Command
from services import auth_service
from agents.supervisor_agent.state import SupervisorState
from .agent import create_customer_agent
from .state import CustomerAgentState


def create_agent_node(llm, checkpointer=None):
    """Create a sub-agent node."""
    customer_agent = create_customer_agent(llm, checkpointer)


    def node(state: SupervisorState) -> Command[Literal["supervisor_agent"]]:
        """Create a customer agent node."""
        user_id = state.get("user_id")

        # Get user by id:
        auth_response = auth_service.get_user_by_id(user_id)

        if not auth_response.success:
            return Command(update={
            "messages": [
                AIMessage(
                    content=f"User with ID: {user_id} not found. Please help login again.",
                    name="customer_agent",
                )
            ],
        }, goto="supervisor_agent")

        user = auth_response.data["user"]

        customer_state: CustomerAgentState = {
            "user": user,
            "messages": state.get("messages", []),
        }
        customer_agent_response = customer_agent.invoke(customer_state)

        # Update the state with the result of the customer agent
        supervisor_state_update = {
            "messages": [
                AIMessage(
                    content=customer_agent_response["messages"][-1].content,
                    name="customer_agent",
                )
            ],
        }

        if customer_agent_response.get("cart_checkout_user_data"):
            supervisor_state_update["cart_checkout_user_data"] = (
                customer_agent_response["cart_checkout_user_data"]
            )

        # Update the next step in the state if tool request to finish --> deliver to user action
        if customer_agent_response.get("next") == "FINISH":
            supervisor_state_update["next"] = customer_agent_response.get("next")

        return Command(update=supervisor_state_update, goto="supervisor_agent")

    return node
