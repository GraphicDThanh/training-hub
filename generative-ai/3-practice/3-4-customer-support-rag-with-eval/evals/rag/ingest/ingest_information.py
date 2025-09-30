# %%
from __future__ import annotations
import logging
from typing import List
from langchain.docstore.document import Document
from langchain_chroma import Chroma

from src.llms.embeddings_model import main as get_embeddings_model
from src.rag.ingest import process_json_files
from evals.utils import constants


def main() -> None:
    """Main ingest information execution function."""
    logging.info("Creating information vector store ...")
    chunks: List[Document] = process_json_files(["information.json"])
    if not chunks:
        logging.info("No documents found to ingest.")
        return

    Chroma.from_documents(
        chunks,
        get_embeddings_model(),
        persist_directory=constants.EVALS_INFORMATION_VECTOR_STORE_PATH,
        collection_name=constants.EVALS_INFORMATION_VECTOR_STORE_COLLECTION_NAME,
    )
    logging.info("Information vector store created successfully.")

if __name__ == "__main__":
    main()
