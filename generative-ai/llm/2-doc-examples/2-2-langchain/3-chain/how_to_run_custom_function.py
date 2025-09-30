import json
import asyncio
from typing import Iterator, List, AsyncIterator
from operator import itemgetter
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import Runnable, RunnableLambda, chain, RunnableConfig
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
from langchain_community.callbacks import get_openai_callback


def use_the_constructor():
    def length_function(text):
        return len(text)

    def _multiple_length_function(text1, text2):
        return len(text1) * len(text2)

    def multiple_length_function(dict):
        return _multiple_length_function(dict["text1"], dict["text2"])

    model = ChatOpenAI()
    prompt = ChatPromptTemplate.from_template("What is {a} + {b}")
    chain1 = prompt | model
    chain = (
        {
            "a": itemgetter("foo") | RunnableLambda(length_function), # 3
            "b": {"text1": itemgetter("foo"), "text2": itemgetter("bar")}
            | RunnableLambda(multiple_length_function), # 9
        }
        | prompt
        | model
    )

    output = chain.invoke({"foo": "bar", "bar": "gah"})
    print(type(output))  # <class 'langchain_core.messages.ai.AIMessage'>
    print(output)
    # content='12' additional_kwargs={'refusal': None} response_metadata={'token_usage': {'completion_tokens': 1, 'prompt_tokens': 14, 'total_tokens': 15, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None} id='run-89b6a4dc-9813-4272-8af3-3fa028eee663-0' usage_metadata={'input_tokens': 14, 'output_tokens': 1, 'total_tokens': 15, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}

def chain_decorator():
    @chain
    def custom_chain(text):
        prompt_value1 = prompt1.invoke({"topic": text})
        output1 = ChatOpenAI().invoke(prompt_value1)
        parser_output1 = StrOutputParser().invoke(output1)
        chain2 = prompt2 | ChatOpenAI() | StrOutputParser()
        return chain2.invoke({"joke": parser_output1})

    prompt1 = ChatPromptTemplate.from_template("Tell me a joke about {topic}")
    prompt2 = ChatPromptTemplate.from_template("What is the subject of this joke: {joke}")
    output = custom_chain.invoke("bears")
    print(output)
    # The subject of this joke is a bear and his relationship with his girlfriend.

def auto_coercion_in_chains():
    prompt = ChatPromptTemplate.from_template("tell me a story about {topic}")
    model = ChatOpenAI()
    chain_with_coerced_function = prompt | model | (lambda x: x.content[:5])
    output = chain_with_coerced_function.invoke({"topic": "bears"})
    print(output)
    # Once

def passing_run_metadata():
    # def parse_or_fix(text: str, config: RunnableConfig):
    #     fixing_chain = (
    #         ChatPromptTemplate.from_template(
    #             "Fix the following text:\n\n\`\`\`text\n{input}\n\`\`\`\nError: {error}"
    #             " Don't narrate, just respond with the fixed data."
    #         )
    #         | model
    #         | StrOutputParser()
    #     )

    #     for _ in range(3):
    #         try:
    #             return json.loads(text)
    #         except Exception as e:
    #             error = str(e)
    #             text = fixing_chain.invoke({"input": text, "error": error}, config)

    #     return "Failed to parse"

    model = ChatOpenAI()
    # with get_openai_callback() as cb:
    #     output = RunnableLambda(parse_or_fix).invoke(
    #         "{foo: bar}", {"tags": ["my-tag"], "callbacks": [cb]}
    #     )
    #     print(output)
    #     print(cb)

    # Output:
    # {'foo': 'bar'}
    # Tokens Used: 70
    #         Prompt Tokens: 61
    #         Completion Tokens: 9
    # Successful Requests: 1
    # Total Cost (USD): $4.4e-05

def streaming():
    # This is a custom parser that splits the input into a list of strings separated by commas
    def split_into_list(input: Iterator[str]) -> Iterator[List[str]]:
        # hold partial input until we get a comma
        buffer = ""

        for chunk in input:
            # add current chunk to buffer
            buffer += chunk
            # while there are commas in the buffer
            while "," in buffer:
                # split buffer by comma
                comma_index = buffer.index(",")
                # yield everything before the comma
                yield [buffer[:comma_index].strip()]
                # save the rest for the text iteration
                buffer = buffer[comma_index + 1 :]

            # yield the last chink
            yield [buffer.strip()]

    model = ChatOpenAI()
    prompt = ChatPromptTemplate.from_template(
        "Write a comma-separated list of 5 animals similar to: {animal}. Do no include numbers"
    )

    str_chain = prompt | model | StrOutputParser()
    for chunk in str_chain.stream({"animal": "cat"}):
        print(chunk, end="|", flush=True)

    # Output: stream
    # |lion|,| tiger|,| che|et|ah|,| leopard|,| pan|ther||

    list_chain = str_chain | split_into_list
    for chunk in list_chain.stream({"animal": "cat"}):
        print(chunk, flush=True)

    output = list_chain.invoke({"animal": "bear"})
    print(output)
    # Output:
    # ['lion', 'tiger', 'wolf', 'gorilla', 'panda']

async def async_version():
    async def asplit_into_list(
        input: AsyncIterator[str]
    ) -> AsyncIterator[List[str]]:
        buffer = ""
        async for chunk in input:
            buffer += chunk
            while "," in buffer:
                comma_index = buffer.index(",")
                yield [buffer[:comma_index].strip()]
                buffer = buffer[comma_index + 1 :]
            yield [buffer.strip()]

    model = ChatOpenAI()
    prompt = ChatPromptTemplate.from_template(
        "Write a comma-separated list of 5 animals similar to: {animal}. Do no include numbers"
    )
    str_chain = prompt | model | StrOutputParser()
    list_chain = str_chain | asplit_into_list

    async for chunk in list_chain.astream({"animal": "cat"}):
        print(chunk, flush=True)


if __name__ == "__main__":
    use_the_constructor()
    chain_decorator()
    auto_coercion_in_chains()
    passing_run_metadata()
    streaming()
    asyncio.run(async_version())