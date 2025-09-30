from rag.text_splitters.base_splitter import json_splitter
from utils.files import read_json

def load():
    return json_splitter.create_documents(
        texts=read_json("data/documents/products.json")
    )

# OLD CODE
# from langchain_community.document_loaders import JSONLoader

# jq_schema = "[.[] | {title: .title, price: .price, category: .category, description: .description}]"

# products_loader = JSONLoader(
#     file_path="data/documents/products.json",
#     jq_schema=jq_schema,
#     text_content=False,
# )