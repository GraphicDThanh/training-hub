from common.entities import User
from common.utils import create_state_update
from langchain_core.tools import tool
from langchain_core.tools.base import InjectedToolCallId
from langgraph.prebuilt import InjectedState
from langgraph.types import Command
from services import order_service
from typing_extensions import Annotated


@tool
def get_orders(
    user: Annotated[User, InjectedState("user")],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """
    Use this tool to get the user's orders.
    """
    response = order_service.get_orders_by_user(user)

    if response.success is False:
        return Command(
            update=create_state_update(
                response.message,
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            )
        )

    orders_data = []
    for order in response.data["orders"]:
        orders_data.append(order.to_dict_human())

    return Command(
        update=create_state_update(
            f"{response.message} \n Total order: {len(response.data['orders'])} \nOrders data: {str(orders_data)}\n",
            tool_call_id,
            state_additional_data={"next": "FINISH"},
        )
    )
