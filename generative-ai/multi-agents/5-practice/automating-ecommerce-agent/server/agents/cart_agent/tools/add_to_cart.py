from common.entities import Cart, Product
from common.errors.cart import CartErrorMessage
from common.types.request import AddToCartRequest
from common.utils import create_state_update
from langchain_core.tools import tool
from langchain_core.tools.base import InjectedToolCallId
from langgraph.prebuilt import InjectedState
from langgraph.types import Command
from services import cart_service
from typing_extensions import Annotated


@tool
def add_to_cart(
    data_request: AddToCartRequest,
    product_retrieved_intermediate_step: Annotated[Product, InjectedState("product_retrieved_intermediate_step")],
    active_cart: Annotated[Cart, InjectedState("active_cart")],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """
    Use this tool to add an item to the cart.
    This tool is used along with the cart agent when the user adds an item to the cart.

    Args:
        quantity (int): The quantity of the product to add to the cart.
        product_retrieved_intermediate_step (Product): The product retrieved from the product agent.
        active_cart (Cart): The active cart.
        tool_call_id (str): The tool call ID.
    """
    # -- Validation - start --
    if cart_service.is_active_cart(active_cart):
        return Command(
            update=create_state_update(
                CartErrorMessage.INACTIVE_CART,
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

    # Check if product quantity is available
    quantity = data_request.quantity
    if quantity > product_retrieved_intermediate_step.quantity:
        return Command(
            update=create_state_update(
                f"Only {product_retrieved_intermediate_step.quantity} items available.",
                tool_call_id,
            )
        )
    # -- Validation - end --

    # Action - add to cart
    response = cart_service.add_to_cart(active_cart.id, product_retrieved_intermediate_step.id, quantity)
    if response.success is False:
        return Command(update=create_state_update(response.message, tool_call_id))

    # Action - get cart after update
    response = cart_service.get_cart(active_cart.id)
    if response.success is False:
        return Command(
            update=create_state_update(
                f"Get cart after add item to cart got error: {response.message}.",
                tool_call_id,
            )
        )

    cart = response.data["cart"]
    return Command(
        update=create_state_update(
            f"{response.message}\n\n Get cart {cart.id} detail to see the information.",
            tool_call_id,
            state_additional_data={
                "active_cart": cart,
                "product_retrieved_intermediate_step": None,
            },
        )
    )
