from typing import Annotated

from common.entities import PaymentMethod, ShippingAddress, User
from common.types import CartCheckoutUserData
from common.types.response import ServiceResponse
from common.utils import create_state_update
from langchain_core.tools import tool
from langchain_core.tools.base import InjectedToolCallId
from langgraph.prebuilt import InjectedState
from langgraph.types import Command
from services import shipping_service, user_service


@tool
def retrieve_cart_checkout_user_data(
    user: Annotated[User, InjectedState("user")],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """
    Use this tool to retrieve user data for cart checkout.
    This includes the user's shipping address, payment method, and available shipping options.
    Avoid using this tool for direct `customer` intent query.
    """
    user_id = user.id

    # Get or create shipping address
    response: ServiceResponse = user_service.get_shipping_address(user_id)
    shipping_address = (
        response.data["shipping_address"]
        if response.success and response.data.get("shipping_address")
        else None
    )
    if not shipping_address:
        response = user_service.create_shipping_address(
            ShippingAddress(
                user_id=user_id,
                address_line_1="123 Main St",
                address_line_2="Apt 4B",
                city="Eval Town",
                state="CA",
                zip_code="12345",
                postal_code="12345",
                country="USA",
                is_default=True,
            )
        )
        shipping_address = (
            response.data["shipping_address"]
            if response.success and response.data.get("shipping_address")
            else None
        )

    # Get or create payment method
    response = user_service.get_payment_method(user_id)
    payment_method = (
        response.data["payment_method"]
        if response.success and response.data.get("payment_method")
        else None
    )
    if not payment_method:
        response = user_service.create_payment_method(
            PaymentMethod(
                user_id=user_id,
                payment_option_id="1a7d9e4e-1c57-488e-9b1e-d93c5b5a50fa",
                is_default=True,
            )
        )
        payment_method = (
            response.data["payment_method"]
            if response.success and response.data.get("payment_method")
            else None
        )

    # Get shipping options
    response = shipping_service.get_shipping_options()
    shipping_options = (
        response.data["shipping_options"]
        if response.success and response.data.get("shipping_options")
        else []
    )
    selected_shipping_option = shipping_options[0] if shipping_options else None

    cart_checkout_user_data: CartCheckoutUserData = {
        "shipping_address": shipping_address,
        "payment_method": payment_method,
        "selected_shipping_option": selected_shipping_option,
    }

    return Command(
        update=create_state_update(
            "Retrieve user data for cart checkout intermediate step successfully. Delegate back to supervisor to continue.",
            tool_call_id,
            state_additional_data={"cart_checkout_user_data": cart_checkout_user_data},
        )
    )
