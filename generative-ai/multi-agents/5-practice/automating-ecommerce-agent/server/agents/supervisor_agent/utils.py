from common.entities import Cart, User
from common.types.response import ServiceResponse
from services import cart_service

from .state import SupervisorState as State


def get_or_create_active_cart(state: State, user: User = None) -> dict:
    """Get user data from the database."""

    user_id = user.id if user else None
    if not user_id:
        raise Exception("User ID is required to get user data.")

    active_cart = None
    # ignore if cart is already in state
    if state.get("active_cart"):
        active_cart = state.get("active_cart")

    response: ServiceResponse = cart_service.get_or_create_cart(user_id)
    if response.success and response.data["cart"]:
        active_cart = response.data["cart"]

    return {"active_cart": active_cart}
