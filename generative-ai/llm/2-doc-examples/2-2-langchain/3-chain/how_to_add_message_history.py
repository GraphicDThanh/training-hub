from typing import Sequence
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, BaseMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, MessagesState, StateGraph
from langgraph.graph.message import add_messages
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from typing_extensions import Annotated, TypedDict


def message_inputs():
    llm = ChatOpenAI(model="gpt-4o-mini")

    # Define a new graph
    workflow = StateGraph(state_schema=MessagesState)

    # Define the function that call s the models
    def call_model(state: MessagesState):
        response = llm.invoke(state["messages"])
        # Update message history with response:
        return {"messages": response}

    # Define the (single) mode in the graph
    workflow.add_edge(START, "model")
    workflow.add_node("model", call_model)

    # Add memory
    memory = MemorySaver()
    app = workflow.compile(checkpointer=memory)

    config = {"configurable": {"thread_id": "abc123"}}
    query  = "Hi! I'm Bob."
    input_messages = [HumanMessage(query)]
    output = app.invoke({"messages": input_messages}, config)
    output["messages"][-1].pretty_print() # output contains all message in state

    query = "What's my name?"
    input_messages = [HumanMessage(query)]
    output = app.invoke({"messages": input_messages}, config)
    output["messages"][-1].pretty_print()
    # Your name is Bob. How can I help you today, Bob?

class State(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    language: str


def dictionary_inputs():
    llm = ChatOpenAI(model="gpt-4o-mini")
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "Answer in {language}."),
            MessagesPlaceholder(variable_name="messages"),
        ]
    )
    runnable = prompt | llm

    workflow = StateGraph(state_schema=State)

    def call_model(state: State):
        response = runnable.invoke(state)
        return {"messages": [response]}

    workflow.add_edge(START, "model")
    workflow.add_node("model", call_model)

    memory = MemorySaver()
    app = workflow.compile(checkpointer=memory)

    config = {"configurable": {"thread_id": "abc345"}}

    input_dict = {
        "messages": [HumanMessage("Hi, I'm Bob.")],
        "language": "Spanish",
    }
    output = app.invoke(input_dict, config)
    output["messages"][-1].pretty_print()
    # ¡Hola, Bob! ¿Cómo puedo ayudarte hoy?

def manage_message_history():
    llm = ChatOpenAI(model="gpt-4o-mini")
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "Answer in {language}."),
            MessagesPlaceholder(variable_name="messages"),
        ]
    )
    runnable = prompt | llm

    workflow = StateGraph(state_schema=State)

    def call_model(state: State):
        response = runnable.invoke(state)
        return {"messages": [response]}

    workflow.add_edge(START, "model")
    workflow.add_node("model", call_model)

    memory = MemorySaver()
    app = workflow.compile(checkpointer=memory)
    config = {"configurable": {"thread_id": "abc345"}}

    input_dict = {
        "messages": [HumanMessage("Hi, I'm Bob.")],
        "language": "Spanish",
    }
    output = app.invoke(input_dict, config)
    # output["messages"][-1].pretty_print()

    state = app.get_state(config).values
    print(f'Language: {state["language"]}')
    for message in state["messages"]:
        message.pretty_print()

    # Output:
    # Language: Spanish
    # ================================ Human Message =================================

    # Hi, I'm Bob.
    # ================================== Ai Message ==================================

    # ¡Hola, Bob! ¿Cómo puedo ayudarte hoy?


if __name__ == "__main__":
    # message_inputs()
    # dictionary_inputs()
    manage_message_history()




