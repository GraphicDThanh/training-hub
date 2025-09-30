import os
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

# Constants
CHROMA_PATH: str = os.getenv("CHROMA_PATH", "db")
OPENAI_AI_EMBEDDING_MODEL: str = os.getenv("OPENAI_AI_EMBEDDING_MODEL", "text-embedding-3-small")

# Vector database
embeddings: OpenAIEmbeddings = OpenAIEmbeddings(
    model=OPENAI_AI_EMBEDDING_MODEL,
)
db_chroma: Chroma = Chroma(
    collection_name="rag_collections",
    persist_directory=CHROMA_PATH,
    embedding_function=embeddings,
)

def retrieve_documents(user_query: str) -> str:
    retriever = db_chroma.as_retriever(
        search_type="similarity_score_threshold",
        search_kwargs={
            "k": 5,
            "score_threshold": 0.2,
        },
    )
    documents = retriever.invoke(user_query)
    print(f"Found {len(documents)} documents.")
    context = ""
    for document in documents:
        context += f"{document.page_content}\n"
    return context if context else "No documents found."


def get_var(var_name, prompt, other_vars):
    try:
        user_query = other_vars["user_query"]
        context = retrieve_documents(user_query)
        return {"output": context}
    except Exception as e:
        # In case of error:
        return {
            "error": f"Error message: {str(e)}",
        }