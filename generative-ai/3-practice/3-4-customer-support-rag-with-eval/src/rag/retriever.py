from langchain_chroma import Chroma

from src.llms.embeddings_model import main as get_embeddings_model
from src.utils import constants


def get_retriever(
    collection_name: str = constants.CHROMA_MAIN_VECTOR_STORE_COLLECTION_NAME,
    persist_directory: str = constants.CHROMA_MAIN_VECTOR_STORE_PATH,
):
    # Access vector database from CHROME_PATH
    db: Chroma = Chroma(
        collection_name=collection_name,
        persist_directory=persist_directory,
        embedding_function=get_embeddings_model()
    )

    # Vector database as retriever
    retriever = db.as_retriever(
        # search_type="similarity_score_threshold",
        search_kwargs={
            # "score_threshold": 0.5,
            "k": 5
        }

    )
    return retriever


# Some debug code: get document in collection
# collection = db._client.get_collection(name=collection_name)
# documents = collection.get()

