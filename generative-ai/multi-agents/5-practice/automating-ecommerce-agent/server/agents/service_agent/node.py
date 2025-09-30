from typing import Literal

from agents.supervisor_agent.state import SupervisorState
from langchain_core.messages import AIMessage
from langgraph.types import Command
from common.constants import StatusCode
from common.errors.graph import GraphErrorCode, GraphErrorMessage
from common.exceptions.graph import GraphException
import logging

from .agent import create_service_agent
from .state import ServiceAgentState


def create_agent_node(llm, checkpointer=None):
    service_agent = create_service_agent(llm, checkpointer)

    def node(state: SupervisorState) -> Command[Literal["supervisor_agent"]]:
        """Create a service agent node."""
        query_intent = state.get("query_intent")

        if query_intent != "service":
            logging.error(f"Delegate to service agent but the intent is not service, it is: {query_intent}")
            raise GraphException(
                status_code=StatusCode.BAD_REQUEST,
                error_code=GraphErrorCode.WRONG_DELEGATION,
                message=GraphErrorMessage.WRONG_DELEGATION
            )

        service_state: ServiceAgentState = {
            "messages": state.get("messages", []),
        }
        service_agent_response = service_agent.invoke(service_state)
        supervisor_state_update = {
            "messages": [
                AIMessage(content=service_agent_response["messages"][-1].content, name="service_agent")
            ],
        }

        # Update the next step in the state if tool request to finish --> deliver to user action
        if service_agent_response.get("next") == "FINISH":
            supervisor_state_update["next"] = service_agent_response.get("next")

        return Command(update=supervisor_state_update, goto="supervisor_agent")

    return node
