from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, StateGraph, START
from langgraph.prebuilt import tools_condition

from tools.users.fetch_user_flight_information import fetch_user_flight_information
from utils.utils import create_tool_node_with_fallback
from .state import State
from .agent import Assistant, assistant_runnable, safe_tools, sensitive_tools, sensitive_tool_names

builder = StateGraph(State)

def user_info(state: State):
    return {"user_info": fetch_user_flight_information.invoke({})}

def route_tools(state: State):
    next_node = tools_condition(state)

    if next_node == END:
        return END

    ai_message = state["messages"][-1]
    first_tool_call = ai_message.tool_calls[0]
    if first_tool_call["name"] in sensitive_tool_names:
        return "sensitive_tools"

    return "safe_tools"


# Define nodes: these do the work
builder.add_node("fetch_user_info", user_info)
builder.add_node("assistant", Assistant(runnable=assistant_runnable))
builder.add_node("safe_tools", create_tool_node_with_fallback(safe_tools))
builder.add_node(
    "sensitive_tools", create_tool_node_with_fallback(sensitive_tools)
)
# Define edges: these determine how the control flow moves
builder.add_edge(START, "fetch_user_info")
builder.add_edge("fetch_user_info", "assistant")
builder.add_conditional_edges("assistant", route_tools, ["safe_tools", "sensitive_tools", END])
builder.add_edge("safe_tools", "assistant")
builder.add_edge("sensitive_tools", "assistant")

memory = MemorySaver()
graph = builder.compile(
    checkpointer=memory,
    interrupt_before=["sensitive_tools"]
)