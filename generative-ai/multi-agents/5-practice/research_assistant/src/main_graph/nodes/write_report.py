from langchain_core.messages import SystemMessage, HumanMessage

from utils.foundation_models import gpt_4o_mini
from ..state import ResearchGraphState
from ..prompts import report_writer_instructions


def write_report(state: ResearchGraphState):
    """ Node help to write report """
    # Full set of sections
    sections = state["sections"]
    topic = state["topic"]

    # Concat all sections together
    formatted_str_sections = "\n\n".join([f"{section}" for section in sections])

    # Summarize the sections into a final report
    system_message = report_writer_instructions.format(
        topic=topic,
        context=formatted_str_sections
    )
    report = gpt_4o_mini.invoke(
        [SystemMessage(content=system_message)]
        + [HumanMessage(content=f"Write a report based upon these memos.")]
    )

    return {"content": report.content}