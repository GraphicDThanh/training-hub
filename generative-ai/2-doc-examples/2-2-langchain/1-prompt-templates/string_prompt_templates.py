# --- String Prompt Templates ---
# These prompt templates are used to format a single string,
# and generally are used for simpler inputs.
from langchain_core.prompts import PromptTemplate

if __name__ == "__main__":
    prompt_template = PromptTemplate.from_template("Tell me a joke about {topic}.")
    output = prompt_template.invoke({"topic": "cats"})
    print(output)
    # Output
    # text='Tell me a joke about cats.'