from typing import Optional

from common.entities import Product
from langgraph.prebuilt.chat_agent_executor import AgentState


class ProductAgentState(AgentState):
    # From supervisor state:
    # - allow decide to "FINISH" the conversation from inside
    next: Optional[str] = None
    # - need to define if the intent is cart or product
    query_intent: Optional[str] = None
    # - retrieve product for add to cart, remove from cart.
    product_retrieved_intermediate_step: Optional[Product] = None

    # Product personal state:
