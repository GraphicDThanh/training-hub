from langchain_core.messages import SystemMessage, HumanMessage

from utils.foundation_models import gpt_4o_mini
from utils.pydantic_models import Perspectives
from ..state import GenerateAnalystsState
from ..prompts import analyst_instructions


def create_analysts(state: GenerateAnalystsState):
    """Create analysts"""

    topic = state["topic"]
    max_analysts = state["max_analysts"]
    human_analyst_feedback = state.get("human_analyst_feedback", "")

    # Enforce structured output
    structured_llm = gpt_4o_mini.with_structured_output(Perspectives)

    # System message
    system_message = analyst_instructions.format(
        topic=topic,
        human_analyst_feedback=human_analyst_feedback,
        max_analysts=max_analysts,
    )

    # Generate question
    analysts = structured_llm.invoke(
        [SystemMessage(content=system_message)]
        + [HumanMessage(content="Generate the set of analysts.")]
    )

    # Write the list of analysts to state
    return {"analysts": analysts.analysts}
