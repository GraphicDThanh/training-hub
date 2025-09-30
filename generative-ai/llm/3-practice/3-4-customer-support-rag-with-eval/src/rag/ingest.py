# %%
"""
Document ingestion script for RAG implementation.
Load documents (txt, json, csv) from data/documents folder, splits them into chunks,
and store them in a Chroma vector database (persistent local).
Ref: https://github.com/promptfoo/promptfoo/tree/main/examples/rag-full

Usage: `python src/rag/ingest.py`
"""
from __future__ import annotations
# import sys
# import os
import concurrent
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Dict, List, Tuple

from langchain.docstore.document import Document
from langchain.text_splitter import (RecursiveCharacterTextSplitter,
                                     RecursiveJsonSplitter)
from langchain_chroma import Chroma
from tqdm import tqdm

# CONFIG PATH WHEN RUN SCRIPT TO ALLOW IMPORT MODULE FROM ROOT DIR
# ----------------------------------------------------------------
# root_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
# if root_path not in sys.path:
#     sys.path.append(root_path)
# ----------------------------------------------------------------
from src.config.main import init_config  # noqa: E402
from src.llms.embeddings_model import main as get_embeddings_model # noqa: E402
from src.rag.loader import BaseLoader # noqa: E402
from src.utils import constants, utils # noqa: E402

# --- Allow parse args ---
import argparse
# Create a parser object
parser = argparse.ArgumentParser()
# Add an argument
parser.add_argument('--force', type=str, help='Force recreate the database')
# Parse the arguments
parser_args = parser.parse_args()
# --- End allow parse args ---

init_config()
def process_files(files) -> List[Document]:
    """
    Process files and split them into chunks

    Returns:
        List of document chunks
    """
    def process_single_file(file_name: str) -> Tuple[str, List[Document]]:
        """
        Process a single text file and return it chunks

        Args:
            file_name (str): Name of the text file to process

        Returns:
            Tuple containing filename and list of document chunks
        """
        try:
            print("Processing :", utils.get_path(file_name, constants.BASE_DOCUMENTS_FOLDER))
            documents = BaseLoader.load_file(
                utils.get_path(file_name, constants.BASE_DOCUMENTS_FOLDER)
            )
            text_splitter: RecursiveCharacterTextSplitter = RecursiveCharacterTextSplitter(
                chunk_size=constants.SPLITTER_TEXT_CHUNK_SIZE,
                chunk_overlap=constants.SPLITTER_TEXT_CHUNK_OVERLAP
            )
            chunks: List[Document] = text_splitter.split_documents(documents)
            return file_name, chunks
        except Exception as e:
            logging.error(f"Error processing {file_name}: {str(e)}")
            return file_name, []

    all_chunks: List[Document] = []
    print("START PROCESS FILES:", files)

    with ThreadPoolExecutor(max_workers=constants.MAX_WORKERS) as executor:
        # Submit all text files processing tasks

        future_to_text_file: Dict[
            concurrent.futures.Future[Tuple[str, List[Document]]], str
        ] = {
            executor.submit(process_single_file, text_file): text_file
            for text_file in files
        }

        # Process completed tasks with process bar
        with tqdm(total=len(files), desc="Processing text files") as pbar:
            for future in as_completed(future_to_text_file):
                text_file: str = future_to_text_file[future]
                try:
                    file_name, chunks = future.result()
                    all_chunks.extend(chunks)
                    pbar.update(1)
                except Exception as e:
                    logging.error(f"Error processing {text_file}: {str(e)}")

        logging.info(f"Processed {len(all_chunks)} text file chunks")
        return all_chunks

def process_json_files(files: List[str]) -> List[Document]:
    docs = []
    json_splitter = RecursiveJsonSplitter(
        max_chunk_size=constants.SPLITTER_JSON_MAX_CHUNK_SIZE
    )

    for file in files:
        print("Processing :", utils.get_path(file, constants.BASE_DOCUMENTS_FOLDER))
        # json_splitter = RecursiveJsonSplitter(
        #     max_chunk_size=constants.SPLITTER_JSON_MAX_CHUNK_SIZE
        # )
        file_docs = json_splitter.create_documents(
            texts=[utils.load_json(f"data/documents/{file}")],
            metadatas=[{"source": utils.get_path(constants.BASE_DOCUMENTS_FOLDER, file)}]
        )
        docs.extend(file_docs)

    return docs

def create_vector_store(chunks: List[Document], batch_size: int = 10) -> None:
    """
    Create and persist the vector store from document chunks in batches.

    Args:
        chunks: List of document chunks to embed
        batch_size: Number of documents to process in each batch
    """
    logging.info("Creating main vector store ...")

    # Process first batch
    current_batch: List[Document] = chunks[:batch_size]
    db: Chroma = Chroma.from_documents(
        current_batch,
        get_embeddings_model(),
        persist_directory=constants.CHROMA_MAIN_VECTOR_STORE_PATH,
        collection_name=constants.CHROMA_MAIN_VECTOR_STORE_COLLECTION_NAME,
    )
    with tqdm(
        total=len(chunks), initial=batch_size, desc="Embedding documents"
    ) as pbar:
        for i in range(batch_size, len(chunks), batch_size):
            current_batch = chunks[i : i + batch_size]
            db.add_documents(current_batch)
            pbar.update(batch_size)

    logging.info("Main vector store created successfully.")


def main() -> None:
    """Main execution function."""
    logging.info("Starting document ingestion ...")
    if (
        not parser_args.force
        and utils.is_chroma_db_exist(constants.CHROMA_MAIN_VECTOR_STORE_PATH)
    ):
        # Not allow to recreate the database if not force
        logging.info("Chroma database already exists. If you want to recreate it, delete the existing one.")
        return

    text_chunks: List[Document] = process_files(constants.TEXT_FILES)
    json_chunks: List[Document] = process_json_files(["information.json", "products.json"])
    chunks = [*text_chunks, *json_chunks]
    if chunks:
        # Create vector store persistently in CHROMA_PATH
        create_vector_store(chunks)

# TODO: Use load_and_split
# https://python.langchain.com/api_reference/community/document_loaders/langchain_community.document_loaders.json_loader.JSONLoader.html#langchain_community.document_loaders.json_loader.JSONLoader.load_and_split
if __name__ == "__main__":
    main()

# %%