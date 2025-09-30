import os
from dotenv import load_dotenv, find_dotenv
from pydantic import BaseModel, Field, model_validator
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from langchain.output_parsers.json import SimpleJsonOutputParser


_ = load_dotenv(find_dotenv())
gpt_3_5_model_name = os.getenv('GPT_3_5_TURBO')
model = OpenAI(model_name="gpt-3.5-turbo-instruct", temperature=0)


# Define your desired data structure.
class Joke(BaseModel):
    setup: str = Field(description="question to set up a joke")
    punchline: str = Field(description="answer to resolve the joke")

    # You can add custom validation logic easily with Pydantic.
    @model_validator(mode="before")
    @classmethod
    def question_ends_with_question_mark(cls, values: dict) -> dict:
        setup = values.get("setup")

        if setup and setup[-1] != "?":
            raise ValueError("The setup must end with a question mark.")

        return values

if __name__ == "__main__":
    # Set up a parser + inject instructions into the prompt template.
    parser = PydanticOutputParser(pydantic_object=Joke)
    prompt = PromptTemplate(
        template="Answer the user query.\n{format_instructions}\n{query}\n",
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    # And a query intended to prompt a language model to populate the data structure.
    prompt_and_model = prompt | model
    output = prompt_and_model.invoke({"query": "Tell me a joke."})
    parser.invoke(output)

    # LCEL
    chain = prompt | model | parser
    chain.invoke({"query": "Tell me a joke."})

    # SimpleJsonOutputParser can stream through partial outputs.
    json_prompt = PromptTemplate.from_template(
        "Return a JSON object with an `answer` key that answers the following question: {question}",
    )
    # SimpleJsonOutputParser is alias of JsonOutputParser
    json_parser = SimpleJsonOutputParser()
    json_chain = json_prompt | model | json_parser
    # print(list(json_chain.stream({"question": "Who invented the microscope?"})))
    # [
    #   {},
    #   {'answer': ''},
    #   {'answer': 'Ant'},
    #   {'answer': 'Anton'},
    #   {'answer': 'Antonie'},
    #   {'answer': 'Antonie van'},
    #   {'answer': 'Antonie van Lee'},
    #   {'answer': 'Antonie van Leeu'},
    #   {'answer': 'Antonie van Leeuwen'},
    #   {'answer': 'Antonie van Leeuwenho'},
    #   {'answer': 'Antonie van Leeuwenhoek'}
    # ]

    # PydanticOutputParser can also stream through partial outputs.
    joke_chain = prompt | model | parser
    print(list(joke_chain.stream({"query": "Tell me a joke."})))
    # [
    #     Joke(setup='Why did the tomato turn red?', punchline=''),
    #     Joke(setup='Why did the tomato turn red?', punchline='Because'),
    #     Joke(setup='Why did the tomato turn red?', punchline='Because it'),
    #     Joke(setup='Why did the tomato turn red?', punchline='Because it saw'),
    #     Joke(setup='Why did the tomato turn red?', punchline='Because it saw the'),
    #     Joke(setup='Why did the tomato turn red?', punchline='Because it saw the salad'),
    #     Joke(setup='Why did the tomato turn red?', punchline='Because it saw the salad dressing'),
    #     Joke(setup='Why did the tomato turn red?', punchline='Because it saw the salad dressing!')
    # ]