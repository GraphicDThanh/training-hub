from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma


def create(docs):
    vector_store = Chroma.from_documents(
        documents=docs,
        embedding=OpenAIEmbeddings()
    )
    return vector_store