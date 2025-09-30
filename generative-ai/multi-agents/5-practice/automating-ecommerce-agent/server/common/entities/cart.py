from common.entities import Entity
from common.entities.product import Product
from common.enums import CartStatus


class CartItem(Entity):
    product_id: str

    # save product data to reuse
    product: Product = None

    # field name in db, stand for the cart id (active shopping session)
    shopping_session_id: str
    quantity: int

    @staticmethod
    def from_dict(data: dict):
        # Avoid circular import
        from repositories import product_repo

        cart_item = CartItem(
            id=data["id"],
            product_id=data["product_id"],
            shopping_session_id=data["shopping_session_id"],
            quantity=data["quantity"],
            created_at=data["created_at"],
            updated_at=data["updated_at"],
        )

        product = product_repo.get(data["product_id"])
        if product:
            cart_item.product = product

        return cart_item

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "shopping_session_id": self.shopping_session_id,
            "quantity": self.quantity,
            "product": self.product.to_dict() if self.product else None,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def db_model_data(self):
        """Model for CartItem in database"""
        # Exclude some data fields not have in database
        return self.model_dump(mode="json", exclude={"product"})


class Cart(Entity):
    user_id: str
    items: list[CartItem] = None
    status: CartStatus = CartStatus.ACTIVE
    total_cost: float = 0
    total_items: int = 0

    @staticmethod
    def from_dict(data: dict):
        total_items = total_cost = 0
        cart_items = [
            CartItem.from_dict(item) if isinstance(item, dict) else item
            for item in data.get("items", [])
        ]

        for item in cart_items:
            total_items += item.quantity
            total_cost += item.product.price * item.quantity

        return Cart(
            id=data["id"],
            user_id=data["user_id"],
            status=CartStatus(int(data["status"])),
            items=cart_items,
            total_cost=total_cost,
            total_items=total_items,
            created_at=data["created_at"],
            updated_at=data["updated_at"],
        )

    def to_dict(self):
        total_items = total_cost = 0
        cart_items = [
            item.to_dict() if isinstance(item, CartItem) else item
            for item in self.items
        ]
        for item in cart_items:
            total_items += item["quantity"]
            product = item.get("product")
            if product:
                total_cost += item["product"]["price"] * item["quantity"]

        return {
            "id": self.id,
            "items": cart_items,
            "user_id": self.user_id,
            "status": self.status.value,
            "total_cost": total_cost,
            "total_items": total_items,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def db_model_data(self):
        """Model for Cart in database"""
        return self.model_dump(
            mode="json",
            # Exclude some data fields not have in database
            exclude={
                "items",
                "total_cost",
                "total_items",
            },
        )
