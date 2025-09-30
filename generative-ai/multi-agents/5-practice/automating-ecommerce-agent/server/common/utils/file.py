import json
import os
import logging
from langchain import hub


def load_json(file_path: str):
    if not file_path or file_path.lower().endswith(".json") is False:
        print(f"Invalid file path: {file_path}")
        return

    with open(os.path.abspath(file_path), "rb") as file:
        try:
            return json.loads(file.read())
        except json.JSONDecodeError:
            print(f"Error decoding JSON file: {file_path}")
            return


def get_path(file_name: str, folder: str = "."):
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


def read_prompt(prompt_file_name, hub_name: str = None):
    if hub_name:
        hub_prompt_template = hub.pull(hub_name)
        prompt = hub_prompt_template.messages[0].prompt.template
    else:
        try:
            prompt_file_path = get_path(prompt_file_name)
            with open(prompt_file_path, "r") as f:
                prompt = f.read()
        except FileNotFoundError as e:
            logging.error(f"System message file at {prompt_file_path} not found!")
            raise e

    return prompt
