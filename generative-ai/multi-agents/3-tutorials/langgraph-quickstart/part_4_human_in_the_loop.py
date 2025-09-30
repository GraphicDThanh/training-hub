from typing import Annotated
from typing_extensions import TypedDict

from langgraph.graph import StateGraph
from langgraph.graph.message import add_messages
from langchain_anthropic import ChatAnthropic
from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver
from langgraph.types import Command, interrupt
from langchain_core.tools import tool

memory = MemorySaver()
#######################################################################
# INIT AGENT
class State(TypedDict):
    messages: Annotated[list, add_messages]

graph_builder = StateGraph(State)

@tool
def human_assistance(query: str) -> str:
    """Return assistance from a human."""
    human_response = interrupt({"query": query})
    return human_response["data"]

search_tool = TavilySearchResults(max_results=2)
tools = [search_tool, human_assistance]
llm = ChatAnthropic(model="claude-3-5-sonnet-20240620")
llm_with_tools = llm.bind_tools(tools)

def chatbot(state: State):
    message = llm_with_tools.invoke(state["messages"])

    # Because we will be interrupting during tool execution,
    # we disable parallel tool calling to avoid repeating any
    # tool invocations when we resume.
    assert len(message.tool_calls) <= 1

    return {"messages": [message]}

graph_builder.add_node("chatbot", chatbot)

tool_node = ToolNode(tools=tools)
graph_builder.add_node("tools", tool_node)

graph_builder.add_conditional_edges(
    "chatbot",
    tools_condition
)

graph_builder.add_edge("tools", "chatbot")
graph_builder.set_entry_point("chatbot")
graph = graph_builder.compile(checkpointer=memory)


#######################################################################
# USE AGENT
def stream_graph_updates(user_input: str):
    config = {"configurable": {"thread_id": "1"}}

    for event in graph.stream(
        {"messages": [{"role": "user", "content": user_input}]},
        config,
        stream_mode="values"
    ):
        event["messages"][-1].pretty_print()

def continue_tool_execution_after_interrupt(config):
    print("Continue the tool execution:")
    human_response = (
        "We, the experts are here to help! We'd recommend you check out LangGraph to build your agent."
        " It's much more reliable and extensible than simple autonomous agents."
    )

    human_command = Command(resume={"data": human_response})

    events = graph.stream(human_command, config, stream_mode="values")
    for event in events:
        if "messages" in event:
            event["messages"][-1].pretty_print()

def use_chatbot():
    while True:
        try:
            user_input = input("User: ")
            if user_input.lower() in ["quit", "exit", "q"]:
                print("Goodbye!")
                break

            stream_graph_updates(user_input)

            # Interrupt the tool execution
            # Check snapshot of graph within the checkpoint
            print("Check interrupting tool execution:")
            config = {"configurable": {"thread_id": "1"}}
            snapshot = graph.get_state(config)
            print("snapshot next should be tools: ", snapshot.next)

            continue_tool_execution_after_interrupt(config)
        except:
            # fallback if input() is not available
            user_input = "What do you know about LangGraph?"
            print("User: " + user_input)
            stream_graph_updates(user_input)
            break


if __name__ == "__main__":
    use_chatbot()


"""
User: I need some expert guidance for building an AI agent. Could you request assistance for me?
================================ Human Message =================================

I need some expert guidance for building an AI agent. Could you request assistance for me?
================================== Ai Message ==================================

[{'citations': None, 'text': "Certainly! I'd be happy to request expert assistance for you regarding building an AI agent. To do this, I'll use the human_assistance function to get specialized guidance. Let me make that request for you.", 'type': 'text'}, {'id': 'toolu_01WdtzW4Vo8ncdyPZhdTHEef', 'input': {'query': 'A user is seeking expert guidance for building an AI agent. Could you provide some key considerations, best practices, or steps they should keep in mind when developing an AI agent?'}, 'name': 'human_assistance', 'type': 'tool_use'}]
Tool Calls:
  human_assistance (toolu_01WdtzW4Vo8ncdyPZhdTHEef)
 Call ID: toolu_01WdtzW4Vo8ncdyPZhdTHEef
  Args:
    query: A user is seeking expert guidance for building an AI agent. Could you provide some key considerations, best practices, or steps they should keep in mind when developing an AI agent?
Check interrupting tool execution:
snapshot next should be tools:  ('tools',)
Continue the tool execution:
================================== Ai Message ==================================

[{'citations': None, 'text': "Certainly! I'd be happy to request expert assistance for you regarding building an AI agent. To do this, I'll use the human_assistance function to get specialized guidance. Let me make that request for you.", 'type': 'text'}, {'id': 'toolu_01WdtzW4Vo8ncdyPZhdTHEef', 'input': {'query': 'A user is seeking expert guidance for building an AI agent. Could you provide some key considerations, best practices, or steps they should keep in mind when developing an AI agent?'}, 'name': 'human_assistance', 'type': 'tool_use'}]
Tool Calls:
  human_assistance (toolu_01WdtzW4Vo8ncdyPZhdTHEef)
 Call ID: toolu_01WdtzW4Vo8ncdyPZhdTHEef
  Args:
    query: A user is seeking expert guidance for building an AI agent. Could you provide some key considerations, best practices, or steps they should keep in mind when developing an AI agent?
================================= Tool Message =================================
Name: human_assistance

We, the experts are here to help! We'd recommend you check out LangGraph to build your agent. It's much more reliable and extensible than simple autonomous agents.
================================== Ai Message ==================================

Thank you for your patience. I've received some expert advice regarding building an AI agent. Here's what the expert recommends:

The expert suggests looking into LangGraph for building your AI agent. They mention that it's a more reliable and extensible option compared to simple autonomous agents.

LangGraph is likely a framework or tool designed specifically for creating AI agents with advanced capabilities. Here are a few points to consider based on this recommendation:

1. Reliability: LangGraph is highlighted as being more reliable, which suggests it might have better error handling, stability, and consistency in performance compared to simpler agent architectures.

2. Extensibility: The expert mentions that LangGraph is more extensible. This implies that it probably offers more flexibility in terms of adding new features, integrating with other systems, or scaling your agent as your needs grow.

3. Advanced capabilities: By comparing it to "simple autonomous agents," the expert is suggesting that LangGraph likely offers more sophisticated functionalities that can help you create a more capable AI agent.

To follow up on this advice, you might want to:

1. Research LangGraph: Look up documentation, tutorials, and examples of LangGraph to understand its features and how it can benefit your specific AI agent project.

2. Compare with alternatives: While LangGraph is recommended, it's always good to understand how it compares to other frameworks or tools in the market.

3. Consider your specific needs: Evaluate whether the features offered by LangGraph align with your project requirements and goals for the AI agent you want to build.

4. Look for community support: Check if LangGraph has an active community, which can be valuable for getting help, sharing ideas, and staying updated on best practices.

Would you like more information on any specific aspect of building an AI agent using LangGraph, or do you have any other questions about the development process?
"""