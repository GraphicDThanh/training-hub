from .base import Entity
from common.enums import PaymentOptionProvider, PaymentOptionCategory


class PaymentOption(Entity):
    id: str
    name: str
    category: PaymentOptionCategory = None
    provider: PaymentOptionProvider = None

    @staticmethod
    def from_dict(data: dict):
        return PaymentOption(
            id=data["id"],
            name=data["name"],
            category=PaymentOptionCategory(int(data["category"])),
            provider=PaymentOptionProvider(int(data["provider"])),
            created_at=data["created_at"],
            updated_at=data["updated_at"]
        )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category.value,
            "provider": self.provider.value,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }