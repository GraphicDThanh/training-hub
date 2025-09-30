from langchain_core.messages import SystemMessage

from utils.foundation_models import gpt_4o_mini
from ..state import InterviewState
from ..prompts import answer_instructions


def generate_answer(state: InterviewState):
    """ Node to answer a question """

    # Get state
    analyst = state["analyst"]
    messages = state["messages"]
    context = state["context"]

    # Answer question
    system_message = answer_instructions.format(
        goals=analyst.persona,
        context=context
    )
    answer = gpt_4o_mini.invoke([SystemMessage(content=system_message)] + messages)

    # Name the message as config from the expert
    answer.name = "expert"

    # Append it to state
    return {"messages": [answer]}

