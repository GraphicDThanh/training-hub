from langchain_openai import ChatOpenAI
from utils.config import LLM_MODEL, LLM_TEMPERATURE
from .base_model import BaseModel

class OpenAIChatModel(BaseModel):
    def __init__(self, streaming=False, callbacks=None):
        self.client = ChatOpenAI(
            model=LLM_MODEL,
            temperature=LLM_TEMPERATURE,
            streaming=streaming,
            callbacks=callbacks
        )

    def invoke(self, messages):
        return self.client.invoke(messages)
