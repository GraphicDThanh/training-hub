import os
from dotenv import load_dotenv, find_dotenv
from typing import Optional, TypedDict, Union
from typing_extensions import Annotated
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import AIMessage, HumanMessage, ToolMessage


_ = load_dotenv(find_dotenv())
llm = ChatOpenAI(model="gpt-4o-mini")

# Pydantic 1
class JokePydantic(BaseModel):
    "Joke to tell user."

    setup: str = Field(description="The setup of the joke")
    punchline: str = Field(description="The punchline of the joke")
    rating: Optional[int] = Field(default=None, description="How funny the joke is, from 1 to 10")

# TypedDict
class JokeTypedDict(TypedDict):
    "Joke to tell user."
    setup: Annotated[str, ..., "The setup of the joke"]
    punchline: Annotated[str, ..., "The punchline of the joke"]
    rating: Annotated[Optional[int], ..., "How funny the joke is, from 1 to 10"]

# Pydantic 2
class ConversationPydantic(BaseModel):
    "Respond in a conversational manner. Be kind and helpful."

    response: str = Field(description="A conversational response to the user query.")

class FinalResponse(BaseModel):
    final_output: Union[JokePydantic, ConversationPydantic]


def example_with_structured_output():
    # Use .with_structured_output() method
    # - Pydantic class to return structured data.
    print("Use .with_structured_output() method with Pydantic class to return structured data.")
    print("-----------------")
    structured_llm_with_pydantic = llm.with_structured_output(JokePydantic)
    response = structured_llm_with_pydantic.invoke("Tell me a joke.")
    print(type(response))  # <class '__main__.Joke'>
    print(response)
    # setup="Why don't scientists trust atoms?" punchline='Because they make up everything!' rating=8

    # - TypeDict
    print("\nUse .with_structured_output() method with TypedDict to return structured data.")
    print("-----------------")
    structured_llm_with_typed_dict = llm.with_structured_output(JokeTypedDict)
    response = structured_llm_with_typed_dict.invoke("Tell me a joke.")
    print(type(response))  # <class 'dict'>
    print(response)
    # {'setup': 'Why did the scarecrow win an award?', 'punchline': 'Because he was outstanding in his field!', 'rating': 8}

    # - JSON schema
    print("\nUse .with_structured_output() method with JSON schema to return structured data.")
    print("-----------------")
    json_schema = {
        "title": "joke",
        "description": "Joke to tell a user.",
        "type": "object",
        "properties": {
            "setup": {"type": "string", "description": "The setup of the joke"},
            "punchline": {"type": "string", "description": "The punchline of the joke"},
            "rating": {"type": "integer", "description": "How funny the joke is, from 1 to 10", "default": None},
        },
        "required": ["setup", "punchline"],
    }

    structured_llm_with_json_schema = llm.with_structured_output(json_schema)
    response = structured_llm_with_json_schema.invoke("Tell me a joke.")
    print(type(response))  # <class 'dict'>
    print(response)
    # {'setup': "Why don't scientists trust atoms?", 'punchline': 'Because they make up everything!', 'rating': 8}

    # - Choosing between multiple schemas
    print("\nUse .with_structured_output() method with multiple schemas to return structured data.")
    structured_llm_with_multiple_schemas = llm.with_structured_output(FinalResponse)
    response = structured_llm_with_multiple_schemas.invoke("Tell me a joke about cats.")
    print(type(response))  # <class '__main__.FinalResponse'>
    print(response)
    # final_output=JokePydantic(setup='Why was the cat sitting on the computer?', punchline='Because it wanted to keep an eye on the mouse!', rating=7)

    # Streaming
    structured_llm = llm.with_structured_output(JokePydantic)
    for chunk in structured_llm.stream("Tell me a joke."):
        print(chunk)

    # setup="Why don't skeletons fight each other?" punchline='' rating=None
    # setup="Why don't skeletons fight each other?" punchline='They' rating=None
    # setup="Why don't skeletons fight each other?" punchline="They don't" rating=None
    # setup="Why don't skeletons fight each other?" punchline="They don't have" rating=None
    # setup="Why don't skeletons fight each other?" punchline="They don't have the" rating=None
    # setup="Why don't skeletons fight each other?" punchline="They don't have the guts" rating=None
    # setup="Why don't skeletons fight each other?" punchline="They don't have the guts!" rating=None

def example_few_shot_prompting():
    system = """You are a hilarious comedian. Your specialty is knock-knock jokes. \
Return a joke which has the setup (the response to "Who's there?") and the final punchline (the response to "<setup> who?").

Here are some examples of jokes:

example_user: Tell me a joke about planes
example_assistant: {{"setup": "Why don't planes ever get tired?", "punchline": "Because they have rest wings!", "rating": 2}}

example_user: Tell me another joke about planes
example_assistant: {{"setup": "Cargo", "punchline": "Cargo 'vroom vroom', but planes go 'zoom zoom'!", "rating": 10}}

example_user: Now about caterpillars
example_assistant: {{"setup": "Caterpillar", "punchline": "Caterpillar really slow, but watch me turn into a butterfly and steal the show!", "rating": 5}}"""

    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", "{input}")])

    structured_llm_with_pydantic = llm.with_structured_output(JokePydantic)
    few_shot_structured_llm = prompt | structured_llm_with_pydantic
    response = few_shot_structured_llm.invoke("What's something funny about woodpeckers?")
    print(type(response))  # <class '__main__.JokePydantic'>
    print(response)
    # setup='Woodpecker' punchline="Woodpecker knock, knock, but it's always the tree that answers back with a 'knock, knock who's there?'." rating=7

def example_few_shot_prompting_explicit_tool_calls():
    examples = [
        HumanMessage("Tell me a joke about planes", name="example_user"),
        AIMessage(
            "",
            name="example_assistant",
            tool_calls=[
                {
                    "name": "Joke",
                    "args": {
                        "setup": "Why don't planes ever get tired?",
                        "punchline": "Because they have rest wings!",
                        "rating": 2,
                    },
                    "id": "1",
                }
            ]
        ),

        # Most tool-calling models expect a ToolMessage(s) to follow an AIMessage with tool calls.
        ToolMessage("", tool_call_id="1"),
        # Some models also expect an AIMessage to follow any ToolMessages,
        # so you may need to add an AIMessage here.
        HumanMessage("Tell me another joke about planes", name="example_user"),
        AIMessage(
            "",
            name="example_assistant",
            tool_calls=[
                {
                    "name": "joke",
                    "args": {
                        "setup": "Cargo",
                        "punchline": "Cargo 'vroom vroom', but planes go 'zoom zoom'!",
                        "rating": 10,
                    },
                    "id": "2",
                }
            ]
        ),

        ToolMessage("", tool_call_id="2"),
        HumanMessage("Now about caterpillars", name="example_user"),
        AIMessage(
            "",
            tool_calls=[
                {
                    "name": "joke",
                    "args": {
                        "setup": "Caterpillar",
                        "punchline": "Caterpillar really slow, but watch me turn into a butterfly and steal the show!",
                        "rating": 5,
                    },
                    "id": "3",
                }
            ]
        ),
        ToolMessage("", tool_call_id="3"),
    ]

    system = """You are hilarious comedian. Your specialty is knock-knock jokes. \
Return a joke which has the setup (the response to "Who's there?") \
and the final punchline (the response to "<setup> who?")."""

    prompt = ChatPromptTemplate.from_messages(
        [("system", system), ("placeholder", "{examples}"), ("human", "{input}")]
    )
    few_shot_structured_llm = prompt | llm.with_structured_output(JokePydantic)
    response = few_shot_structured_llm.invoke({"input": "crocodiles", "examples": examples})
    print(type(response))
    print(response)

if __name__ == "__main__":
    example_with_structured_output()
    example_few_shot_prompting()
    example_few_shot_prompting_explicit_tool_calls()
