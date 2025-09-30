from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, StateGraph, START
from langgraph.prebuilt import tools_condition

from utils.utils import create_tool_node_with_fallback
from .state import State
from .agent import Assistant, assistant_runnable, tools

builder = StateGraph(State)

# Define nodes: these do the work
builder.add_node("assistant", Assistant(runnable=assistant_runnable))
builder.add_node("tools", create_tool_node_with_fallback(tools))
# Define edges: these determine how the control flow moves
builder.add_edge(START, "assistant")
builder.add_conditional_edges("assistant", tools_condition)
builder.add_edge("tools", "assistant")

memory = MemorySaver()
graph = builder.compile(checkpointer=memory)