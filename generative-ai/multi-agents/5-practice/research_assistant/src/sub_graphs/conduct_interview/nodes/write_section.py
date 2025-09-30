from langchain_core.messages import SystemMessage, HumanMessage
from langgraph.graph import StateGraph

from utils.foundation_models import gpt_4o_mini
from ..state import InterviewState
from ..prompts import section_writer_instructions
from .generate_question import generate_question


def write_section(state: InterviewState):
    """ Node to answer a question """

    # Get state
    interview = state["interview"]
    context = state["context"]
    analyst = state["analyst"]

    # Write section using either the gathered source docs from interview (context) or the interview itself (interview)
    system_message = section_writer_instructions.format(focus=analyst.description)
    section = gpt_4o_mini.invoke(
        [SystemMessage(content=system_message)]
        + [HumanMessage(content=f"Use this source to write your section: {context}")]
    )

    # Append it to state
    return {"section": section.content}