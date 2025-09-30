from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_text_splitters import RecursiveJsonSplitter
splitter = RecursiveJsonSplitter(max_chunk_size=300)

from utils.config import (
    SPLITTER_TEXT_CHUNK_SIZE,
    SPLITTER_TEXT_CHUNK_OVERLAP,
    SPLITTER_JSON_MAX_CHUNK_SIZE
)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=SPLITTER_TEXT_CHUNK_SIZE,
    chunk_overlap=SPLITTER_TEXT_CHUNK_OVERLAP
)

json_splitter = RecursiveJsonSplitter(max_chunk_size=SPLITTER_JSON_MAX_CHUNK_SIZE)

