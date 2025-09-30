from rag.loaders import loader
from rag.vector_stores import base_store

def create():
    docs = loader.main()
    vector_store = base_store.create(docs)
    return vector_store.as_retriever()