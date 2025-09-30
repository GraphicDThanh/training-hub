from typing import List
from typing_extensions import TypedDict
from utils.pydantic_models import Analyst


class GenerateAnalystsState(TypedDict):
    """State of graph generate analysts."""
    topic: str  # Research topic
    max_analysts: int  # Number of analysts
    analysts: List[Analyst]  # list of analysts join research team
    human_analyst_feedback: str  # Allow human feedback to update the list of analyst
