from langgraph.graph import START, END, StateGraph
from langgraph.checkpoint.memory import MemorySaver

from .state import GenerateAnalystsState
from .nodes.create_analysts import create_analysts
from .nodes.human_feedback import human_feedback


def should_continue(state: GenerateAnalystsState):
    """Return the next node to execute"""

    # Check if human feedback
    human_analyst_feedback = state.get("human_analyst_feedback", None)
    if human_analyst_feedback:
        return "create_analysts"

    # Otherwise, end
    return END


builder = StateGraph(GenerateAnalystsState)
builder.add_node("create_analysts", create_analysts)
builder.add_node("human_feedback", human_feedback)
builder.add_edge(START, "create_analysts")
builder.add_edge("create_analysts", "human_feedback")
builder.add_conditional_edges(
    "human_feedback", should_continue, ["create_analysts", END]
)


memory = MemorySaver()
graph = builder.compile(
    interrupt_before=["human_feedback"], checkpointer=memory
)
