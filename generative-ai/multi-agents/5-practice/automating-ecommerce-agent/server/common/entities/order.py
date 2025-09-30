from datetime import datetime
from typing import Optional

from common.entities import Entity
from common.entities.shipping import ShippingCarrier, ShippingOption
from common.entities.user import PaymentMethod, ShippingAddress
from common.enums import OrderReturnStatus, OrderStatus, PaymentStatus


class OrderItem(Entity):
    product_id: str
    order_id: str

    # field name in db, save to avoid change in product name
    product_name: str

    # price at the time of purchase
    # to avoid price changes in the product
    price_at_purchase: float

    quantity: int

    # as it fixed when the order is created,
    # we can store it to improve performance
    subtotal: float

    @staticmethod
    def from_dict(data: dict):
        return OrderItem(**data)


class OrderReturn(Entity):
    order_id: str  # FK Order
    status: OrderReturnStatus = OrderReturnStatus.REQUESTED
    reason: str

    # [TODO] Auto approved by system for order status:
    # - PENDING_CONFIRM
    # - WAITING_FOR_PICKUP
    is_auto_approved: Optional[bool] = False

    # [TODO] Need approve by human for order status:
    # - DELIVERED
    is_human_approved: Optional[bool] = False

    # Has value if human reject the return request with reason
    reject_reason: Optional[str] = ""
    approved_at: Optional[datetime] = None
    refund_amount: Optional[float] = 0.0
    refund_transaction_id: Optional[str] = ""

    @staticmethod
    def from_dict(data: dict):
        return OrderReturn(
            id=data.get("id"),
            order_id=data.get("order_id"),
            status=OrderReturnStatus(int(data.get("status"))),
            reason=data.get("reason"),
            is_auto_approved=data.get("is_auto_approved"),
            is_human_approved=data.get("is_human_approved"),
            reject_reason=data.get("reject_reason"),
            approved_at=data.get("approved_at"),
            refund_amount=data.get("refund_amount"),
            refund_transaction_id=data.get("refund_transaction_id"),
            created_at=data.get("created_at"),
            updated_at=data.get("updated_at"),
        )

    def to_dict_human(self):
        data = self.to_dict()
        data["status"] = self.status.label()
        return data


class Order(Entity):
    user_id: str  # FK User
    shopping_session_id: str  # FK ShoppingSession
    shipping_address_id: str  # FK ShippingAddress
    payment_method_id: str  # FK PaymentMethod
    shipping_option_id: str  # FK ShippingOption
    shipping_carrier_id: str  # FK ShippingCarrier
    shipping_cost: Optional[float] = 0.0
    total_weight_kg: Optional[float] = 0.0
    total_cost: Optional[float] = 0.0
    status: OrderStatus = OrderStatus.PENDING_CONFIRM
    payment_status: PaymentStatus = PaymentStatus.PENDING
    transaction_id: Optional[str] = ""
    cancel_reason: str = ""

    # additional fields
    items: list[OrderItem] = None
    total_items: Optional[int] = 0
    shipping_address: Optional[ShippingAddress] = None
    shipping_option: Optional[ShippingOption] = None
    shipping_carrier: Optional[ShippingCarrier] = None
    payment_method: Optional[PaymentMethod] = None
    order_returns: list[OrderReturn] = None

    @staticmethod
    def from_dict(data: dict):
        # Define additional fields
        order_items = data.get("items", [])

        items_from_dict = []
        total_items = 0
        for item in order_items:
            if isinstance(item, dict):
                items_from_dict.append(OrderItem.from_dict(item))
                total_items += item.get("quantity", 0)

        return Order(
            id=data.get("id"),
            user_id=data.get("user_id"),
            shopping_session_id=data.get("shopping_session_id"),
            shipping_address_id=data.get("shipping_address_id"),
            payment_method_id=data.get("payment_method_id"),
            shipping_option_id=data.get("shipping_option_id"),
            shipping_carrier_id=data.get("shipping_carrier_id"),
            shipping_cost=data.get("shipping_cost"),
            total_weight_kg=data.get("total_weight_kg"),
            total_cost=data.get("total_cost"),
            status=OrderStatus(int(data.get("status"))),
            payment_status=PaymentStatus(int(data.get("payment_status"))),
            transaction_id=data.get("transaction_id"),
            cancel_reason=data.get("cancel_reason"),
            created_at=data.get("created_at"),
            updated_at=data.get("updated_at"),
            # additional fields
            items=items_from_dict,
            total_items=total_items,
        )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "shopping_session_id": self.shopping_session_id,
            "shipping_address_id": self.shipping_address_id,
            "payment_method_id": self.payment_method_id,
            "shipping_option_id": self.shipping_option_id,
            "shipping_carrier_id": self.shipping_carrier_id,
            "shipping_cost": self.shipping_cost,
            "total_weight_kg": self.total_weight_kg,
            "total_cost": self.total_cost,
            "status": self.status.value,
            "payment_status": self.payment_status.value,
            "transaction_id": self.transaction_id,
            "cancel_reason": self.cancel_reason,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            # additional fields
            "items": [
                item.to_dict() if isinstance(item, OrderItem) else item
                for item in self.items
            ],
            "total_items": self.total_items,
        }

    def to_dict_human(self):
        data = self.to_dict()
        # Additional data for show up in UI
        data["status"] = self.status.label()
        data["payment_status"] = self.payment_status.label()
        if self.shipping_address:
            data["shipping_address"] = self.shipping_address.to_dict()
        if self.payment_method:
            data["payment_method"] = self.payment_method.to_dict()
        if self.shipping_option:
            data["shipping_option"] = self.shipping_option.to_dict()
        if self.shipping_carrier:
            data["shipping_carrier"] = self.shipping_carrier.to_dict()
        if self.order_returns:
            data["order_returns"] = [
                order_return.to_dict_human() for order_return in self.order_returns
            ]

        return data

    def db_model_data(self):
        """Model for Order in database"""
        # Exclude some data fields not have in database
        return self.model_dump(
            mode="json",
            exclude={
                "items",
                "total_items",
                "shipping_address",
                "payment_method",
                "shipping_option",
                "shipping_carrier",
                "order_returns",
            },
        )
