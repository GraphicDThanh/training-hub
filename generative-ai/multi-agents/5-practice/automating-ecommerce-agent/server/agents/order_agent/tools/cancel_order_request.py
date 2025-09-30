import uuid

from common.entities import User
from common.utils import create_state_update
from langchain_core.tools import tool
from langchain_core.tools.base import InjectedToolCallId
from langgraph.prebuilt import InjectedState
from langgraph.types import Command
from services import order_service
from typing_extensions import Annotated


@tool
def cancel_order_request(
    order_id: str,
    reason: str,
    user: Annotated[User, InjectedState("user")],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """
    Use this tool to cancel an order for a user.

    Args:
        order_id (str): The ID of the order to return. If user don't provided, use value is 'no order id provided'
        reason (str): The reason why user return the order. If user don't provided, use value is 'no reason provided'
    """
    if "no order id" in order_id.lower() or "no reason" in reason.lower():
        # Request supervisor go next to FINISH with return format message.
        return Command(
            update=create_state_update(
                "Please provide an order ID to cancel. Provide your answer with exactly format: "
                "I want to cancel order with ID {order_id} because {reason}"
                " to continue return process. **Tips**: You can find order ID in your order list.",
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            )
        )

    # Validate order_id format is valid uuid
    try:
        uuid.UUID(order_id)
    except (ValueError, AttributeError, TypeError):
        return Command(
            update=create_state_update(
                "Invalid order ID format. Please provide a valid order ID. **Tips**: You can find order ID in your order list.",
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            )
        )

    response = order_service.get_order_by_user(user, order_id)
    if response.success is False:
        return Command(
            update=create_state_update(
                f"Cannot get the order request return: {response.message}",
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            )
        )

    order = response.data["order"]
    if order.order_returns:
        return Command(
            update=create_state_update(
                "Order already has a return request. Please check your order detail.",
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            )
        )

    response = order_service.cancel(order, reason)
    if response.success is False:
        return Command(
            update=create_state_update(
                f"Return order fail with message: {response.message}",
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            ),
        )

    order = response.data["order"]
    return Command(
        update=create_state_update(
            f"{response.message}. Order return request data: {order.to_dict_human()}",
            tool_call_id,
            state_additional_data={"next": "FINISH"},
        )
    )
