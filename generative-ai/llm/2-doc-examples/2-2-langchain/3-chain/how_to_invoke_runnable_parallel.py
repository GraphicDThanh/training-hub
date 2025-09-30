from operator import itemgetter
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

vectorstore = FAISS.from_texts(
    ["harrison worked at kensho"], embedding=OpenAIEmbeddings()
)
retriever = vectorstore.as_retriever()

model = ChatOpenAI()

def formatting_with_run_parallel():
    # The dict in the chain is auto parsed and converted into a RunnableParallel
    template = """Answer the question based only on the following context:
    {context}
    Question: {question}
    """
    prompt = ChatPromptTemplate.from_template(template)

    retriever_chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | model
        | StrOutputParser()
    )

    output = retriever_chain.invoke("where did harrison work?")
    print(output)
    # Harrison worked at Kensho.


def use_itemgetter_as_shorthand():
    template = """Answer the question based only on the following context:
    {context}

    Question: {question}

    Answer in the following language: {language}"""
    prompt = ChatPromptTemplate.from_template(template)
    chain = (
        {
            "context": itemgetter("question") | retriever,
            "question": itemgetter("question"),
            "language": itemgetter("language"),
        }
        | prompt
        | model
        | StrOutputParser()
    )

    output = chain.invoke({"question": "where did harrison work?", "language": "French"})
    print(output)
    # Harrison a travaillé chez Kensho.


def parallel_steps():
    joke_chain = ChatPromptTemplate.from_template("tell me a joke about {topic}") | model
    poem_chain = ChatPromptTemplate.from_template("write a 2-line poem about {topic}") | model
    map_chain = RunnableParallel(joke=joke_chain, poem=poem_chain)
    output = map_chain.invoke({"topic": "cats"})
    print(output)
    # Output
    # {
    #   'joke': AIMessage(content='Why was the cat sitting on the computer? \n\nBecause it wanted to keep an eye on the mouse!', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 21, 'prompt_tokens': 13, 'total_tokens': 34, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None}, id='run-90f7a3b5-9c15-4a67-a9cd-773de54194f9-0', usage_metadata={'input_tokens': 13, 'output_tokens': 21, 'total_tokens': 34, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}),
    #   'poem': AIMessage(content='Whiskers twitch, eyes gleam with mystery,\nPurring softly, they hold ancient history.', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 20, 'prompt_tokens': 15, 'total_tokens': 35, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None}, id='run-bd99cb97-6e40-4835-89b4-3a3cb294e9ef-0', usage_metadata={'input_tokens': 15, 'output_tokens': 20, 'total_tokens': 35, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})
    # }


if __name__ == "__main__":
    formatting_with_run_parallel()
    use_itemgetter_as_shorthand()

