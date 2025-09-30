import json
import os


def load_json(file_path: str):
    if (
        not file_path
        or file_path.lower().endswith(".json") is False
    ):
        print(f"Invalid file path: {file_path}")
        return

    with open(os.path.abspath(file_path), 'rb') as file:
        try:
            return json.loads(file.read())
        except json.JSONDecodeError:
            print(f"Error decoding JSON file: {file_path}")
            return

def get_path(file_name: str, folder: str = "data"):
    return os.path.abspath(f"{folder}/{file_name}")

def is_chroma_db_exist(persist_directory: str) -> bool:
    # Check if the directory exists
    if not os.path.exists(persist_directory):
        return False

    # Check for specific metadata files used by Chroma
    required_files = ["chroma.sqlite3"]
    for file in required_files:
        if not os.path.exists(os.path.join(persist_directory, file)):
            return False

    return True