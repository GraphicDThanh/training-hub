from typing import Annotated

from common.utils import create_state_update
from common.entities import User
from langchain_core.tools import tool
from langchain_core.tools.base import InjectedToolCallId
from langgraph.prebuilt import InjectedState
from langgraph.types import Command


@tool
def get_profile(
    user: Annotated[User, InjectedState("user")],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> str:
    """
    Use this tool to get user profile information.
    """

    return Command(
        update=create_state_update(
            f"Current user profile: \n {str(user.to_dict())}.",
            tool_call_id,
            state_additional_data={"next": "FINISH"},
        )
    )
