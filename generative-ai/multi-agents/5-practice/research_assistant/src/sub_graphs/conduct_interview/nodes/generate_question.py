from langchain_core.messages import SystemMessage

from utils.foundation_models import gpt_4o_mini
from ..state import InterviewState
from ..prompts import question_instructions


def generate_question(state: InterviewState):
    """ Node to generate a question """

    # Get state
    analyst = state["analyst"]
    messages = state["messages"]

    # Generate question
    system_message = question_instructions.format(goals=analyst.persona)
    # from remote_pdb import RemotePdb
    # RemotePdb('127.0.0.1', 4444).set_trace()

    # print("system_message::", system_message)
    # print("messages::", messages)
    question = gpt_4o_mini.invoke([SystemMessage(content=system_message)]+messages)

    # print("question::", question)
    # Write message to state
    return {"messages": [question]}