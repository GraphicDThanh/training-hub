from common.entities import SupportTicket
from langchain_core.tools import tool
from langchain_core.tools.base import InjectedToolCallId
from langgraph.prebuilt import InjectedState
from langgraph.types import Command
from services import user_service
from typing_extensions import Annotated
from common.enums import TicketStatus
from common.utils import create_state_update
from common.types.request import CreateSupportTicketRequest


@tool
def create_support_ticket(
    data_request: CreateSupportTicketRequest,
    state: Annotated[dict, InjectedState],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> str:
    """
    Use this tool to help use create a customer support ticket
    """
    new_ticket = SupportTicket(
        name=data_request.name,
        email=data_request.email,
        subject=data_request.subject,
        phone=data_request.phone,
        description=data_request.description,
        status=TicketStatus.OPEN,
        user_id=state.user.id if state.get("user") else None,
    )
    response = user_service.create_support_ticket(new_ticket)
    return Command(update=create_state_update(response.message, tool_call_id))
