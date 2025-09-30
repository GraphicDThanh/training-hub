from langgraph.prebuilt.chat_agent_executor import AgentState
from typing import Optional


class ServiceAgentState(AgentState):
    # From supervisor state:
    query_intent: Optional[str] = None
