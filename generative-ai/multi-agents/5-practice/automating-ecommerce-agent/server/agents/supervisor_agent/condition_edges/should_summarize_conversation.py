from typing import Literal
from ..state import SupervisorState as State


def should_summarize_conversation(state: State) -> Literal["summarize_conversation", "supervisor_agent"]:
    # (mocking)
    return "summarize_conversation"

    # # Handle summarization
    # messages = state["messages"]

    # if len(messages) <= 6:
    #     return "supervisor_agent"

    # return "summarize_conversation"