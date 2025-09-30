from langgraph.constants import Send
from langchain_core.messages import HumanMessage

from ..state import ResearchGraphState


def initiate_all_interviews(state: ResearchGraphState):
    """ This is the "map" step where we run each interview in sub-graph using Send API """

    # Check if human feedback
    human_analyst_feedback = state.get("human_analyst_feedback")
    if human_analyst_feedback:
        # Return to create_analysts
        return "create_analysts"

    # Otherwise, kick off interviews in parallel via Send() APO
    else:
        topic = state["topic"]
        return [
            Send(
                "conduct_interview",
                {
                    "analyst": analyst,
                    "messages": [HumanMessage(content=f"So you said you are writing an article on {topic}")]
                }
            ) for analyst in state["analysts"]
        ]