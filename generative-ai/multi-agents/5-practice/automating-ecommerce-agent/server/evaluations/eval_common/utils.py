import uuid
from langchain_core.messages import AIMessage
from services import cart_service, shipping_service, user_service
from common.config import settings
from common.entities import Cart, PaymentMethod, ShippingAddress, ShippingOption
from typing import Optional
from common.types.response import ServiceResponse


def extract_tool_calls_from_snapshot(snapshot):
    """
    Extracts tool calls from a snapshot.
    """
    tool_calls = []
    for msg in snapshot.values["messages"]:
        if isinstance(msg, AIMessage) and msg.tool_calls:
            for tool_call in msg.tool_calls:
                tool_calls.append(
                    {
                        "name": tool_call["name"],
                        "args": tool_call["args"],
                    }
                )

    return tool_calls


def get_or_create_cart(user_id: str) -> Cart:
    cart_response = cart_service.get_or_create_cart(user_id)
    if not cart_response.success:
        raise Exception("Failed to get or create cart.")

    return cart_response.data["cart"]

def get_shipping_address(user_id) -> Optional[ShippingAddress]:
    response: ServiceResponse = user_service.get_shipping_address(user_id)

    if not response.success or not response.data["shipping_address"]:
        raise Exception("Failed to get shipping address.")

    return response.data["shipping_address"]

def get_payment_method(user_id) -> Optional[PaymentMethod]:
    response: ServiceResponse = user_service.get_payment_method(user_id)
    if not response.success:
        raise Exception("Failed to get payment method.")

    return response.data["payment_method"]

def get_shipping_options() -> Optional[ShippingOption]:
    response: ServiceResponse = shipping_service.get_shipping_options()

    if not response.success:
        raise Exception("Failed to get shipping options.")

    return response.data["shipping_options"]

def random_eval_user() -> dict:
    """
    Generate a random user for evaluation.
    """
    return {
        "email": f"eval_{str(uuid.uuid4())}@ecommerce.com",
        "password": settings.eval.USER_PASSWORD,
    }