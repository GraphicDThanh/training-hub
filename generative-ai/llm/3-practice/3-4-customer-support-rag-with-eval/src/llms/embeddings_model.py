from langchain_openai import OpenAIEmbeddings

from src.utils import constants


def main():
    return OpenAIEmbeddings(
        model=constants.OPENAI_AI_EMBEDDING_MODEL,
    )