import os
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel


_ = load_dotenv(find_dotenv())
gpt_4o_mini_model_name = os.getenv('GPT_4o_MINI')
model = ChatOpenAI(model_name=gpt_4o_mini_model_name, temperature=0)


def pipe_operator_example():
    prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")
    chain = prompt | model | StrOutputParser()
    output = chain.invoke({"topic": "python"})
    print(output)
    # Why do Python programmers prefer dark mode?\n\nBecause light attracts bugs! 🐍✨

def pipe_operator_coercion_dict_example():
    """dict can be coerced into runnable"""
    prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")
    chain = prompt | model | StrOutputParser()

    analysis_prompt = ChatPromptTemplate.from_template("is this a funny joke? {joke}")
    # composed_chain is a RunnableParallel
    composed_chain = {"joke": chain} | analysis_prompt | model | StrOutputParser()
    output = composed_chain.invoke({"topic": "python"})
    print(output)
    # Yes, that's a funny joke!
    # It cleverly plays on the double meaning of "light" and "bugs,"
    # making it relatable for Python programmers who often joke about debugging.
    # The use of the snake emoji adds a nice touch too!

def pipe_operator_coercion_function_example():
    """function can be coerced into runnable"""
    prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")
    chain = prompt | model | StrOutputParser()

    analysis_prompt = ChatPromptTemplate.from_template("is this a funny joke? {joke}")

    compose_chain_with_lambda = (
        chain
        | (lambda x: {"joke": x})
        | analysis_prompt
        | model
        | StrOutputParser()
    )
    print(compose_chain_with_lambda.invoke({"topic": "python"}))
    # Yes, that's a funny joke! It cleverly plays on the double meaning of "light" and "bugs,"
    # making it relatable for Python programmers who often joke about debugging.
    # The use of the snake emoji adds a nice touch too!


def pipe_method_example():
    prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")
    chain = prompt | model | StrOutputParser()

    analysis_prompt = ChatPromptTemplate.from_template("is this a funny joke? {joke}")

    composed_chain_with_pipe = (
        RunnableParallel({"joke": chain})
        .pipe(analysis_prompt)
        .pipe(model)
        .pipe(StrOutputParser())
    )
    output = composed_chain_with_pipe.invoke({"topic": "python"})
    print(output)
    # Yes, that's a funny joke! It plays on the double meaning of "light"—referring both to screen brightness and the idea that light attracts insects (bugs). It's a clever pun that many programmers, especially those who work with Python, can appreciate.

    # abbreviated
    composed_chain_with_pipe = RunnableParallel({"joke": chain}).pipe(
        analysis_prompt, model, StrOutputParser())


if __name__ == "__main__":
    pipe_operator_example()
    pipe_operator_coercion_dict_example()
    pipe_operator_coercion_function_example()
    pipe_method_example()