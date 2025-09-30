from langchain_openai import ChatOpenAI

from src.utils import constants


def main(streaming=False, callbacks=None):
    return ChatOpenAI(
        model=constants.LLM_MODEL,
        temperature=constants.LLM_TEMPERATURE,
        streaming=streaming,
        callbacks=callbacks
    )
