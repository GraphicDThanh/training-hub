import sqlite3

from agents.supervisor_agent.state import SupervisorState
from common.utils import create_tool_node_with_fallback, get_path, read_prompt
from langchain_core.messages import SystemMessage
from langchain_core.runnables import Runnable, RunnableConfig
from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.graph import END, START, StateGraph
from langgraph.prebuilt import tools_condition
from langgraph.utils.runnable import RunnableCallable

from .state import CartAgentState
from .tools.add_to_cart import add_to_cart
from .tools.checkout_cart import checkout_cart
from .tools.clear_cart import clear_cart
from .tools.get_cart import get_cart
from .tools.remove_from_cart import remove_from_cart

cart_checkpointer = SqliteSaver(sqlite3.connect(get_path("cart_checkpoints.sqlite", "db"), check_same_thread=False))


safe_tools = [get_cart, add_to_cart, remove_from_cart, clear_cart]
sensitive_tools = [checkout_cart]
sensitive_tool_names = {t.name for t in sensitive_tools}


class Assistant:
    def __init__(self, runnable: Runnable):
        self.runnable = runnable

    def __call__(self, state: SupervisorState, config: RunnableConfig):
        # Invoke assistant
        result = self.runnable.invoke(state, config)
        return {"messages": result}


def route_tools(state: CartAgentState):
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


def create_cart_agent(llm, checkpointer=None):
    """Create cart agent.

    Args:
        llm: The language model to be used by the cart agent.

    """
    if not checkpointer:
        checkpointer = cart_checkpointer

    prompt = read_prompt("agents/cart_agent/prompt.md")
    prompt_runnable = RunnableCallable(
        lambda state: [SystemMessage(content=prompt)] + state["messages"],
    )
    node_assistant = Assistant(prompt_runnable | llm.bind_tools(tools=[*safe_tools, *sensitive_tools]))
    node_safe_tools = create_tool_node_with_fallback(safe_tools)
    node_sensitive_tools = create_tool_node_with_fallback(sensitive_tools)

    # Build service graph
    builder = StateGraph(CartAgentState)
    # - add nodes
    builder.add_node("assistant", node_assistant)
    builder.add_node("safe_tools", node_safe_tools)
    builder.add_node("sensitive_tools", node_sensitive_tools)

    # - define edges
    builder.add_edge(START, "assistant")
    builder.add_conditional_edges("assistant", route_tools, ["safe_tools", "sensitive_tools", END])
    builder.add_edge("safe_tools", "assistant")
    builder.add_edge("sensitive_tools", "assistant")
    workflow = builder.compile(
        checkpointer=checkpointer,
        interrupt_before=["sensitive_tools"],
    )

    return workflow
