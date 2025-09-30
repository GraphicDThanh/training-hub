from common.entities import Cart
from common.utils import create_state_update
from langchain_core.tools import tool
from langchain_core.tools.base import InjectedToolCallId
from langgraph.prebuilt import InjectedState
from langgraph.types import Command
from services import cart_service
from typing_extensions import Annotated


@tool
def checkout_cart(
    active_cart: Annotated[Cart, InjectedState("active_cart")],
    cart_checkout_user_data: Annotated[dict, InjectedState("cart_checkout_user_data")],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """
    Use this tool to checkout (or order) the cart.
    """

    # -- Validation - start --
    if cart_service.is_empty_cart(active_cart):
        return Command(
            update=create_state_update(
                "Cart is empty. Please add items to the cart before checking out.",
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            )
        )

    shipping_address = cart_checkout_user_data["shipping_address"]
    payment_method = cart_checkout_user_data["payment_method"]
    selected_shipping_option = cart_checkout_user_data["selected_shipping_option"]

    if not shipping_address:
        return Command(
            update=create_state_update(
                "Shipping address should be selected before checkout.",
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            )
        )

    if not payment_method:
        return Command(
            update=create_state_update(
                "Payment method should be selected before checkout.",
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            )
        )

    if not selected_shipping_option:
        return Command(
            update=create_state_update(
                "Shipping option should be selected before checkout.",
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            )
        )
    # -- Validation - end --

    # Action: Checkout cart
    response_checkout = cart_service.checkout(
        active_cart, shipping_address, payment_method, selected_shipping_option
    )
    if response_checkout.success is False:
        return Command(
            update=create_state_update(
                response_checkout.message,
                tool_call_id,
            )
        )

    order = response_checkout.data["order"]
    cart = response_checkout.data["cart"]
    return Command(
        update=create_state_update(
            f"{response_checkout.message}\n\n Order ID: {order.id}.",
            tool_call_id,
            state_additional_data={
                "active_cart": cart,
            },
        )
    )
