from langchain_core.messages import SystemMessage, HumanMessage

from utils.foundation_models import gpt_4o_mini
from ..state import ResearchGraphState
from ..prompts import intro_conclusion_instructions


def write_conclusion(state: ResearchGraphState):
    # Full set of sections
    sections = state["sections"]
    topic = state["topic"]

    # Concat all sections together
    formatted_str_sections = "\n\n".join([f"{section}" for section in sections])

    # Summarize the sections into a final report

    instructions = intro_conclusion_instructions.format(topic=topic, formatted_str_sections=formatted_str_sections)
    conclusion = gpt_4o_mini.invoke(
        [SystemMessage(content=instructions)]
        + [HumanMessage(content="Write the report conclusion")]
    )
    return {"conclusion": conclusion.content}