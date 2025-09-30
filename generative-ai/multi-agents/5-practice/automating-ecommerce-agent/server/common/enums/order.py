from enum import Enum


class OrderStatus(Enum):
    PENDING_CONFIRM = 0
    WAITING_FOR_PICKUP = 1
    ON_DELIVERY = 2
    DELIVERED = 3
    CANCELLED = 4
    RETURN_REQUESTED = 5

    def label(self):
        return {
            OrderStatus.PENDING_CONFIRM: "Pending Confirmation",
            OrderStatus.WAITING_FOR_PICKUP: "Waiting for Pickup",
            OrderStatus.ON_DELIVERY: "On Delivery",
            OrderStatus.DELIVERED: "Delivered",
            OrderStatus.CANCELLED: "Cancelled",
            OrderStatus.RETURN_REQUESTED: "Return",
        }[self]


class OrderReturnStatus(Enum):
    REQUESTED = 0
    IN_PROGRESS = 1
    COMPLETED = 2
    CANCELED = 3

    def label(self):
        return {
            OrderReturnStatus.REQUESTED: "Requested",
            OrderReturnStatus.IN_PROGRESS: "In Progress",
            OrderReturnStatus.COMPLETED: "Completed",
            OrderReturnStatus.CANCELED: "Canceled",
        }[self]


