from common.entities import Cart
from common.errors.cart import CartErrorMessage
from common.types.response import ServiceResponse
from common.utils import create_state_update
from langchain_core.tools import tool
from langchain_core.tools.base import InjectedToolCallId
from langgraph.prebuilt import InjectedState
from langgraph.types import Command
from services import cart_service
from typing_extensions import Annotated


@tool
def clear_cart(
    active_cart: Annotated[Cart, InjectedState("active_cart")],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """
    Use this tool to clear the cart.
    """
    # -- Validation - start --
    if cart_service.is_empty_cart(active_cart):
        return Command(
            update=create_state_update(
                CartErrorMessage.EMPTY_CART,
                tool_call_id,
            )
        )

    if cart_service.is_active_cart(active_cart):
        return Command(
            update=create_state_update(
                CartErrorMessage.INACTIVE_CART,
                tool_call_id,
            )
        )

    # -- Validation - end --

    # Action: clear cart
    response_clear_cart: ServiceResponse = cart_service.clear_cart(active_cart)
    if response_clear_cart.success is False:
        return Command(
            update=create_state_update(
                response_clear_cart.message,
                tool_call_id,
            )
        )

    response_get_cart = cart_service.get_cart(active_cart.id)
    if response_get_cart.success is False:
        return Command(
            update=create_state_update(
                "Get cart after clear error.",
                tool_call_id,
            )
        )

    return Command(
        update=create_state_update(
            response_get_cart.message,
            tool_call_id,
            state_additional_data={
                "active_cart": response_get_cart.data["cart"],
            },
        )
    )
