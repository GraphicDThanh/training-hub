from enum import Enum


class CartStatus(Enum):
    ACTIVE = 0
    INACTIVE = 1
    CHECKED_OUT = 2

    def label(self):
        return {
            CartStatus.ACTIVE: "active",
            CartStatus.INACTIVE: "inactive",
            CartStatus.CHECKED_OUT: "checked out",
        }[self]

