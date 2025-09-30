
from enum import Enum


class TicketStatus(Enum):
    OPEN = 0
    IN_PROGRESS = 1
    RESOLVED = 2

    def label(self):
        return {
            TicketStatus.OPEN: "Open",
            TicketStatus.IN_PROGRESS: "In Progress",
            TicketStatus.RESOLVED: "Resolved",
        }[self]
