from langchain_core.tools import tool
from langchain_anthropic import ChatAnthropic
from typing import Literal
from langgraph.graph import StateGraph, START, END
from langgraph.graph import MessagesState
from langchain_core.messages import SystemMessage, HumanMessage, ToolMessage

from langgraph.prebuilt import create_react_agent


llm = ChatAnthropic(model="claude-3-5-sonnet-latest")

# Define tools
@tool
def multiply(a: int, b: int) -> int:
    """Multiply a and b.

    Args:
        a: first int
        b: second int
    """
    return a * b


@tool
def add(a: int, b: int) -> int:
    """Adds a and b.

    Args:
        a: first int
        b: second int
    """
    return a + b


@tool
def divide(a: int, b: int) -> float:
    """Divide a and b.

    Args:
        a: first int
        b: second int
    """
    return a / b


# Augment the LLM with tools
tools = [add, multiply, divide]
tools_by_name = {tool.name: tool for tool in tools}
llm_with_tools = llm.bind_tools(tools)

# Pass in:
# (1) the augmented LLM with tools
# (2) the tools list (which is used to create the tool node)
pre_built_agent = create_react_agent(llm_with_tools, tools=tools)

if __name__ == "__main__":
    # Invoke
    messages = [HumanMessage(content="Add 3 and 4.")]
    messages = pre_built_agent.invoke({"messages": messages})
    for m in messages["messages"]:
        m.pretty_print()