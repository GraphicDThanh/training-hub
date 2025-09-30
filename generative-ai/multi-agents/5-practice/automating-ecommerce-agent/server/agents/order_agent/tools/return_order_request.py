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
def return_order_request(
    order_id: str,
    reason: str,
    user: Annotated[User, InjectedState("user")],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """
    Use this tool to return an order for a user.

    Args:
        order_id (str): The ID of the order to return. If user don't provided, use value is 'no order id provided'
        reason (str): The reason why user return the order. If user don't provided, use value is 'no reason provided'
    """
    if "no order id" in order_id.lower() or "no reason" in reason.lower():
        # Request supervisor go next to FINISH with return format message.
        return Command(
            update=create_state_update(
                "Please provide an order ID to return. Provide your answer with exactly format: "
                "I want to return order with ID {order_id} because {reason}"
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

    response = order_service.return_order(user, order_id, reason)
    if response.success is False:
        return Command(
            update=create_state_update(
                f"Return order fail with message: {response.message}",
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            )
        )

    order_return_request = response.data["order_return_request"]
    return Command(
        update=create_state_update(
            f"{response.message}. \n\nOrder return request data: {str(order_return_request.to_dict_human())}",
            tool_call_id,
            state_additional_data={"next": "FINISH"},
        )
    )
