import random
from typing import List, Tuple
from langchain_core.tools import tool

# --- Create a tool ---
def create_tool():
    @tool
    def multiply(a: int, b: int) -> int:
        """Multiply two numbers."""
        return a * b

    result = multiply.invoke({"a": 2, "b": 3})
    print(result)  # 6
    print(multiply.name)  # 'multiply'
    print(multiply.description)  # 'Multiply two numbers.'
    print(multiply.args)  # {'a': {'title': 'A', 'type': 'integer'}, 'b': {'title': 'B', 'type': 'integer'}}
# ---------------------

# --- Tool artifact ---
def tool_artifact():
    @tool(response_format="content_and_artifact")
    def generate_random_ints(min: int, max: int, size: int) -> Tuple[str, List[int]]:
        """Generate size random ints in the range [min, max]."""
        array = [random.randint(min, max) for _ in range(size)]
        content = f"Successfully generated array of {size} random ints in [{min}, {max}]."
        return content, array

    # Invoke the tool
    result = generate_random_ints.invoke({"min": 0, "max": 9, "size": 10})
    print(result)  # Successfully generated array of 10 random ints in [0, 9].

    # Invoke the tool with artifact
    result = generate_random_ints.invoke({
        "name": "generate_random_ints",
        "args": {"min": 0, "max": 9, "size": 10},
        "id": "123",  # required
        "type": "tool_call"  # required
    })
    print(result)
    # ToolMessage(content='Successfully generated array of 10 random ints in [0, 9].', name='generate_random_ints', tool_call_id='123', artifact=[2, 3, 7, 9, 7, 4, 7, 9, 1, 0])

def inject_tool_arg():
    # InjectedToolArg
    from langchain_core.tools import InjectedToolArg
    from typing_extensions import Annotated

    @tool
    def user_specific_tool(
        input_data: str,
        user_id: Annotated[str, InjectedToolArg]
    ) -> str:
        """Return the input data with the user id."""
        return f"{user_id} process {input_data}"

    # Directly invoke the tool requires the user_id
    result = user_specific_tool.invoke({"input_data": "data", "user_id": "123"})
    print(result)  # '123 process data'

    # But when the model is used in a tool call schema, user_id is not required

    # The user_is is NOT listed in tool call schema
    tool_call_schema = user_specific_tool.tool_call_schema.schema()
    # {'description': 'Return the input data with the user id.', 'properties': {'input_data': {...}}, 'required': ['input_data'], 'title': 'user_specific_tool', 'type': 'object'}

    # The user_id is listed in input schemas
    input_schema = user_specific_tool.get_input_schema().schema()
    # {'description': 'Return the input data with the user id.', 'properties': {'input_data': {...}, 'user_id': {...}}, 'required': ['input_data', 'user_id'], 'title': 'user_specific_tool', 'type': 'object'}

def runnable_config():
    # from langchain_core.runnables import RunnableConfig

    # @tool
    # async def some_func(..., config: RunnableConfig) -> ...:
    #     """Tool that does something."""
    #     # do something with config
    #     ...

    # await some_func.ainvoke(..., config={"configurable": {"value": "some_value"}})
    pass


if __name__ == "__main__":
    # create_tool()
    # tool_artifact()
    inject_tool_arg()
