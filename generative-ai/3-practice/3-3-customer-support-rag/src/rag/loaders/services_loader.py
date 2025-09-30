from langchain.document_loaders import DirectoryLoader, CSVLoader, TextLoader
from rag.text_splitters.base_splitter import text_splitter

def loader_factory(file_path: str):
    if file_path.endswith(".csv"):
        return CSVLoader(file_path=file_path)

    if file_path.endswith(".txt"):
        return TextLoader(file_path=file_path)

    raise ValueError(f"No loader available for file: {file_path}")

def load():
    services_loader = DirectoryLoader(
        path="data/documents",
        glob="*.*",
        exclude=["products.json", "order-process.json"],
        loader_cls=loader_factory
    )
    return text_splitter.split_documents(
        services_loader.load()
    )