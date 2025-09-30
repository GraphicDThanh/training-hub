from common.entities import Cart
from common.errors.cart import CartErrorMessage
from common.utils import create_state_update
from langchain_core.tools import tool
from langchain_core.tools.base import InjectedToolCallId
from langgraph.graph import END
from langgraph.prebuilt import InjectedState
from langgraph.types import Command
from services import cart_service
from typing_extensions import Annotated


@tool
def get_cart(
    active_cart: Annotated[Cart, InjectedState("active_cart")],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """
    Use this tool to get the cart detail only.
    Do not use this tool to checkout the cart.
    """

    if cart_service.is_active_cart(active_cart):
        return Command(
            update=create_state_update(
                CartErrorMessage.INACTIVE_CART,
                tool_call_id,
                # FIX ME: need check again why I need to force end the state here
                state_additional_data={"next": "FINISH"},
            )
        )

    response = cart_service.get_cart(active_cart.id)
    if response.success is False:
        return Command(
            update=create_state_update(
                response.message,
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            )
        )

    cart = response.data["cart"]

    return Command(
        update=create_state_update(
            f"{response.message} \n Cart: {cart.to_dict()}",
            tool_call_id,
            state_additional_data={"active_cart": cart, "next": END},
        )
    )
