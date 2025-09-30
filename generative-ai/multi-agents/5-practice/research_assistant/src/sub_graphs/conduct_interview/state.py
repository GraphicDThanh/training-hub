import operator
from typing import  Annotated
from langgraph.graph import MessagesState

from utils.pydantic_models import Analyst


class InterviewState(MessagesState):
    """State of sub-graph: conduct interview."""
    sections: list  # Final key we duplicate in outer state for Send() API
    analyst: Analyst  # analyst asking questions
    interview: str  # Interview transcript
    context: Annotated[list, operator.add]  # Source docs
    max_num_turns: int  # Number turns of conversation

