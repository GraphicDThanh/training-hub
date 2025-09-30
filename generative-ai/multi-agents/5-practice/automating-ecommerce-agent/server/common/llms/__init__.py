from .llms import ChatModel, EmbeddingModel

chat_model = ChatModel()
embedding_model = EmbeddingModel()

__all__ = [
    "chat_model",
    "embedding_model",
]
