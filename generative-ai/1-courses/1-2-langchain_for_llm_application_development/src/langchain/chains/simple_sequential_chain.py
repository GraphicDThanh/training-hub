import os
import warnings
import pandas as pd
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain, SimpleSequentialChain


_ = load_dotenv(find_dotenv())
warnings.filterwarnings("ignore")
llm_model = os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO')
product_review_file_path = os.getenv('PRODUCT_REVIEW_FILE_PATH')
df = pd.read_csv(product_review_file_path)
print(df.head())


if __name__ == "__main__":
    llm = ChatOpenAI(temperature=0.9, model=llm_model)

    # prompt template 1
    first_prompt = ChatPromptTemplate.from_template(
        "What is the best name to describe a company that makes {product}?"
    )

    # Chain 1
    chain_one = LLMChain(llm=llm, prompt=first_prompt)

    # prompt template 2
    second_prompt = ChatPromptTemplate.from_template(
        "Write a 20 words description for the following company:{company_name}"
    )
    # chain 2
    chain_two = LLMChain(llm=llm, prompt=second_prompt)

    overall_simple_chain = SimpleSequentialChain(chains=[chain_one, chain_two], verbose=True)
    product = "iPhone 12"
    overall_simple_chain.run(product)

