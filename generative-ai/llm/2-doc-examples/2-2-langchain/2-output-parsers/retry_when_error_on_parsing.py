import os
from dotenv import load_dotenv, find_dotenv

from langchain.output_parsers import OutputFixingParser, PydanticOutputParser, RetryOutputParser
from langchain_core.exceptions import OutputParserException
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI, ChatOpenAI
from pydantic import BaseModel, Field

_ = load_dotenv(find_dotenv())
gpt_3_5_model_name = os.getenv('GPT_3_5_TURBO')
model = ChatOpenAI(model_name="gpt-3.5-turbo-instruct", temperature=0)


class Action(BaseModel):
    action: str = Field(description="action to take")
    action_input: str = Field(description="input for the action")

parser = PydanticOutputParser(pydantic_object=Action)


if __name__ == "__main__":
    template = """Based on the user question, provide an Action and Action Input for what step should be taken.
    {format_instructions}
    Question: {query}
    Response:"""

    prompt = PromptTemplate(
        template="Answer the user query.\n{format_instructions}\n{query}\n",
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    prompt_value = prompt.format_prompt(query="who is leo di caprios gf?")
    # print("prompt_value: \n", prompt_value)
    # print("-------------------")
    # text='Answer the user query.\n
    # The output should be formatted as a JSON instance that conforms to the JSON schema below.\n\n
    # As an example, for the schema {"properties": {"foo": {"title": "Foo", "description": "a list of strings", "type": "array", "items": {"type": "string"}}}, "required": ["foo"]}\n
    # the object {"foo": ["bar", "baz"]} is a well-formatted instance of the schema.
    # The object {"properties": {"foo": ["bar", "baz"]}} is not well-formatted.\n\n
    # Here is the output schema:\n```\n
    # {"properties": {"action": {"description": "action to take", "title": "Action", "type": "string"}, "action_input": {"description": "input for the action", "title": "Action Input", "type": "string"}}, "required": ["action", "action_input"]}\n```\n
    # who is leo di caprios gf?\n'

    bad_response = '{"action": "search"}'

    try:
        parser.parse(bad_response)
    except OutputParserException as e:
        print(e)

    # Failed to parse Action from completion {"action": "search"}. Got: 1 validation error for Action
    # action_input
    # Field required [type=missing, input_value={'action': 'search'}, input_type=dict]
    #     For further information visit https://errors.pydantic.dev/2.9/v/missing
    # For troubleshooting, visit: https://python.langchain.com/docs/troubleshooting/errors/OUTPUT_PARSING_FAILURE

    # Use OutputFixingParser to fix this error,
    # it will be confused-namely, it doesn't know what to actually put for action input.
    print("OutputFixingParser")
    print("-------------------")
    fix_parser = OutputFixingParser.from_llm(parser=parser, llm=ChatOpenAI())
    print(fix_parser.parse(bad_response))
    # Output:
    # action='search' action_input='keyword'

    # Instead, use RetryOutputParser, which passes in the prompt (as well as the origin output)
    # to try again to get better response
    print("RetryOutputParser")
    print("-------------------")
    retry_parser = RetryOutputParser.from_llm(parser=parser, llm=OpenAI(temperature=0))
    print(retry_parser.parse_with_prompt(bad_response, prompt_value))
    # Output:
    # action='search' action_input='leo di caprios gf'

    # Add RetryOutputParser to the chain
    print("Add RetryOutputParser to the chain")
    print("-------------------")
    from langchain_core.runnables import RunnableLambda, RunnableParallel

    completion_chain = prompt | OpenAI(temperature=0)

    main_chain = RunnableParallel(
        completion=completion_chain,
        prompt_value=prompt,
    ) | RunnableLambda(lambda x: retry_parser.parse_with_prompt(**x))

    print(main_chain.invoke({"query": "who is leo di caprios gf?"}))
    # action='search' action_input='leo di caprios gf'