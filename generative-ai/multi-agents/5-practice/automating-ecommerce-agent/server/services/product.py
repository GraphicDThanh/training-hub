import logging

from common.types.response import ServiceResponse
from common.exceptions.product import ProductException
from common.entities import Product
from repositories import ProductRepository



logger = logging.getLogger(__name__)


class ProductService:
    def __init__(
        self,
        product_repo: ProductRepository,
    ):
        self.product_repo = product_repo

    def get_products_by_ids(self, ids: list[str]) -> ServiceResponse:
        """
        Get products by their IDs.

        Args:
            ids (list[str]): The list of product IDs.

        Returns:
            ServiceResponse[list[Product]]: The list of products if found, otherwise None.
        """
        try:
            products = self.product_repo.get_products_by_ids(ids)
            return ServiceResponse(data={"products": products})
        except ProductException as e:
            logger.error("Error getting products by IDs: %s", e)
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                message=e.message,
                errors=[e.to_dict()],
            )

    def get_product_by_name(self, name: str) -> ServiceResponse:
        """
        Get a product by its name.

        Args:
            name (str): The name of the product.

        Returns:
            ServiceResponse[Product]: The product if found, otherwise None.
        """
        try:
            product: Product = self.product_repo.get_product_by_name(name)
            return ServiceResponse(data={"product": product})
        except ProductException as e:
            logger.error("Error getting product by name: %s", e)
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                message=e.message,
                errors=[e.to_dict()],
            )
