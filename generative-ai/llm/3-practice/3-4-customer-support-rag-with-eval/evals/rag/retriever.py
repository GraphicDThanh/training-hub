import os
import sys

# # CONFIG PATH WHEN RUN SCRIPT (via Python runner in Promptfoo) TO ALLOW IMPORT MODULE FROM ROOT DIR
# # ----------------------------------------------------------------
root_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
if root_path not in sys.path:
    sys.path.append(root_path)
# # ----------------------------------------------------------------
from src.rag.retriever import get_retriever  # noqa: E402

def call_api(query, options, context):
    context_vars = context["vars"]
    persist_directory = context_vars["vectorstore_persist_directory"]
    collection_name = context_vars["vectorstore_collection_name"]
    query = context_vars["query"]

    retriever = get_retriever(
        persist_directory="../" + persist_directory,
        collection_name=collection_name
    )

    documents = retriever.invoke(query)

    # from remote_pdb import RemotePdb
    # RemotePdb('127.0.0.1', 4445).set_trace()
    # For debugging
    output = ""
    for doc in documents:
        try:
            source = doc.metadata["source"]
        except KeyError:
            import logging
            logging.warning(f"Document page content: {doc.page_content}")
            logging.warning(f"Document metadata: {doc.metadata}")
            source = "Unknown source"

        output += f'{source}: {doc.page_content}\n'

    # output = "\n".join(f'{doc.metadata["source"]}: {doc.page_content}' for doc in documents)

    result = {
        "output": output,
    }

    return result

