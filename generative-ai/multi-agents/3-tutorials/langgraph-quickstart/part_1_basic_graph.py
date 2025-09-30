from typing import Annotated
from typing_extensions import TypedDict

from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_anthropic import ChatAnthropic


###############################################################
# State
class State(TypedDict):
    # Messages have the type "list". The `add_messages` function
    # in the annotation defines how this state key should be updated
    # (in this case, it appends messages to the list, rather than overwriting them)
    messages: Annotated[list, add_messages]

# Chatbot with tools
llm = ChatAnthropic(model="claude-3-5-sonnet-20240620")

# Node chatbot
def chatbot(state: State):
    return {"messages": [llm.invoke(state["messages"])]}


#######################################################################
# INIT AGENT
# Chatbot
llm = ChatAnthropic(model="claude-3-5-sonnet-20240620")

# Node chatbot
def chatbot(state: State):
    return {"messages": [llm.invoke(state["messages"])]}

###############################################################
# 1. Create a graph builder
graph_builder = StateGraph(State)

# 2. Add nodes
# The first argument is the unique node name
# The second argument is the function or object that will be called whenever
# the node is used.
graph_builder.add_node("chatbot", chatbot)

# 3. Add entry point, finish point
graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot", END)


# 4. Build the graph
graph = graph_builder.compile()


#######################################################################
# USE AGENT
def stream_graph_updates(user_input: str):
    for event in graph.stream({"messages": [{"role": "user", "content": user_input}]}):
        for value in event.values():
            print("Assistant:", value["messages"][-1].content)


def use_chatbot():
    while True:
        try:
            user_input = input("User: ")
            if user_input.lower() in ["quit", "exit", "q"]:
                print("Goodbye!")
                break

            stream_graph_updates(user_input)
        except:
            # fallback if input() is not available
            user_input = "What do you know about LangGraph?"
            print("User: " + user_input)
            stream_graph_updates(user_input)
            break

#######################################################################

if __name__ == "__main__":
    use_chatbot()


