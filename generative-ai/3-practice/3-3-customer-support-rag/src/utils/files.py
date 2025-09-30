import os, json


def read_json(file_path: str):
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