from langgraph.prebuilt.chat_agent_executor import AgentState
from typing import Optional
from common.entities import User


class OrderAgentState(AgentState):
    # From supervisor state:
    # - allow decide to "FINISH" the conversation from inside
    next: Optional[str] = None
    # - need to define if the intent is `order`
    query_intent: Optional[str] = None
    # - used to get user's orders
    user_id: Optional[str] = None

    # Order Agent Personal State
    user: Optional[User] = None