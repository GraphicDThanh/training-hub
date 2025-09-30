from typing import Any, Dict, List, Literal, Optional

from common.utils import read_prompt
from langchain_core.messages import AIMessage
from langgraph.graph import END
from langgraph.types import Command

from .agent import create_supervisor_agent
from .state import SupervisorState as State

DELEGATION_TARGETS = Literal[
    "service_agent",
    "product_agent",
    "customer_agent",
    "cart_agent",
    "order_agent",
    "__end__",
]
RESTRICTED_AGENTS = ["customer_agent", "cart_agent", "order_agent"]


def create_supervisor_agent_node(llm, user=None):
    """
    Returns a supervisor agent node function for the agent graph.
    Handles user state, delegates to the appropriate agent, and manages conversation flow.
    """

    def prepare_messages(state: State) -> List[Dict[str, str]]:
        """Prepare messages for the LLM by adding the system prompt"""
        messages = state.get("messages", [])
        prompt = read_prompt("agents/supervisor_agent/prompt.md")
        messages = [
            {"role": "system", "content": prompt},
            *messages,
        ]
        return messages

    def determine_next_step(
        supervisor_response, state: State, user: Optional[Any]
    ) -> tuple[str, Dict[str, Any]]:
        """Determine the next step based on the router's decision and current state."""
        state_update = {}
        delegate = supervisor_response.delegate
        query_intent = supervisor_response.query_intent

        if query_intent in ["greeting", "unknown"]:
            goto = END

            if supervisor_response.reply_unknown:
                state_update["messages"] = [
                    AIMessage(
                        content=supervisor_response.reply_unknown,
                        name="supervisor_agent",
                    )
                ]

            if supervisor_response.reply_greeting:
                state_update["messages"] = [
                    AIMessage(
                        content=supervisor_response.reply_greeting,
                        name="supervisor_agent",
                    )
                ]
        elif delegate == "FINISH" or state.get("next") == "FINISH":
            goto = END

            if "query_intent" in state:
                state_update["query_intent"] = None
        elif not user and delegate in RESTRICTED_AGENTS:
            goto = END
            state_update["messages"] = [
                AIMessage(
                    content="You need to be logged in to access this feature.",
                    name="supervisor_agent",
                )
            ]
        else:
            goto = delegate
            state_update["query_intent"] = query_intent

        state_update["next"] = goto
        return goto, state_update

    def node(
        state: State,
    ) -> Command[DELEGATION_TARGETS]:
        supervisor_agent = create_supervisor_agent(llm)
        messages = prepare_messages(state)
        supervisor_response = supervisor_agent.invoke(messages)
        goto, state_update = determine_next_step(supervisor_response, state, user)

        return Command(goto=goto, update=state_update)

    return node
