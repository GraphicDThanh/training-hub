import os
from dotenv import load_dotenv, find_dotenv
from pydantic import BaseModel, Field
from langchain_openai import OpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser


_ = load_dotenv(find_dotenv())
gpt_3_5_model_name = os.getenv('GPT_3_5_TURBO')
model = OpenAI(model_name="gpt-3.5-turbo-instruct", temperature=0)


# Define your desired data structure.
class Joke(BaseModel):
    setup: str = Field(description="question to set up a joke")
    punchline: str = Field(description="answer to resolve the joke")


def output_parse_json_with_pydantic_class():
    # JsonOutputParser - With Pydantic Class
    # And a query intended to prompt a language model to populate the data structure.
    joke_query = "Tell me a joke."

    # Set up a parser + inject instructions into the prompt template.
    parser = JsonOutputParser(pydantic_object=Joke)

    prompt = PromptTemplate(
        template="Answer the user query.\n{format_instructions}\n{query}\n",
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    # print("parser.get_format_instructions(): \n ", parser.get_format_instructions())
    # print("-------------------")
    # Output:
    # The output should be formatted as a JSON instance that conforms to the JSON schema below.

    # As an example, for the schema {"properties": {"foo": {"title": "Foo", "description": "a list of strings", "type": "array", "items": {"type": "string"}}}, "required": ["foo"]}
    # the object {"foo": ["bar", "baz"]} is a well-formatted instance of the schema. The object {"properties": {"foo": ["bar", "baz"]}} is not well-formatted.

    # Here is the output schema:
    # ```
    # {"properties": {"setup": {"description": "question to set up a joke", "title": "Setup", "type": "string"}, "punchline": {"description": "answer to resolve the joke", "title": "Punchline", "type": "string"}}, "required": ["setup", "punchline"]}
    # ```

    chain = prompt | model | parser
    response = chain.invoke({"query": joke_query})
    print("response: \n", response)
    #  {'setup': 'Why did the tomato turn red?', 'punchline': 'Because it saw the salad dressing!'}

    # JsonOutputParser - With Pydantic Class - Streaming
    for s in chain.stream({"query": joke_query}):
        print(s)

def output_parse_json_without_pydantic_class():
    # JsonOutputParser - Without Pydantic Class
    joke_query = "Tell me a joke."
    parser = JsonOutputParser()
    prompt = PromptTemplate(
        template="Answer the user query.\n{format_instructions}\n{query}\n",
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    chain = prompt | model | parser
    print(chain.invoke({"query": joke_query}))
    # {'joke': "Why couldn't the bicycle stand up by itself? Because it was two-tired."}

if __name__ == "__main__":
    output_parse_json_with_pydantic_class()
    output_parse_json_without_pydantic_class()
