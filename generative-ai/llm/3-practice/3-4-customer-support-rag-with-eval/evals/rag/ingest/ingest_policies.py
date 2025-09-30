# %%
from __future__ import annotations
import logging
from typing import List
from langchain.docstore.document import Document
from langchain_chroma import Chroma

from src.llms.embeddings_model import main as get_embeddings_model
from src.rag.ingest import process_files
from evals.utils import constants


def main() -> None:
    """Main ingest policies execution function."""
    logging.info("Creating policies vector store ...")
    chunks: List[Document] = process_files(["policies.yaml"])
    if not chunks:
        logging.info("No documents found to ingest.")
        return

    Chroma.from_documents(
        chunks,
        get_embeddings_model(),
        persist_directory=constants.EVALS_POLICIES_VECTOR_STORE_PATH,
        collection_name=constants.EVALS_POLICIES_VECTOR_STORE_COLLECTION_NAME,
    )
    logging.info("Policies vector store created successfully.")

if __name__ == "__main__":
    main()
