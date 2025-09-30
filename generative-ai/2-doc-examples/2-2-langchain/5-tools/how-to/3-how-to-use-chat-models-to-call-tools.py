from typing_extensions import TypedDict, Annotated
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain_core.output_parsers import PydanticToolsParser


def tool_function():
    def add(a: int, b: int) -> int:
        """Add two integers.

        Args:
            a: First integer
            b: Second integer
        """
        return a + b

    def multiply(a: int, b: int) -> int:
        """Multiply two integers.

        Args:
            a: First integer
            b: Second integer
        """
        return a * b

    tools = [add, multiply]
    return tools


def tool_function_with_tool_decorator():
    """@tool decorator provided by LangChain"""

    @tool
    def add(a: int, b: int) -> int:
        """Add two integers.

        Args:
            a: First integer
            b: Second integer
        """
        return a + b

    # Able to access tool metadata
    print(add.name)
    print(add.description)
    print(add.args)
    print(add.args_schema)

    @tool
    def multiply(a: int, b: int) -> int:
        """Multiply two integers.

        Args:
            a: First integer
            b: Second integer
        """
        return a * b

    tools = [add, multiply]
    return tools


def tool_pydantic_class():
    class add(BaseModel):
        """Add two integers."""

        a: int = Field(..., title="First integer")
        b: int = Field(..., title="Second integer")

    class multiply(BaseModel):
        """Multiply two integers."""

        a: int = Field(..., title="First integer")
        b: int = Field(..., title="Second integer")

    tools = [add, multiply]
    return tools


def tool_typed_dict():
    class add(TypedDict):
        """Add two integers."""

        a: Annotated[int, ..., "First integer"]
        b: Annotated[int, ..., "Second integer"]

    class multiply(TypedDict):
        """Multiply two integers."""

        a: Annotated[int, ..., "First integer"]
        b: Annotated[int, ..., "Second integer"]

    tools = [add, multiply]
    return tools

def tool_call():
    tools = tool_function_with_tool_decorator()

    llm = ChatOpenAI(model="gpt-4o-mini")
    llm_with_tools = llm.bind_tools(tools)

    # Single tool call
    query = "What is 3 + 2"
    response = llm_with_tools.invoke(query)
    print(response)
    print(response.tool_calls)
    # {'name': 'add', 'args': {'a': 3, 'b': 2}, 'id': 'call_XqLlwXRfi0jYs150fMtkicZl', 'type': 'tool_call'}

    # Multiple tool calls
    query = "What is 3 * 12? Also, what is 11 + 49?"
    response = llm_with_tools.invoke(query)
    print(response)
    print(response.tool_calls)
    # [{'name': 'multiply', 'args': {'a': 3, 'b': 12}, 'id': 'call_oMFmIXzEsEifU8tQTdg7cV6b', 'type': 'tool_call'}, {'name': 'add', 'args': {'a': 11, 'b': 49}, 'id': 'call_77nsF3SHXVfv1N6OyZLFWFei', 'type': 'tool_call'}]


def tool_call_with_parse_output():
    tools = tool_pydantic_class()

    llm = ChatOpenAI(model="gpt-4o-mini")
    llm_with_tools = llm.bind_tools(tools)
    add, multiply = tools[0], tools[1]
    chain = llm_with_tools | PydanticToolsParser(tools=[add, multiply])

    query = "What is 3 + 2"
    response = chain.invoke(query)
    print(response)
    # [add(a=3, b=2)]


if __name__ == "__main__":
    tool_call()
    tool_call_with_parse_output()
