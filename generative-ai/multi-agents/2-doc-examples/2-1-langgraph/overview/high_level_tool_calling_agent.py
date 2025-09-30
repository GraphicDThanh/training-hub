from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langchain_anthropic import ChatAnthropic
from langchain_core.tools import tool

# Define the tools for the agent to use
@tool
def search(query: str):
    """Call to surf the web."""
    # This is a placeholder, but don't tell the LLM that...
    if "sf" in query.lower() or "san francisco" in query.lower():
        return "It's 60 degrees and foggy."
    return "It's 90 degrees and sunny."



def main():
    tools = [search]
    model = ChatAnthropic(model="claude-3-5-sonnet-latest", temperature=0)

    # Initialize memory to persist state between graph runs
    checkpointer = MemorySaver()

    app = create_react_agent(model, tools, checkpointer=checkpointer)



    # Use the agent
    final_state = app.invoke(
        {"messages": [{"role": "user", "content": "what is the weather in sf"}]},
        config={"configurable": {"thread_id": 42}}
    )
    print("list of messages: ", final_state["messages"])
    """
    [
    HumanMessage(content='what is the weather in sf', additional_kwargs={}, response_metadata={}, id='02c25404-cf5e-46e6-95fa-5792b67b26df'),

    AIMessage(content=[{'citations': None, 'text': 'Let me search for the current weather in San Francisco.', 'type': 'text'}, {'id': 'toolu_01Bp68tJW1MpbxF5GAEK9w4J', 'input': {'query': 'current weather san francisco'}, 'name': 'search', 'type': 'tool_use'}], additional_kwargs={}, response_metadata={'id': 'msg_019s2R2EYn59owxWKiawSXL4', 'model': 'claude-3-5-sonnet-20241022', 'stop_reason': 'tool_use', 'stop_sequence': None, 'usage': {'cache_creation_input_tokens': 0, 'cache_read_input_tokens': 0, 'input_tokens': 377, 'output_tokens': 66}}, id='run-c9daf744-d40e-4052-8320-5ca645febda2-0', tool_calls=[{'name': 'search', 'args': {'query': 'current weather san francisco'}, 'id': 'toolu_01Bp68tJW1MpbxF5GAEK9w4J', 'type': 'tool_call'}], usage_metadata={'input_tokens': 377, 'output_tokens': 66, 'total_tokens': 443, 'input_token_details': {'cache_read': 0, 'cache_creation': 0}}),

    ToolMessage(content="It's 60 degrees and foggy.", name='search', id='2edbaa0e-f492-40af-8ccb-ecfece03a19e', tool_call_id='toolu_01Bp68tJW1MpbxF5GAEK9w4J'),

    AIMessage(content="Based on the search results, it's currently 60°F and foggy in San Francisco, which is quite typical weather for the city, known for its characteristic fog, especially during summer months.", additional_kwargs={}, response_metadata={'id': 'msg_01RcajB4eN9aHCxPtk7FBXYW', 'model': 'claude-3-5-sonnet-20241022', 'stop_reason': 'end_turn', 'stop_sequence': None, 'usage': {'cache_creation_input_tokens': 0, 'cache_read_input_tokens': 0, 'input_tokens': 463, 'output_tokens': 44}}, id='run-413c3d90-ba9f-4023-b55b-aaaacaf54b75-0', usage_metadata={'input_tokens': 463, 'output_tokens': 44, 'total_tokens': 507, 'input_token_details': {'cache_read': 0, 'cache_creation': 0}})]
    """
    print("-------------------------------------------")
    print(final_state["messages"][-1].content)
    """
    Based on the search results, it's currently 60°F and foggy in San Francisco, which is quite typical weather for the city, known for its characteristic fog, especially during summer months.
    """

    final_state = app.invoke(
        {"messages": [{"role": "user", "content": "what about ny"}]},
        config={"configurable": {"thread_id": 42}}
    )
    print("list of messages: ", final_state["messages"])
    print("-------------------------------------------")
    """
    [
    HumanMessage(content='what is the weather in sf', additional_kwargs={}, response_metadata={}, id='02c25404-cf5e-46e6-95fa-5792b67b26df'),

    AIMessage(content=[{'citations': None, 'text': 'Let me search for the current weather in San Francisco.', 'type': 'text'}, {'id': 'toolu_01Bp68tJW1MpbxF5GAEK9w4J', 'input': {'query': 'current weather san francisco'}, 'name': 'search', 'type': 'tool_use'}], additional_kwargs={}, response_metadata={'id': 'msg_019s2R2EYn59owxWKiawSXL4', 'model': 'claude-3-5-sonnet-20241022', 'stop_reason': 'tool_use', 'stop_sequence': None, 'usage': {'cache_creation_input_tokens': 0, 'cache_read_input_tokens': 0, 'input_tokens': 377, 'output_tokens': 66}}, id='run-c9daf744-d40e-4052-8320-5ca645febda2-0', tool_calls=[{'name': 'search', 'args': {'query': 'current weather san francisco'}, 'id': 'toolu_01Bp68tJW1MpbxF5GAEK9w4J', 'type': 'tool_call'}], usage_metadata={'input_tokens': 377, 'output_tokens': 66, 'total_tokens': 443, 'input_token_details': {'cache_creation': 0, 'cache_read': 0}}),

    ToolMessage(content="It's 60 degrees and foggy.", name='search', id='2edbaa0e-f492-40af-8ccb-ecfece03a19e', tool_call_id='toolu_01Bp68tJW1MpbxF5GAEK9w4J'),

    AIMessage(content="Based on the search results, it's currently 60°F and foggy in San Francisco, which is quite typical weather for the city, known for its characteristic fog, especially during summer months.", additional_kwargs={}, response_metadata={'id': 'msg_01RcajB4eN9aHCxPtk7FBXYW', 'model': 'claude-3-5-sonnet-20241022', 'stop_reason': 'end_turn', 'stop_sequence': None, 'usage': {'cache_creation_input_tokens': 0, 'cache_read_input_tokens': 0, 'input_tokens': 463, 'output_tokens': 44}}, id='run-413c3d90-ba9f-4023-b55b-aaaacaf54b75-0', usage_metadata={'input_tokens': 463, 'output_tokens': 44, 'total_tokens': 507, 'input_token_details': {'cache_creation': 0, 'cache_read': 0}}),

    HumanMessage(content='what about ny', additional_kwargs={}, response_metadata={}, id='197a82ba-689a-4f7a-ad40-eae82a83c6ea'),

    AIMessage(content=[{'citations': None, 'text': 'Let me search for the current weather in New York.', 'type': 'text'}, {'id': 'toolu_01T75CPjNBMY59RQLJZwYE37', 'input': {'query': 'current weather new york city'}, 'name': 'search', 'type': 'tool_use'}], additional_kwargs={}, response_metadata={'id': 'msg_017ezsaAX5YkbXbLjV7bSiVx', 'model': 'claude-3-5-sonnet-20241022', 'stop_reason': 'tool_use', 'stop_sequence': None, 'usage': {'cache_creation_input_tokens': 0, 'cache_read_input_tokens': 0, 'input_tokens': 513, 'output_tokens': 67}}, id='run-e754804f-3e42-4e99-b9e4-e9c1d431346e-0', tool_calls=[{'name': 'search', 'args': {'query': 'current weather new york city'}, 'id': 'toolu_01T75CPjNBMY59RQLJZwYE37', 'type': 'tool_call'}], usage_metadata={'input_tokens': 513, 'output_tokens': 67, 'total_tokens': 580, 'input_token_details': {'cache_read': 0, 'cache_creation': 0}}),

    ToolMessage(content="It's 90 degrees and sunny.", name='search', id='203c2132-2941-45f5-918e-0d6363a80928', tool_call_id='toolu_01T75CPjNBMY59RQLJZwYE37'),

    AIMessage(content="According to the search results, it's currently 90°F and sunny in New York City. That's quite warm, typical of a summer day in NYC!", additional_kwargs={}, response_metadata={'id': 'msg_01EZBKLKF4hXcVWRjBRUjAm4', 'model': 'claude-3-5-sonnet-20241022', 'stop_reason': 'end_turn', 'stop_sequence': None, 'usage': {'cache_creation_input_tokens': 0, 'cache_read_input_tokens': 0, 'input_tokens': 599, 'output_tokens': 37}}, id='run-57a3b08c-da05-4a43-8359-825015033a31-0', usage_metadata={'input_tokens': 599, 'output_tokens': 37, 'total_tokens': 636, 'input_token_details': {'cache_read': 0, 'cache_creation': 0}})]
    """
    print(final_state["messages"][-1].content)



if __name__ == "__main__":
    main()
