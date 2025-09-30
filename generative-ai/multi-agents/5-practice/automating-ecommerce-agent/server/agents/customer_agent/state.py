from typing import Optional
from langgraph.prebuilt.chat_agent_executor import AgentState
from common.types import CartCheckoutUserData
from common.entities import User


class CustomerAgentState(AgentState):
    """A state class for managing customer agent's information and conversation flow.

    This class extends AgentState and maintains the state of a customer agent including
    conversation flow control and user information.

    Attributes:
        next (Optional[str]): Controls the next action in conversation flow.
            When set, allows the agent to decide when to end the conversation.
        user (Optional[User]): Reference to the user associated with this agent state.
        query_intent (Optional[str]): Stores the interpreted intent of the user's query.
    """

    # allow decide to "FINISH" the conversation from inside
    next: Optional[str] = None

    # from supervisor state
    user_id: Optional[str] = None
    query_intent: Optional[str] = None

    # - retrieve user data for checkout cart
    cart_checkout_user_data: Optional[CartCheckoutUserData] = None

    # Customer Agent Personal State
    user: Optional[User] = None