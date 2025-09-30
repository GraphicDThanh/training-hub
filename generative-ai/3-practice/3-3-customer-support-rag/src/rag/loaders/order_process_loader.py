from rag.text_splitters.base_splitter import json_splitter
from utils.files import read_json

def load():

    return json_splitter.create_documents(
        texts=[
            read_json("data/documents/order-process.json")
        ]
    )

# OLD CODE
# At first, I load json and split with text splitter, but it's not working to search the product name
# So, I change to use json splitter to split the json file, result better.

# from langchain_community.document_loaders import JSONLoader
# jq_schema = "[. | {order_steps: .steps, payment_methods: .payment_methods}]"

# order_process_loader = JSONLoader(
#     file_path="data/documents/order-process.json",
#     jq_schema=jq_schema,
#     text_content=False,
# )