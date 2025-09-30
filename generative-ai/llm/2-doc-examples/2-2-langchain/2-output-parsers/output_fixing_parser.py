import os
from dotenv import load_dotenv, find_dotenv
from typing import List
from langchain_openai import ChatOpenAI
from langchain.output_parsers import OutputFixingParser
from langchain_core.exceptions import OutputParserException
from langchain_core.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field


_ = load_dotenv(find_dotenv())
gpt_3_5_model_name = os.getenv('GPT_3_5_TURBO')
model = ChatOpenAI(model_name="gpt-3.5-turbo-instruct", temperature=0)


class Actor(BaseModel):
    name: str = Field(description="name of the actor")
    film_names: List[str] = Field(description="names of films the actor has appeared in")

if __name__ == "__main__":
    actor_query = "Generate the filmography for a random actor."
    parser = PydanticOutputParser(pydantic_object=Actor)

    misformatted = "{'name': 'Tom Hanks', 'film_names': ['Forrest Gump']}"

    try:
        parser.parse(misformatted)
    except OutputParserException as e:
        print(e)

    # Output
    # Invalid json output: {'name': 'Tom Hanks', 'film_names': ['Forrest Gump']}
    # For troubleshooting, visit: https://python.langchain.com/docs/troubleshooting/errors/OUTPUT_PARSING_FAILURE

    # Fixing Parser
    new_parser = OutputFixingParser.from_llm(parser=parser, llm=ChatOpenAI())

    print(new_parser.parse(misformatted))
    # name='Tom Hanks' film_names=['Forrest Gump']
