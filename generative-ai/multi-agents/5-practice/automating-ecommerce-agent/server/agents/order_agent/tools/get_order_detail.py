from common.entities import User
from common.types.request import GetOrderRequest
from common.utils import create_state_update
from langchain_core.tools import tool
from langchain_core.tools.base import InjectedToolCallId
from langgraph.graph import END
from langgraph.prebuilt import InjectedState
from langgraph.types import Command
from services import order_service
from typing_extensions import Annotated


@tool
def get_order_detail(
    data_request: GetOrderRequest,
    user: Annotated[User, InjectedState("user")],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """
    Use this tool to get the order detail for a user.
    """
    response = order_service.get_order_by_user(user, data_request.order_id)

    if response.success is False:
        return Command(
            update=create_state_update(
                response.message,
                tool_call_id,
                state_additional_data={"next": "FINISH"},
            )
        )

    order = response.data["order"]
    return Command(
        update=create_state_update(
            f"{response.message} \n Order: {str(order.to_dict_human())}",
            tool_call_id,
            state_additional_data={"next": "FINISH"},
        )
    )
