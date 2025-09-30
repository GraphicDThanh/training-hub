from typing import Optional

from common.entities import Cart, Product
from common.types import CartCheckoutUserData
from langgraph.prebuilt.chat_agent_executor import AgentState


class SupervisorState(AgentState):
    # This field used in supervisor to determine the next step in the workflow
    next: str = "FINISH"

    # This field used in customer_agent to get user's data
    user_id: Optional[str] = None

    # This field used in:
    # - cart_agent (to determine the active cart for the user)
    active_cart: Optional[Cart] = None

    # This fields use in:
    # - supervisor_agent (to determine the next delegation step)
    # - product_agent (to determine the query intent for call tools if intermediate step)
    # - cart_agent (to determine the query intent for call tools if intermediate step)
    query_intent: Optional[str] = None

    # These fields used in cart_agent
    # - retrieve product for add to cart, remove from cart.
    product_retrieved_intermediate_step: Optional[Product] = None
    # - retrieve user data for checkout cart
    cart_checkout_user_data: Optional[CartCheckoutUserData] = None

    # Customer Agent communication:
    # user_id: Optional[str] = None
    # query_intent: Optional[str] = None
