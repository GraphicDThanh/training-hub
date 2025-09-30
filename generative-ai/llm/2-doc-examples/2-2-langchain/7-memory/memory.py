from langchain_openai import ChatOpenAI
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, MessagesState, StateGraph
from langchain_core.messages import trim_messages, RemoveMessage


def message_passing():
    model = ChatOpenAI(model="gpt-4o-mini")
    prompt = ChatPromptTemplate.from_messages(
        [
            SystemMessage(
                content="You are a helpful assistant. Answer all questions to the best of your ability."
            ),
            MessagesPlaceholder(variable_name="messages"),
        ]
    )
    chain = prompt | model
    ai_msg = chain.invoke(
        {
            "messages": [
                HumanMessage(
                    content="Translate from English to French: I love programming."
                ),
                AIMessage(content="J'adore la programmation."),
                HumanMessage(content="What did you just say?"),
            ],
        }
    )
    print(ai_msg.content)
    # I translated "I love programming" into French as "J'adore la programmation."

def app_with_lang_graph_persistence():
    workflow = StateGraph(state_schema=MessagesState)

    # Define the function that calls the model
    def call_model(state: MessagesState):
        system_prompt = (
            "You are a helpful assistant. Answer all questions to the best of your ability."
        )
        messages = [SystemMessage(content=system_prompt)] + state["messages"]
        response = model.invoke(messages)
        return {"messages": response}

    model = ChatOpenAI(model="gpt-4o-mini")

    # Define the node and edge
    workflow.add_node("model", call_model)
    workflow.add_edge(START, "model")

    # Add single in-memory checkpointer
    memory = MemorySaver()
    app = workflow.compile(checkpointer=memory)

    return app


def automatic_history_with_lang_graph_persistence():

    app = app_with_lang_graph_persistence()
    result = app.invoke(
        {"messages": [HumanMessage(content="Translate from English to French: I love programming.")]},
        config={"configurable": {"thread_id": "1"}}
    )
    print(result)
    # {'messages': [HumanMessage(content='Translate from English to French: I love programming.', additional_kwargs={}, response_metadata={}, id='58de9798-c127-440d-9558-d1b8f04f2959'), AIMessage(content='The translation of "I love programming" in French is "J\'aime programmer."', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 16, 'prompt_tokens': 37, 'total_tokens': 53, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_6fc10e10eb', 'finish_reason': 'stop', 'logprobs': None}, id='run-94522224-70a8-4429-9181-6dd7809dcd6e-0', usage_metadata={'input_tokens': 37, 'output_tokens': 16, 'total_tokens': 53, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}

    result2 = app.invoke(
        {"messages": [HumanMessage(content="What did I just ask you?")]},
        config={"configurable": {"thread_id": "1"}},
    )
    print(result2)
    # {'messages': [HumanMessage(content='Translate from English to French: I love programming.', additional_kwargs={}, response_metadata={}, id='b5eb6499-cc5f-4e2e-9467-4c52dc6b372c'), AIMessage(content="I love programming. in French is: J'aime programmer.", additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 12, 'prompt_tokens': 37, 'total_tokens': 49, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_6fc10e10eb', 'finish_reason': 'stop', 'logprobs': None}, id='run-bbbfe4cc-5878-4987-942c-195f47b48dbb-0', usage_metadata={'input_tokens': 37, 'output_tokens': 12, 'total_tokens': 49, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}), HumanMessage(content='What did I just ask you?', additional_kwargs={}, response_metadata={}, id='25671591-0bda-4649-ba02-07cbbc89d7ed'), AIMessage(content='You asked me to translate the phrase "I love programming" from English to French.', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 17, 'prompt_tokens': 64, 'total_tokens': 81, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_6fc10e10eb', 'finish_reason': 'stop', 'logprobs': None}, id='run-70f598c5-9ccf-41c0-89a9-efcf6a3e272b-0', usage_metadata={'input_tokens': 64, 'output_tokens': 17, 'total_tokens': 81, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}

def modify_history():
    # Custom messages
    app = app_with_lang_graph_persistence()

    demo_ephemeral_chat_history = [
        HumanMessage(content="Hey there! I'm Nemo."),
        AIMessage(content="Hello!"),
        HumanMessage(content="How are you today?"),
        AIMessage(content="Fine thanks!"),
    ]
    result = app.invoke(
        {
            "messages": demo_ephemeral_chat_history + [HumanMessage(content="What's my name?")]
        },
        config={"configurable": {"thread_id": "2"}},
    )
    print(result)
    # {'messages': [HumanMessage(content="Hey there! I'm Nemo.", additional_kwargs={}, response_metadata={}, id='347a5d37-a53f-4348-93a9-43f0c3a677ac'), AIMessage(content='Hello!', additional_kwargs={}, response_metadata={}, id='8de87f4c-6fb2-42e9-95ad-a553347787c0'), HumanMessage(content='How are you today?', additional_kwargs={}, response_metadata={}, id='4948638e-f8d0-462c-9c4e-43518d990335'), AIMessage(content='Fine thanks!', additional_kwargs={}, response_metadata={}, id='ce2cf086-13e4-4cff-aac9-690a4760b4e1'), HumanMessage(content="What's my name?", additional_kwargs={}, response_metadata={}, id='0b97d98d-395a-4ce1-aec2-f5a0854a735f'), AIMessage(content='Your name is Nemo. How can I assist you today?', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 12, 'prompt_tokens': 63, 'total_tokens': 75, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_6fc10e10eb', 'finish_reason': 'stop', 'logprobs': None}, id='run-4d04f7e5-556d-4343-8646-f31cf4e61b82-0', usage_metadata={'input_tokens': 63, 'output_tokens': 12, 'total_tokens': 75, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}

def app_with_trim_message():
    # Define the function that calls the model
    def call_model(state: MessagesState):
        trimmed_messages = trimmer.invoke(state["messages"])
        system_prompt = (
            "You are a helpful assistant. Answer all questions to the best of your ability."
        )
        messages = [SystemMessage(content=system_prompt)] + trimmed_messages
        response = model.invoke(messages)
        return {"messages": response}

    model = ChatOpenAI(model="gpt-4o-mini")
    # Define trimmer
    # count each message as 1 "token" (token_counter=len) and keep only the last 2 messages
    trimmer = trim_messages(strategy="last", max_tokens=2, token_counter=len)
    workflow = StateGraph(state_schema=MessagesState)

    workflow.add_node("model", call_model)
    workflow.add_edge(START, "model")

    # Add simple in-memory checkpointer
    memory = MemorySaver()
    app = workflow.compile(checkpointer=memory)
    return app

def trim_message():
    app = app_with_trim_message()
    demo_ephemeral_chat_history = [
        HumanMessage(content="Hey there! I'm Nemo."),
        AIMessage(content="Hello!"),
        HumanMessage(content="How are you today?"),
        AIMessage(content="Fine thanks!"),
    ]
    result = app.invoke(
        {
            "messages": demo_ephemeral_chat_history
            + [HumanMessage(content="What's my name?")]
        },
        config={"configurable": {"thread_id": "2"}},
    )
    print(result)
    # I'm sorry, but I don't have access to personal information about users unless you share it with me. How can I assist you today?

    # {'messages': [HumanMessage(content="Hey there! I'm Nemo.", additional_kwargs={}, response_metadata={}, id='bbb29a96-20fc-4d3a-aced-13c50f347163'), AIMessage(content='Hello!', additional_kwargs={}, response_metadata={}, id='f9b49061-eb71-4eb6-8102-0d555a438b49'), HumanMessage(content='How are you today?', additional_kwargs={}, response_metadata={}, id='00819306-3167-4883-8536-8a57ab27b2ee'), AIMessage(content='Fine thanks!', additional_kwargs={}, response_metadata={}, id='f8020be4-f526-41bd-bb6a-3ca361233952'), HumanMessage(content="What's my name?", additional_kwargs={}, response_metadata={}, id='3c0848ec-ac4f-4e87-951a-1c50c6365841'), AIMessage(content="I'm sorry, but I don't have access to personal information about users unless you share it with me. How can I assist you today?", additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 27, 'prompt_tokens': 38, 'total_tokens': 65, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_6fc10e10eb', 'finish_reason': 'stop', 'logprobs': None}, id='run-d74ed403-07f2-47b8-91ac-8239dc9d49e5-0', usage_metadata={'input_tokens': 38, 'output_tokens': 27, 'total_tokens': 65, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}


def app_with_summary_memory():
    # Define the function that calls the model
    def call_model(state: MessagesState):
        system_prompt = (
            "You are a helpful assistant. "
            "Answer all questions to the best of your ability. "
            "The provided chat history includes a summary of the earlier conversation."
        )
        system_message = SystemMessage(content=system_prompt)
        message_history = state["messages"][:-1]  # exclude the most recent user input

        # Summarize the messages if the chat history reaches a certain size
        if len(message_history) >= 4:
            last_human_message = state["messages"][-1]

            # Invoke the model to generate conversation summary
            summary_prompt = (
                "Distill the above chat messages into a single summary message. "
                "Include as many specific details as you can."
            )
            summary_message = model.invoke(
                message_history + [HumanMessage(content=summary_prompt)]
            )
            # Delete messages that we no longer want to show up
            delete_messages = [RemoveMessage(id=m.id) for m in state["messages"]]

            # Re-add user message
            human_message = HumanMessage(content=last_human_message.content)

            # Call the model with summary & response
            response = model.invoke([system_message, summary_message, human_message])
            message_updates = [summary_message, human_message, response] + delete_messages
        else:
            message_updates = model.invoke([system_message] + state["messages"])

        return {"messages": message_updates}

    model = ChatOpenAI(model="gpt-4o-mini")
    workflow = StateGraph(state_schema=MessagesState)
    workflow.add_node("model", call_model)
    workflow.add_edge(START, "model")

    # Add simple in-memory checkpointer
    memory = MemorySaver()
    app = workflow.compile(checkpointer=memory)
    return app


def summary_memory():
    demo_ephemeral_chat_history = [
        HumanMessage(content="Hey there! I'm Nemo."),
        AIMessage(content="Hello!"),
        HumanMessage(content="How are you today?"),
        AIMessage(content="Fine thanks!"),
    ]
    app = app_with_summary_memory()
    result = app.invoke(
        {
            "messages": demo_ephemeral_chat_history
            + [HumanMessage("What did I say my name was?")]
        },
        config={"configurable": {"thread_id": "4"}},
    )
    print(result) # You mentioned that your name is Nemo.

    # {'messages': [AIMessage(content="Nemo greeted me, and I responded warmly, indicating that I'm doing fine.", additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 16, 'prompt_tokens': 60, 'total_tokens': 76, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_6fc10e10eb', 'finish_reason': 'stop', 'logprobs': None}, id='run-25e0aeaa-0bc9-4ef2-b3a5-113b5285f150-0', usage_metadata={'input_tokens': 60, 'output_tokens': 16, 'total_tokens': 76, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}), HumanMessage(content='What did I say my name was?', additional_kwargs={}, response_metadata={}, id='91385b24-f137-4202-96fc-aaf67afd1d19'), AIMessage(content='You mentioned that your name is Nemo.', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 8, 'prompt_tokens': 67, 'total_tokens': 75, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_6fc10e10eb', 'finish_reason': 'stop', 'logprobs': None}, id='run-801ff2a1-3b01-4cc0-8025-b1815a11c239-0', usage_metadata={'input_tokens': 67, 'output_tokens': 8, 'total_tokens': 75, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}


if __name__ == "__main__":
    # message_passing()
    # automatic_history_with_lang_graph_persistence()
    # modify_history()
    # trim_message()
    summary_memory()