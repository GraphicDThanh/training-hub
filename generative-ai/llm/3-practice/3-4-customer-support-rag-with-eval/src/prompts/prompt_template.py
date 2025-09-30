import logging

from langchain_core.prompts import ChatPromptTemplate

from src.utils.utils import get_path


def main():
    try:
        system_message_file_path = get_path(
            "system_message.md",
            "src/prompts"
        )

        with open(system_message_file_path, "r") as f:
            system_message = f.read()

            prompt_template = ChatPromptTemplate.from_messages([
                ("system", system_message),
                ("user", "{input}")
            ])

            return prompt_template

    except FileNotFoundError as e:
        logging.error(f"System message file at {system_message_file_path} not found!")
        raise e
