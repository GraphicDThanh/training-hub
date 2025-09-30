import os
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())

LLM_MODEL = os.getenv("LLM_MODEL", "gpt-3.5-turbo")
LLM_TEMPERATURE = os.getenv("LLM_TEMPERATURE", 0)

SPLITTER_TEXT_CHUNK_SIZE = int(os.getenv("SPLITTER_TEXT_CHUNK_SIZE", 500))
SPLITTER_TEXT_CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", 50))
SPLITTER_JSON_MAX_CHUNK_SIZE = int(os.getenv("SPLITTER_JSON_MAX_CHUNK_SIZE", 300))

RETRIEVER_SCORE_THRESHOLD = float(os.getenv("RETRIEVER_SCORE_THRESHOLD", 0.5))
RETRIEVER_K = int(os.getenv("RETRIEVER_K", 5))