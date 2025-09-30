from langchain.chat_models import init_chat_model
from langchain_openai import OpenAIEmbeddings


class ChatModel:
    def __init__(self):
        self.gpt_4o_mini = self.gpt_4o_mini()
        self.gpt_4_1_mini = self.gpt_4_1_mini()
        self.gpt_4o = self.gpt_4o()
        self.default_model = self.gpt_4o_mini

    def gpt_4o_mini(self):
        """Return the model name for gpt-4o-mini"""
        return init_chat_model(
            model="gpt-4o-mini",
            model_provider="openai",
            temperature=0.2,
            callbacks=None,
        )

    def gpt_4_1_mini(self):
        """Return the model name for gpt-4.1-mini"""
        return init_chat_model(
            model="gpt-4.1-mini",
            model_provider="openai",
            temperature=0.2,
            callbacks=None,
        )

    def gpt_4o(self):
        """Return the model name for gpt-4o"""
        return init_chat_model(
            model="gpt-4o",
            model_provider="openai",
            temperature=0.2,
            callbacks=None,
        )


class EmbeddingModel:
    def __init__(self):
        self.openai_text_embedding_3_small = self.openai_text_embedding_3_small()
        self.default_model = self.openai_text_embedding_3_small

    def openai_text_embedding_3_small(self):
        """Return the model name for openai text-embedding-3-small"""
        return OpenAIEmbeddings(
            model="text-embedding-3-small",
        )
