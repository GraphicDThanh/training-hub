from typing import Optional

from common.entities import Entity
from common.enums import TicketStatus


class SupportTicket(Entity):
    email: str
    subject: str
    phone: str
    description: str
    name: str = ""
    user_id: Optional[str]
    status: TicketStatus = TicketStatus.OPEN.value

    @staticmethod
    def from_dict(data: dict):
        return SupportTicket(
            id=data["id"],
            email=data["email"],
            subject=data["subject"],
            phone=data["phone"],
            description=data["description"],
            name=data.get("name", ""),
            status=TicketStatus(int(data["status"])),
            user_id=data.get("user_id"),
        )

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "subject": self.subject,
            "phone": self.phone,
            "description": self.description,
            "name": self.name,
            "status": self.status.value,
            "user_id": self.user_id,
        }