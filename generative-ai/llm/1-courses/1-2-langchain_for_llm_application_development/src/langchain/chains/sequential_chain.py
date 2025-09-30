import os
import warnings
import pandas as pd
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain, SequentialChain


_ = load_dotenv(find_dotenv())
warnings.filterwarnings("ignore")
llm_model = os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO')
product_review_file_path = os.getenv('PRODUCT_REVIEW_FILE_PATH')
df = pd.read_csv(product_review_file_path)

if __name__ == "__main__":
    llm = ChatOpenAI(temperature=0.9, model=llm_model)

    # prompt template 1
    first_prompt = ChatPromptTemplate.from_template(
        "Translate the following review to english:"
        "\n\n{Review}"
    )

    # Chain 1: input=Review, output=English_Review
    chain_one = LLMChain(llm=llm, prompt=first_prompt, output_key="English_Review")

    # prompt template 2
    second_prompt = ChatPromptTemplate.from_template(
        "Can you summary the following review in 1 sentence under 10 words:"
        "\n\n{English_Review}"
    )
    # chain 2: input=English_Review, output=Summary
    chain_two = LLMChain(llm=llm, prompt=second_prompt, output_key="Summary")

    # prompt template 3
    third_prompt = ChatPromptTemplate.from_template(
        "What language is the following review:\n\n{Review}"
    )
    # chain 3: input=Review, output=Language
    chain_three = LLMChain(llm=llm, prompt=third_prompt, output_key="Language")

    # prompt template 4
    fourth_prompt = ChatPromptTemplate.from_template(
        "Write a follow up response to the following "
        "summary in the specified language:"
        "\n\nSummary: {Summary}\n\nLanguage: {Language}"
    )
    # chain 4: input=Summary, Language, output=Follow_Up_Message
    chain_four = LLMChain(llm=llm, prompt=fourth_prompt, output_key="Follow_Up_Message")

    # overall_chain: input= Review
    # output= English_Review, Summary, Language, Follow_Up_Message
    overall_chain = SequentialChain(
        chains=[chain_one, chain_two, chain_three, chain_four],
        input_variables=["Review"],
        output_variables=["English_Review", "Language", "Summary", "Follow_Up_Message"],
        verbose=True
    )
    review = df["Review"][4]
    response = overall_chain(review)
    print(response)

