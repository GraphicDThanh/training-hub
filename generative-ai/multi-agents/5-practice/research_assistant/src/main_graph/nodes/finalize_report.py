from langchain_core.messages import SystemMessage, HumanMessage

from utils.foundation_models import gpt_4o_mini
from ..state import ResearchGraphState
from ..prompts import intro_conclusion_instructions


def finalize_report(state: ResearchGraphState):
    """ This is the "reduce" step where we gather all the section, combine them, and reflect on them to write the intro/conclusion """

    # Save full final report
    content = state["content"]
    if content.startswith("### Insights"):
        content = content.strip("### Insights")

    if "### Sources" in content:
        try:
            content, sources = content.split("\n## Sources\n")
        except:
            sources = None
    else:
        sources = None

    final_report = state["introduction"] + "\n\n---\n\n" + content + "\n\n---\n\n" + state["conclusion"]

    if sources is not None:
        final_report += "\n\n## Sources\n" + sources

    return {"final_report": final_report}