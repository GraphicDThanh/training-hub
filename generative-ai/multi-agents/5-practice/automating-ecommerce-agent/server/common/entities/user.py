from typing import Optional

from .base import Entity
from .payment_options import PaymentOption


class User(Entity):
    email: str
    phone: str = None

    @staticmethod
    def from_dict(data: dict):
        user = User(
            id=data["id"],
            email=data["email"],
            phone=data.get("phone"),
            created_at=data["created_at"],
            updated_at=data["updated_at"],
        )

        return user


class ShippingAddress(Entity):
    user_id: str
    address_line_1: str
    address_line_2: Optional[str] = None
    city: str
    postal_code: str
    state: Optional[str] = None
    country: str
    is_default: bool = False

    @staticmethod
    def from_dict(data: dict):
        return ShippingAddress(**data)


class PaymentMethod(Entity):
    user_id: str
    payment_option_id: str
    payment_option: PaymentOption = None
    is_default: bool = False

    @staticmethod
    def from_dict(data: dict):
        return PaymentMethod(**data)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "payment_option": self.payment_option.to_dict() if self.payment_option else None,
            "payment_option_id": self.payment_option_id,
            "is_default": self.is_default,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def db_model_data(self):
        return self.model_dump(
            mode="json",
            exclude={
                "payment_option",
            },
        )
