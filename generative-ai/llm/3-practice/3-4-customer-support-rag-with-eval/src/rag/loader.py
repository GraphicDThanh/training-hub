import os
from typing import AsyncIterator, Iterator

import yaml
from langchain.schema import Document
from langchain_community.document_loaders import CSVLoader, TextLoader


class BaseLoader:
    """Base loader for LangChain RAG, dynamically selects the appropriate loader by file extension."""

    @staticmethod
    def load_file(file_path: str):
        """
        Loads a file using the appropriate loader based on its extension.

        Args:
            file_path (str): Path to the file.

        Returns:
            list: A list of documents loaded by LangChain loaders.

        Raises:
            ValueError: If the file extension is unsupported.
        """
        # Ensure file exists
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")

        # Determine the file extension
        _, file_extension = os.path.splitext(file_path)
        file_extension = file_extension.lower()

        # Select appropriate loader based on file extension
        if file_extension == '.txt':
            return TextLoader(file_path).load()
        elif file_extension == '.csv':
            return CSVLoader(file_path).load()
        elif file_extension in ('.yaml', '.yml'):
            return YAMLLoader(file_path).lazy_load()
        else:
            raise ValueError(f"Unsupported file extension: {file_extension}")


class YAMLLoader(BaseLoader):
    """Custom YAML loader that reads and splits a YAML file into structured Documents."""

    def __init__(self, file_path: str) -> None:
        """
        Initialize the loader with the file path.

        Args:
            file_path (str): The path to the YAML file.
        """
        self.file_path = file_path

    def lazy_load(self) -> Iterator[Document]:
        """
        A lazy loader that reads a YAML file and yields documents.

        Yields:
            Document: A LangChain Document object for each YAML structure.
        """
        with open(self.file_path, "r", encoding="utf-8") as file:
            yaml_content = yaml.safe_load(file)

        if isinstance(yaml_content, dict):
            # Yield one Document per top-level key-value pair
            for key, value in yaml_content.items():
                content = yaml.dump({key: value}, default_flow_style=False)
                yield Document(
                    page_content=content,
                    metadata={"source": self.file_path, "key": key}
                )
        elif isinstance(yaml_content, list):
            # Yield one Document per list item
            for index, item in enumerate(yaml_content):
                content = yaml.dump(item, default_flow_style=False)
                yield Document(
                    page_content=content,
                    metadata={"source": self.file_path, "index": index}
                )
        else:
            # Handle scalar values as a single document
            content = yaml.dump(yaml_content, default_flow_style=False)
            yield Document(
                page_content=content,
                metadata={"source": self.file_path}
            )

    async def alazy_load(self) -> AsyncIterator[Document]:
        """
        An async lazy loader that reads a YAML file and yields documents.

        Yields:
            Document: A LangChain Document object for each YAML structure.
        """
        import aiofiles

        async with aiofiles.open(self.file_path, "r", encoding="utf-8") as file:
            yaml_content = yaml.safe_load(await file.read())

        if isinstance(yaml_content, dict):
            for key, value in yaml_content.items():
                content = yaml.dump({key: value}, default_flow_style=False)
                yield Document(
                    page_content=content,
                    metadata={"source": self.file_path, "key": key}
                )
        elif isinstance(yaml_content, list):
            for index, item in enumerate(yaml_content):
                content = yaml.dump(item, default_flow_style=False)
                yield Document(
                    page_content=content,
                    metadata={"source": self.file_path, "index": index}
                )
        else:
            content = yaml.dump(yaml_content, default_flow_style=False)
            yield Document(
                page_content=content,
                metadata={"source": self.file_path}
            )