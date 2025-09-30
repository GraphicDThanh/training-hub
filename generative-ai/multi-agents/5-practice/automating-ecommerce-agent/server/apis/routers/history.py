from agents.ecommerce_agent.agent import create_ecommerce_agent
from fastapi import APIRouter
from langchain_core.messages import AnyMessage

router = APIRouter(prefix="/history", tags=[""])


@router.get("/")
def history(thread_id: str) -> list[AnyMessage]:
    """Get chat history"""
    graph = create_ecommerce_agent()
    state_snapshot = graph.get_state(
        config={
            "configurable": {
                "thread_id": thread_id,
            }
        }
    )
    messages = state_snapshot.values.get("messages", [])

    # Filter out messages from the intent classifier agent
    filter_messages = [
        message
        for message in messages
        if not (message.type == "ai" and message.name == "intent_classifier_agent")
    ]

    return filter_messages
