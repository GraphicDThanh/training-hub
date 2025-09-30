# --- Messages Placeholder ---
# This prompt template is responsible for adding a list of messages in a particular place
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage


if __name__ == "__main__":
    prompt_template = ChatPromptTemplate([
        ("system", "You are a helpful assistant."),
        MessagesPlaceholder("msgs"),
    ])
    output = prompt_template.invoke({
        "msgs": [
            HumanMessage(content="hi!"),
            HumanMessage(content="meo!"),
        ]
    })
    print(output)
    # Output
    # messages=[
    #     SystemMessage(
    #         content='You are a helpful assistant.',
    #         additional_kwargs={}, response_metadata={}
    #     ),
    #     HumanMessage(
    #         content='hi!',
    #         additional_kwargs={}, response_metadata={}
    #     ),
    #     HumanMessage(
    #         content='meo!',
    #         additional_kwargs={}, response_metadata={}
    #     )
    # ]

    # -- Option not use MessagesPlaceholder ---
    prompt_template = ChatPromptTemplate([
        ("system", "You are a helpful assistant."),
        ("placeholder", "{msgs}"),
    ])

    output = prompt_template.invoke({
        "msgs": [
            HumanMessage(content="hi!"),
            HumanMessage(content="meo!"),
        ]
    })
    # Same output as above
