import os
import warnings
import pandas as pd
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain


_ = load_dotenv(find_dotenv())
warnings.filterwarnings("ignore")
llm_model = os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO')
product_review_file_path = os.getenv('PRODUCT_REVIEW_FILE_PATH')
df = pd.read_csv(product_review_file_path)
print(df.head())


if __name__ == "__main__":
    llm = ChatOpenAI(temperature=0.9, model=llm_model)
    first_prompt = ChatPromptTemplate.from_template(
        "What is the best name to describe a company that makes {product}?"
    )
    chain = LLMChain(llm=llm, prompt=first_prompt)
    product = "iPhone 12"
    response = chain.run(product)
    print(response)


