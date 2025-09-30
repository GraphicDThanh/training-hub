from .base import Entity


class ShippingCarrier(Entity):
    id: str
    name: str
    description: str = ""

    @staticmethod
    def from_dict(data: dict):
        return ShippingCarrier(**data)


class ShippingOption(Entity):
    id: str
    name: str
    description: str = None
    base_price: float = 0
    shipping_carriers: list[ShippingCarrier] = None

    @staticmethod
    def from_dict(data: dict):
        return ShippingOption(**data)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "base_price": self.base_price,
            "shipping_carriers": [carrier.to_dict() for carrier in self.shipping_carriers] if self.shipping_carriers else [],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def db_model_data(self):
        """Model for ShippingOption in database"""
        # Exclude some data fields not have in database
        return self.model_dump(
            mode="json",
            exclude={
                "shipping_carriers",
            },
        )
