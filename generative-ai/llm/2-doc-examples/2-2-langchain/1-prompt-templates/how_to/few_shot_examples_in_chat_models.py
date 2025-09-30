import os
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv, find_dotenv
from langchain_core.prompts import ChatPromptTemplate, FewShotChatMessagePromptTemplate
from langchain_chroma import Chroma
from langchain_core.example_selectors import SemanticSimilarityExampleSelector
from langchain_openai import OpenAIEmbeddings


_ = load_dotenv(find_dotenv())
gpt_3_5_model_name = os.getenv('GPT_3_5_TURBO')

def fixed_examples():
    # Ask question with examples
    examples = [
        {"input": "2 🦜 2", "output": "4"},
        {"input": "2 🦜 3", "output": "5"},
    ]
    example_prompt = ChatPromptTemplate.from_messages(
        [
            ("human", "{input}"),
            ("ai", "{output}"),
        ]
    )
    few_shot_prompt = FewShotChatMessagePromptTemplate(
        example_prompt=example_prompt,
        examples=examples,
    )
    # print(few_shot_prompt.invoke({}).to_messages())
    # Output:
    # [
    #   HumanMessage(content='2 🦜 2', additional_kwargs={}, response_metadata={}),
    #   AIMessage(content='4', additional_kwargs={}, response_metadata={}),
    #   HumanMessage(content='2 🦜 3', additional_kwargs={}, response_metadata={}),
    #   AIMessage(content='5', additional_kwargs={}, response_metadata={})
    #]

    final_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You are a wondrous wizard of math."),
            few_shot_prompt,
            ("human", "{input}"),
        ]
    )
    chain = final_prompt | model
    # print(chain.invoke({"input": "What is 2 🦜 9?"}))
    # Output
    # content='11' additional_kwargs={'refusal': None} response_metadata={'token_usage': {'completion_tokens': 1, 'prompt_tokens': 60, 'total_tokens': 61, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None} id='run-f8010100-8afc-4f8a-8976-ab1bb0be12b4-0' usage_metadata={'input_tokens': 60, 'output_tokens': 1, 'total_tokens': 61, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}

    # Dynamic few-shot prompting


def dynamic_examples():
    examples = [
        {"input": "2 🦜 2", "output": "4"},
        {"input": "2 🦜 3", "output": "5"},
        {"input": "2 🦜 4", "output": "6"},
        {"input": "What did the cow say to the moon?", "output": "nothing at all"},
        {
            "input": "Write a poem about the moon",
            "output": "One for the moon, and one for me, who are we to talk about the moon?",
        }
    ]

    # Populate the store with the examples
    to_vectorize = [" ".join(examples.values()) for examples in examples]
    embeddings = OpenAIEmbeddings()
    vectorstore = Chroma.from_texts(to_vectorize, embeddings, metadatas=examples)

    # Create the example selector
    example_selector = SemanticSimilarityExampleSelector(
        vectorstore=vectorstore,
        k=2
    )
    # print(example_selector.select_examples({"input": "horse"}))
    # Output:
    # [{'input': 'What did the cow say to the moon?', 'output': 'nothing at all'}, {'input': '2 🦜 4', 'output': '6'}]

    # Create prompt template with example selector
    few_shot_prompt = FewShotChatMessagePromptTemplate(
        input_variables=["input"],
        example_selector=example_selector,
        example_prompt=ChatPromptTemplate.from_messages(
            [
                ("human", "{input}"),
                ("ai", "{output}"),
            ]
        ),
    )
    # print(few_shot_prompt.invoke(input="What's 3 🦜 3?").to_messages())
    # Output:
    # [
    #   HumanMessage(content='2 🦜 3', additional_kwargs={}, response_metadata={}),
    #   AIMessage(content='5', additional_kwargs={}, response_metadata={}),
    #   HumanMessage(content='2 🦜 4', additional_kwargs={}, response_metadata={}),
    #   AIMessage(content='6', additional_kwargs={}, response_metadata={})
    # ]

    # Create final prompt
    final_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You are a wondrous wizard of math."),
            few_shot_prompt,
            ("human", "{input}"),
        ]
    )
    # print(final_prompt.invoke({"input": "What is 3 🦜 3?"}))
    # Output
    # messages=[
    #   SystemMessage(content='You are a wondrous wizard of math.', additional_kwargs={}, response_metadata={}),
    #   HumanMessage(content='2 🦜 3', additional_kwargs={}, response_metadata={}),
    #   AIMessage(content='5', additional_kwargs={}, response_metadata={}),
    #   HumanMessage(content='2 🦜 4', additional_kwargs={}, response_metadata={}),
    #   AIMessage(content='6', additional_kwargs={}, response_metadata={}),
    #   HumanMessage(content='What is 3 🦜 3?', additional_kwargs={}, response_metadata={})
    # ]

    # Use with chat model
    chain = final_prompt | ChatOpenAI(model=gpt_3_5_model_name, temperature=0)
    print(chain.invoke({"input": "What is 3 🦜 3?"}))
    # Output
    # content='6' additional_kwargs={'refusal': None} response_metadata={'token_usage': {'completion_tokens': 1, 'prompt_tokens': 60, 'total_tokens': 61, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None} id='run-de19dbc1-961e-4bf9-8914-f301e9a2d91b-0' usage_metadata={'input_tokens': 60, 'output_tokens': 1, 'total_tokens': 61, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}


if __name__ == "__main__":
    model = ChatOpenAI(model=gpt_3_5_model_name, temperature=0)
    # Ask question without examples
    print(model.invoke("What is 2 🦜 9?"))

    fixed_examples()
    dynamic_examples()

