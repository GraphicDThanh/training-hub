# ruff: noqa: E402
import os
import sys

from chromadb.errors import InvalidCollectionException
from common.llms import embedding_model
from langchain_chroma import Chroma

# Config path for script
server_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
if server_path not in sys.path:
    sys.path.append(server_path)


# Load from server modules
from common.config import settings


def get_retriever(
    collection_name: str = settings.vector_store.COLLECTION_NAME,
    persist_directory: str = settings.vector_store.PATH,
    service_category: str = "faqs",
):
    # Access vector database from CHROME_PATH
    try:
        db: Chroma = Chroma(
            collection_name=collection_name,
            persist_directory=f"{server_path}/{persist_directory}",
            embedding_function=embedding_model.default_model,
            create_collection_if_not_exists=False,
        )
    except InvalidCollectionException:
        raise ValueError(
            f"No documents found in the collection of vector database located at {persist_directory}."
        )

    return db.as_retriever(
        search_type="similarity",
        search_kwargs={
            "k": 5,
            "filter": {"service_category": {"$eq": service_category}},
        },
    )
