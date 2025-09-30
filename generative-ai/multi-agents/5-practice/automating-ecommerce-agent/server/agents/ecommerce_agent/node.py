from common.entities import User
from common.types.response import ServiceResponse
from services import cart_service


def create_user_node(user: User = None):
    def get_user_node(state) -> dict:
        """Node for workflow: sets user and active_cart in the state."""
        if not user:
            return {
                "active_cart": None,
                "user": None,
            }

        # Get active cart
        response: ServiceResponse = cart_service.get_or_create_cart(user.id)
        active_cart = (
            response.data["cart"]
            if response.success and response.data["cart"]
            else None
        )

        return {
            "active_cart": active_cart,
            "user_id": user.id,
        }

    return get_user_node
