import os

from dotenv import find_dotenv, load_dotenv

_ = load_dotenv(find_dotenv())

# General
MAX_WORKERS: int = 5
TEXT_FILES = ["faqs.txt"]

# Base documents
BASE_DOCUMENTS_FOLDER: str = os.getenv("BASE_DOCUMENTS_FOLDER", "data/documents")

# Splitter
SPLITTER_TEXT_CHUNK_SIZE = int(os.getenv("SPLITTER_TEXT_CHUNK_SIZE", 500))
SPLITTER_TEXT_CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", 50))
SPLITTER_JSON_MAX_CHUNK_SIZE = int(os.getenv("SPLITTER_JSON_MAX_CHUNK_SIZE", 500))

# Vector Store
CHROMA_MAIN_VECTOR_STORE_PATH: str = os.getenv("CHROMA_MAIN_VECTOR_STORE_PATH", "db/embeddings/chroma/main_vector_store")
CHROMA_MAIN_VECTOR_STORE_COLLECTION_NAME: str = os.getenv("CHROMA_MAIN_VECTOR_STORE_COLLECTION_NAME", "main_collections")

# Retriever
RETRIEVER_SCORE_THRESHOLD = float(os.getenv("RETRIEVER_SCORE_THRESHOLD", 0.5))
RETRIEVER_K = int(os.getenv("RETRIEVER_K", 5))

# Model
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-3.5-turbo")
LLM_TEMPERATURE = os.getenv("LLM_TEMPERATURE", 0)
OPENAI_AI_EMBEDDING_MODEL = os.getenv("OPENAI_AI_EMBEDDING_MODEL", "text-embedding-3-small")

