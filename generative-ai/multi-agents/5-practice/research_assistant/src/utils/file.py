def write_to_markdown(filename, content):
    """Writes content to a Markdown file."""
    with open(filename, "w", encoding="utf-8") as file:
        file.write(content)
