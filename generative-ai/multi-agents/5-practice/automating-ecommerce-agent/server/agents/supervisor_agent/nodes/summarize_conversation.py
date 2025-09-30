from ..state import SupervisorState as State


def summarize_conversation(state: State):
    """
    Summarize long conversation
    (Mocking)
    """
    return state

    # if len(state["messages"]) <= 6:
    #     return state

    # summary = state.get("summary", "")

    # if summary:
    #     summary_message = (
    #         f"This is summary of the conversation to date: {summary}\n\n"
    #         "Extend the summary by taking into account the new messages above:"
    #     )
    # else:
    #     summary_message = "Create a summary of the conversation above:"


    # # Add prompt to our history
    # messages = state["messages"] + [HumanMessage(content=summary_message)]
    # response = model_gpt_4o_mini.invoke(messages)

    # # Delete all but the 5 most recent messages
    # delete_messages = [
    #     RemoveMessage(id=m.id) for m in state["messages"][:-5]
    # ]

    # return {
    #     "summary": response.content,
    #     "messages": delete_messages,
    # }

