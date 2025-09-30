# --- Chat Prompt Template ---
# These prompt templates are used to format a list of messages.
# These "templates" consist of a list of templates themselves.
from langchain_core.prompts import ChatPromptTemplate

if __name__ == "__main__":
    prompt_template = ChatPromptTemplate([
        ("system", "You are a helpful assistant."),
        ("user", "Tell me a joke about {topic}")
    ])
    output = prompt_template.invoke({"topic": "cats"})
    print(output)
    # Output
    # messages=[
    #     SystemMessage(
    #         content='You are a helpful assistant.',
    #         additional_kwargs={}, response_metadata={}
    #     ),
    #     HumanMessage(
    #         content='Tell me a joke about cats',
    #         additional_kwargs={}, response_metadata={}
    #     )
    # ]