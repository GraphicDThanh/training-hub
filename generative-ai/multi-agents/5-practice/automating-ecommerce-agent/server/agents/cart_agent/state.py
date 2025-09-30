from typing import Optional

from common.entities import Cart, Product
from common.types import CartCheckoutUserData
from langgraph.prebuilt.chat_agent_executor import AgentState


class CartAgentState(AgentState):
    # From supervisor state:
    # - allow decide to "FINISH" the conversation from inside
    next: Optional[str] = None
    # - need to define if the intent is `cart` or `product` to call tools correctly
    query_intent: str
    # - user active cart
    active_cart: Cart

    # - retrieve product for add to cart, remove from cart.
    product_retrieved_intermediate_step: Optional[Product] = None
    # - retrieve user info for checkout cart
    cart_checkout_user_data: Optional[CartCheckoutUserData] = None
