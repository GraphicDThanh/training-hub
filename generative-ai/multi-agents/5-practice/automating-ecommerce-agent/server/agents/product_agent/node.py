import logging
from typing import Literal

from agents.supervisor_agent.state import SupervisorState
from common.constants import StatusCode
from common.errors.graph import GraphErrorCode, GraphErrorMessage
from common.exceptions.graph import GraphException
from langchain_core.messages import AIMessage
from langgraph.types import Command

from .agent import create_product_agent
from .state import ProductAgentState


def create_agent_node(llm, checkpointer=None):
    product_agent = create_product_agent(llm, checkpointer)

    def node(state: SupervisorState, config=None) -> Command[Literal["supervisor_agent"]]:
        """Create a product agent node."""
        query_intent = state.get("query_intent")

        if query_intent not in ["product", "cart"]:
            logging.error(f"Delegate to product agent but the intent is not product or cart, it is: {query_intent}")
            raise GraphException(
                status_code=StatusCode.BAD_REQUEST,
                error_code=GraphErrorCode.WRONG_DELEGATION,
                message=GraphErrorMessage.WRONG_DELEGATION,
            )

        # extract necessary state information for the product agent
        product_state: ProductAgentState = {
            "query_intent": state.get("query_intent"),
            "messages": state.get("messages", []),
        }
        if config:
            product_agent_response = product_agent.invoke(product_state, config)
        else:
            product_agent_response = product_agent.invoke(product_state)

        supervisor_state_update = {
            "messages": [
                AIMessage(
                    content=product_agent_response["messages"][-1].content,
                    name="product_agent",
                )
            ]
        }

        if product_agent_response.get("product_retrieved_intermediate_step"):
            supervisor_state_update["product_retrieved_intermediate_step"] = product_agent_response[
                "product_retrieved_intermediate_step"
            ]

        return Command(update=supervisor_state_update, goto="supervisor_agent")

    return node
