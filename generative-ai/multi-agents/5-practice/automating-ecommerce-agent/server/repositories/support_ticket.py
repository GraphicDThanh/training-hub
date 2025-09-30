from common.config import settings
from common.constants import DatabaseTable
from common.entities import SupportTicket

from .base import Repository


class SupportTicketRepository(Repository[SupportTicket]):
    def __init__(self):
        super().__init__(supabase_key=settings.supabase.SERVICE_ROLE_KEY)
        self.SUPPORT_TICKETS = DatabaseTable.SUPPORT_TICKETS.value

    def get(self, id: str) -> SupportTicket:
        response = (
            self.client.table(self.SUPPORT_TICKETS)
            .select("*")
            .eq("id", id)
            .single()
            .execute()
        )
        data = response.data
        return SupportTicket.from_dict(data) if data else None

    def get_all(self) -> list[SupportTicket]:
        raise NotImplementedError(
            "Get all operation is not implemented for support tickets."
        )

    def add(self, item: SupportTicket) -> None:
        if item.email and item.subject:
            self.client.table(self.SUPPORT_TICKETS).insert(item.to_dict()).execute()
        else:
            raise ValueError(
                "Must provide email and subject to create a support ticket."
            )

    def update(self, item: SupportTicket) -> None:
        raise NotImplementedError(
            "Update operation is not implemented for support tickets."
        )

    def delete(self, id: int) -> None:
        self.client.table(self.SUPPORT_TICKETS).delete().eq("id", id).execute()
