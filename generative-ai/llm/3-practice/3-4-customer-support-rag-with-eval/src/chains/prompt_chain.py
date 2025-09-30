from langchain_core.runnables import RunnablePassthrough

from src.prompts.prompt_template import main as init_prompt_template
from src.rag.retriever import get_retriever


def main():
    return (
        {
            "context": get_retriever(),
            "input": RunnablePassthrough()
        } | init_prompt_template()
    )