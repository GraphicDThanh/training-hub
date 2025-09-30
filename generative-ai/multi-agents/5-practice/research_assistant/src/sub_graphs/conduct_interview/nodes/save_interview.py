from langchain_core.messages import get_buffer_string
from ..state import InterviewState


def save_interview(state: InterviewState):
    """ Save interviews """
    # Get state
    messages = state["messages"]

    # Convert interview to a string
    interview = get_buffer_string(messages)

    # Save to interviews key
    return {"interview": interview}