from typing_extensions import TypedDict, Annotated
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain_core.output_parsers import PydanticToolsParser
from langchain_core.messages import HumanMessage


@tool
def add(a: int, b: int) -> int:
    """Add two integers.

    Args:
        a: First integer
        b: Second integer
    """
    return a + b

@tool
def multiply(a: int, b: int) -> int:
    """Multiply two integers.

    Args:
        a: First integer
        b: Second integer
    """
    return a * b

llm = ChatOpenAI(model="gpt-4o-mini")
tools = [add, multiply]
llm_with_tools = llm.bind_tools(tools)
query = "What is 3 * 12? Also, what is 11 + 49?"
messages = [HumanMessage(query)]
ai_msg = llm_with_tools.invoke(messages)

print(ai_msg.tool_calls)
# [{'name': 'multiply', 'args': {'a': 3, 'b': 12}, 'id': 'call_uNkWBHrHVD8ydWbrs3q6fJyU', 'type': 'tool_call'}, {'name': 'add', 'args': {'a': 11, 'b': 49}, 'id': 'call_o2rkCih8cSFtoF50XOvxF8IL', 'type': 'tool_call'}]
messages.append(ai_msg)

for tool_call in ai_msg.tool_calls:
    list_tools = {"add": add, "multiply": multiply}
    tool_call_name = tool_call["name"].lower()
    selected_tool = list_tools[tool_call_name]
    tool_msg = selected_tool.invoke(tool_call)
    messages.append(tool_msg)

# messages:
# [
#     HumanMessage(content='What is 3 * 12? Also, what is 11 + 49?', additional_kwargs={}, response_metadata={}),
#     AIMessage(content='', additional_kwargs={'tool_calls': [{'id': 'call_TlkuILOJV4RT8CIE...n_details': {'audio': 0, 'reasoning': 0}}),
#     ToolMessage(content='36', name='multiply', tool_call_id='call_TlkuILOJV4RT8CIEk5crhm8L'),
#     ToolMessage(content='60', name='add', tool_call_id='call_QTjez3ulC8YSmNE5vRsaqQ5Y')
# ]

response = llm_with_tools.invoke(messages)
print(response)
# AIMessage(content='The result of \\( 3 \\times 12 \\) is 36, and \\( 11 + 49 \\) equals 60.' additional_kwargs={'refusal': None} response_metadata={'token_usage': {'completion_tokens': 30, 'prompt_tokens': 175, 'total_tokens': 205, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_6fc10e10eb', 'finish_reason': 'stop', 'logprobs': None} id='run-7e1237cc-d6a0-46da-8ca7-6ed18d09a39b-0' usage_metadata={'input_tokens': 175, 'output_tokens': 30, 'total_tokens': 205, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})