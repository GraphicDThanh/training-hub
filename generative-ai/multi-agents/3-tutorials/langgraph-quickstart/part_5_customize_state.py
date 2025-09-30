from typing import Annotated
from typing_extensions import TypedDict

from langgraph.graph import StateGraph
from langgraph.graph.message import add_messages
from langchain_anthropic import ChatAnthropic
from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver
from langgraph.types import Command, interrupt
from langchain_core.tools import tool, InjectedToolCallId
from langchain_core.messages import ToolMessage


memory = MemorySaver()
#######################################################################
# INIT AGENT
class State(TypedDict):
    messages: Annotated[list, add_messages]
    name: str
    birthday: str


graph_builder = StateGraph(State)

@tool
def human_assistance(name: str, birthday: str, tool_call_id: Annotated[str, InjectedToolCallId]) -> str:
    """Return assistance from a human."""
    human_response = interrupt(
        {
            "question": "Is this correct?",
            "name": name,
            "birthday": birthday,
        },
    )

    # If the information is correct, update the state as-is.
    if human_response.get("correct", "").lower().startswith("y"):
        verified_name = name
        verified_birthday = birthday
        response = "Correct"

    # Otherwise, receive information from the human reviewer.
    else:
        verified_name = human_response.get("name", name)
        verified_birthday = human_response.get("birthday", birthday)
        response = f"Made a correction: {human_response}"

    # This time we explicitly update the state with a ToolMessage inside
    # the tool.
    state_update = {
        "name": verified_name,
        "birthday": verified_birthday,
        "messages": [ToolMessage(response, tool_call_id=tool_call_id)],
    }

    # We return a Command object in the tool to update our state.
    return Command(update=state_update)


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
    human_command = Command(
        resume={
            "name": "LangGraph",
            "birthday": "Jan 17, 2024",
        },
    )

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

            # Check state update:
            snapshot = graph.get_state(config)
            print("graph values: ", {k: v for k, v in snapshot.values.items() if k in ("name", "birthday")})
            # graph values:  {'name': 'LangGraph', 'birthday': 'Jan 17, 2024'}

            # Try update manual
            graph.update_state(config, {"name": "LangGraph (library)"})
            snapshot = graph.get_state(config)
            print("graph values updated: ", {k: v for k, v in snapshot.values.items() if k in ("name", "birthday")})

        except:
            # fallback if input() is not available
            user_input = "What do you know about LangGraph?"
            print("User: " + user_input)
            stream_graph_updates(user_input)
            break


if __name__ == "__main__":
    use_chatbot()


"""
User: Can you look up when LangGraph was released? When you have the answer, use the human_assistance tool for review.
================================ Human Message =================================

Can you look up when LangGraph was released? When you have the answer, use the human_assistance tool for review.
================================== Ai Message ==================================

[{'citations': None, 'text': "Certainly! I'll start by searching for information about LangGraph's release date using the Tavily search function. Then, I'll use the human_assistance tool for review. Let's begin with the search.", 'type': 'text'}, {'id': 'toolu_01AwmZx5gNHiXRSsQzLQxfMW', 'input': {'query': 'LangGraph release date'}, 'name': 'tavily_search_results_json', 'type': 'tool_use'}]
Tool Calls:
  tavily_search_results_json (toolu_01AwmZx5gNHiXRSsQzLQxfMW)
 Call ID: toolu_01AwmZx5gNHiXRSsQzLQxfMW
  Args:
    query: LangGraph release date
================================= Tool Message =================================
Name: tavily_search_results_json

[{"url": "https://pypi.org/project/langgraph/", "content": "Project details\nProject links\nStatistics\nView statistics for this project via Libraries.io, or by using our public dataset on Google BigQuery\nMeta\nLicense: Other/Proprietary License (LangGraph License)\nRequires: Python >=3.9.0, <4.0\nMaintainers\nClassifiers\nRelease history\nRelease notifications |\nRSS feed\n0.0.24\nFeb 8, 2024\n0.0.23\nFeb 4, 2024\n0.0.22\nFeb 4, 2024\n0.0.21\nJan 31, 2024\n0.0.20\nJan 27, 2024\n0.0.19\nJan 23, 2024\n0.0.18\nJan 23, 2024\n0.0.17\nJan 23, 2024\n0.0.16\nJan 21, 2024\n0.0.15\nJan 19, 2024\n0.0.14\nJan 18, 2024\n0.0.13\nJan 17, 2024\n0.0.12\nJan 17, 2024\n0.0.11\nJan 16, 2024\n0.0.10\nJan 9, 2024\n0.0.9\nJan 8, 2024\n0.0.8\nyanked\nJan 8, 2024\nDownload files\nDownload the file for your platform. langgraph 0.0.24\npip install langgraph\nCopy PIP instructions\nReleased:\nFeb 8, 2024\nlanggraph\nNavigation\nProject links\nStatistics\nView statistics for this project via Libraries.io, or by using our public dataset on Google BigQuery\nMeta\nLicense: Other/Proprietary License (LangGraph License)\nRequires: Python >=3.9.0, <4.0\nMaintainers\nClassifiers\nProject description\n🦜🕸️LangGraph\n⚡ Building language agents as graphs ⚡\nOverview\nLangGraph is a library for building stateful, multi-actor applications with LLMs, built on top of (and intended to be used with) LangChain.\n Source Distribution\nUploaded\nFeb 8, 2024\nsource\nBuilt Distribution\nUploaded\nFeb 8, 2024\npy3\nHashes for langgraph-0.0.24.tar.gz\nHashes for langgraph-0.0.24-py3-none-any.whl\nHelp\nAbout PyPI\n It only has one argument:\nNote: This does not need to be called if at any point you previously created an edge (conditional or normal) to END\nGraph\nThis has the same interface as StateGraph with the exception that it doesn't update a state object over time, and rather relies on passing around the full state from each step.\n If the agent said that it was finished, then it should finish\nNormal Edge: after the tools are invoked, it should always go back to the agent to decide what to do next\nLet's define the nodes, as well as a function to decide how what conditional edge to take.\n"}, {"url": "https://blog.langchain.dev/langgraph-cloud/", "content": "We also have a new stable release of LangGraph. By LangChain 6 min read Jun 27, 2024. (Oct '24) Edit: Since the launch of LangGraph Cloud, we"}]
================================== Ai Message ==================================

[{'citations': None, 'text': "Based on the search results, I can provide information about LangGraph's release. The earliest version of LangGraph that I can find in the release history is version 0.0.9, which was released on January 8, 2024. This suggests that LangGraph was likely first released to the public around this date.\n\nNow, let's use the human_assistance tool for review. For this, we need to provide a name and birthday. Since we don't have specific information about a human reviewer, I'll use placeholder information.", 'type': 'text'}, {'id': 'toolu_01FQeHpypBksHoJ21uYKRQnt', 'input': {'name': 'Reviewer', 'birthday': '1990-01-01'}, 'name': 'human_assistance', 'type': 'tool_use'}]
Tool Calls:
  human_assistance (toolu_01FQeHpypBksHoJ21uYKRQnt)
 Call ID: toolu_01FQeHpypBksHoJ21uYKRQnt
  Args:
    name: Reviewer
    birthday: 1990-01-01
Check interrupting tool execution:
snapshot next should be tools:  ('tools',)
Continue the tool execution:
================================== Ai Message ==================================

[{'citations': None, 'text': "Based on the search results, I can provide information about LangGraph's release. The earliest version of LangGraph that I can find in the release history is version 0.0.9, which was released on January 8, 2024. This suggests that LangGraph was likely first released to the public around this date.\n\nNow, let's use the human_assistance tool for review. For this, we need to provide a name and birthday. Since we don't have specific information about a human reviewer, I'll use placeholder information.", 'type': 'text'}, {'id': 'toolu_01FQeHpypBksHoJ21uYKRQnt', 'input': {'name': 'Reviewer', 'birthday': '1990-01-01'}, 'name': 'human_assistance', 'type': 'tool_use'}]
Tool Calls:
  human_assistance (toolu_01FQeHpypBksHoJ21uYKRQnt)
 Call ID: toolu_01FQeHpypBksHoJ21uYKRQnt
  Args:
    name: Reviewer
    birthday: 1990-01-01
================================= Tool Message =================================
Name: human_assistance

Made a correction: {'name': 'LangGraph', 'birthday': 'Jan 17, 2024'}
================================== Ai Message ==================================

Thank you for the human assistance. It appears that a correction has been made to the information I initially provided.

Based on the human review, I can now provide you with the corrected information:

LangGraph was released on January 17, 2024.

This date is more precise than my initial estimate based on the PyPI release history. It's possible that January 17, 2024, marks the official public release or announcement of LangGraph, even though there were earlier versions available on PyPI.

To summarize:
- Initial release date of LangGraph: January 17, 2024
- This information has been verified and corrected by human assistance.

Is there anything else you'd like to know about LangGraph or its release?
"""