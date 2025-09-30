from common.entities import Cart, Product
from common.errors.cart import CartErrorMessage
from common.utils import create_state_update
from langchain_core.tools import tool
from langchain_core.tools.base import InjectedToolCallId
from langgraph.prebuilt import InjectedState
from langgraph.types import Command
from services import cart_service
from typing_extensions import Annotated


@tool
def remove_from_cart(
    product_retrieved_intermediate_step: Annotated[
        Product, InjectedState("product_retrieved_intermediate_step")
    ],
    active_cart: Annotated[Cart, InjectedState("active_cart")],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> str:
    """
    Use this tool to remove an item from the cart.
    """
    # -- Validation - start --
    # Check if cart is active
    if cart_service.is_active_cart(active_cart):
        return Command(
            update=create_state_update(
                CartErrorMessage.INACTIVE_CART,
                tool_call_id,
            )
        )

    # Check if cart is empty
    if cart_service.is_empty_cart(active_cart):
        return Command(
            update=create_state_update(
                CartErrorMessage.EMPTY_CART,
                tool_call_id,
            )
        )

    if not product_retrieved_intermediate_step:
        return Command(
            update=create_state_update(
                "Product not found.",
                tool_call_id,
            )
        )
    # -- Validation - end --

    # Remove product out of cart
    response = cart_service.remove_from_cart(
        active_cart.id, product_retrieved_intermediate_step.id
    )

    if response.success is False:
        return Command(
            update=create_state_update(
                response.message,
                tool_call_id,
            )
        )

    # Update the cart in the state
    response = cart_service.get_cart(active_cart.id)
    if response.success is False:
        return Command(
            update=create_state_update(
                "Get cart after add item to cart error.",
                tool_call_id,
            )
        )

    return Command(
        update=create_state_update(
            "Product removed from cart successfully.",
            tool_call_id,
            state_additional_data={
                "active_cart": response.data["cart"],
                "product_retrieved_intermediate_step": None,
            },
        )
    )
