import sqlite3

from common.utils import create_tool_node_with_fallback, get_path, read_prompt
from langchain_core.messages import SystemMessage
from langchain_core.runnables import Runnable, RunnableConfig
from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.graph import END, START, StateGraph
from langgraph.prebuilt import tools_condition
from langgraph.utils.runnable import RunnableCallable

from .tools.create_support_ticket import create_support_ticket
from .tools.lookup_documents import lookup_documents
from .state import ServiceAgentState


service_checkpointer = SqliteSaver(
    sqlite3.connect(
        get_path("service_checkpoints.sqlite", "db"), check_same_thread=False
    )
)
safe_tools = [lookup_documents]
sensitive_tools = [create_support_ticket]
sensitive_tool_names = {t.name for t in sensitive_tools}


class Assistant:
    def __init__(self, runnable: Runnable):
        self.runnable = runnable

    def __call__(self, state: ServiceAgentState, config: RunnableConfig):
        # Invoke assistant
        result = self.runnable.invoke(state)
        return {"messages": result}


def route_tools(state: ServiceAgentState):
    """
    Route tools from assistant node based on the tool name.
    - If next node is END, return END.
    - If the tool name is in sensitive_tool_names, route to sensitive_tools node.
    - Otherwise, route to safe_tools node.
    """
    next_node = tools_condition(state)

    if next_node == END:
        return END

    ai_message = state["messages"][-1]
    for tool_call in ai_message.tool_calls:
        if tool_call["name"] in sensitive_tool_names:
            return "sensitive_tools"

    return "safe_tools"


def create_service_agent(llm, checkpointer=service_checkpointer):
    prompt = read_prompt("agents/service_agent/prompt.md")
    prompt_runnable = RunnableCallable(
        lambda state: [SystemMessage(content=prompt)] + state["messages"],
    )
    node_assistant = Assistant(
        prompt_runnable | llm.bind_tools(tools=[*safe_tools, *sensitive_tools])
    )
    node_safe_tools = create_tool_node_with_fallback(safe_tools)
    node_sensitive_tools = create_tool_node_with_fallback(sensitive_tools)

    # Build service graph
    builder = StateGraph(ServiceAgentState)
    # - add nodes
    builder.add_node("assistant", node_assistant)
    builder.add_node("safe_tools", node_safe_tools)
    builder.add_node("sensitive_tools", node_sensitive_tools)

    # - define edges
    builder.add_edge(START, "assistant")
    builder.add_conditional_edges(
        "assistant", route_tools, ["safe_tools", "sensitive_tools", END]
    )
    builder.add_edge("safe_tools", "assistant")
    builder.add_edge("sensitive_tools", "assistant")
    service_workflow = builder.compile(
        checkpointer=checkpointer,
        interrupt_before=["sensitive_tools"],
        # debug=True,
    )

    return service_workflow
