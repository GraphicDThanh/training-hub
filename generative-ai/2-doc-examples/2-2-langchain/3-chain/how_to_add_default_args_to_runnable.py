from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser


def bind_step_sequences():
    """
    Example: have simple chain with prompt, model, output parser
    Want to call the model with certain stop word
    """
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "Write out the following equation using algebratic symbols then solve it. Use the format\n\nEQUATION:...\nSOLUTION:...\n\n",
            ),
            ("human", "{equation_statement}")
        ]
    )

    model = ChatOpenAI(temperature=0)
    runnable = (
        {"equation_statement": RunnablePassthrough()} | prompt | model | StrOutputParser()
    )

    # print(runnable.invoke("x raised to the third plus seven equals 12"))
    # Output:
    # EQUATION: x^3 + 7 = 12

    # SOLUTION:
    # Subtract 7 from both sides:
    # x^3 = 5

    # Take the cube root of both sides:
    # x = ∛5

    # use bind()
    runnable = (
        {"equation_statement": RunnablePassthrough()}
        | prompt
        | model.bind(stop="SOLUTION")
        | StrOutputParser()
    )
    print(runnable.invoke("x raised to the third plus seven equals 12"))
    # Output:
    # EQUATION: x^3 + 7 = 12

def attaching_openai_tools():
    """
    Tool calling: bind provider-specific args directly
    """
    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_current_weather",
                "description": "Get the current weather in a given location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "The city and state, e.g. San Francisco, CA",
                        }
                    },
                    "required": ["location"],
                },
            }
        }
    ]

    model = ChatOpenAI(model="gpt-4o-mini").bind(tools=tools)
    output = model.invoke("What's the weather in SF, NYC and LA?")
    print(output)
    # content='' additional_kwargs={
    # 'tool_calls': [{'id': 'call_jqx3lvoaH1iezLmmzdJa2NWm', 'function': {'arguments': '{"location": "San Francisco, CA"}', 'name': 'get_current_weather'}, 'type': 'function'},
    # {'id': 'call_BiOsh7yjoNcVtnQS2RrpQ6lS', 'function': {'arguments': '{"location": "New York City, NY"}', 'name': 'get_current_weather'}, 'type': 'function'},
    # {'id': 'call_o3IUrzGnwCRrVTrXwS4wcewI', 'function': {'arguments': '{"location": "Los Angeles, CA"}', 'name': 'get_current_weather'}, 'type': 'function'}],
    # 'refusal': None}
    # response_metadata={'token_usage': {'completion_tokens': 71, 'prompt_tokens': 71, 'total_tokens': 142, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_0ba0d124f1', 'finish_reason': 'tool_calls', 'logprobs': None} id='run-d3eb9c16-91d1-4c6c-8c64-bfddc1d49d39-0' tool_calls=[{'name': 'get_current_weather', 'args': {'location': 'San Francisco, CA'}, 'id': 'call_jqx3lvoaH1iezLmmzdJa2NWm', 'type': 'tool_call'}, {'name': 'get_current_weather', 'args': {'location': 'New York City, NY'}, 'id': 'call_BiOsh7yjoNcVtnQS2RrpQ6lS', 'type': 'tool_call'}, {'name': 'get_current_weather', 'args': {'location': 'Los Angeles, CA'}, 'id': 'call_o3IUrzGnwCRrVTrXwS4wcewI', 'type': 'tool_call'}] usage_metadata={'input_tokens': 71, 'output_tokens': 71, 'total_tokens': 142, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}

if __name__ == "__main__":
    bind_step_sequences()
    attaching_openai_tools()