from common.entities import Entity


class Product(Entity):
    name: str
    description: str
    price: float
    sizes: str
    category_id: str
    thumbnail: str
    url: str
    quantity: int

    @staticmethod
    def from_dict(data: dict):
        return Product(**data)
