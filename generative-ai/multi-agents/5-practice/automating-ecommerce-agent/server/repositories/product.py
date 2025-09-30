import logging

from common.config import settings
from common.constants import DatabaseTable
from common.constants import StatusCode
from common.entities.product import Product
from common.errors.product import ProductErrorCode
from common.errors.supabase import APIError
from common.exceptions.product import ProductException

from .base import Repository

logger = logging.getLogger(__name__)


class ProductRepository(Repository[Product]):
    def __init__(self):
        super().__init__()
        self.PRODUCTS = DatabaseTable.PRODUCTS.value

    def get(self, id: str) -> Product:
        try:
            response = (
                self.client.table(self.PRODUCTS)
                .select("*")
                .eq("id", id)
                .single()
                .execute()
            )
            data = response.data
            return Product.from_dict(data) if data else None
        except APIError as e:
            logger.exception("[%s] Error during get product: %s", "Repository", e)
            raise ProductException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=ProductErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception("[%s] Error during get product: %s", "Repository", e)
            raise ProductException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=ProductErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )

    def get_all(self) -> list[Product]:
        raise NotImplementedError("Get all operation is not implemented for products.")

    def add(self, item: Product) -> None:
        raise NotImplementedError("Add operation is not implemented for products.")

    def update(self, item: Product) -> None:
        raise NotImplementedError("Update operation is not implemented for products.")

    def delete(self, id: int) -> None:
        raise NotImplementedError("Delete operation is not implemented for products.")

    def get_product_by_name(self, name: str) -> Product:
        try:
            response = (
                self.client.table(self.PRODUCTS)
                .select("*")
                .eq("name", name)
                .limit(1)
                .execute()
            )

            return Product.from_dict(response.data[0]) if response.data else None
        except APIError as e:
            logger.exception(
                "[%s] Error during get product by name: %s", "Repository", e
            )
            raise ProductException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=ProductErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception("[%s] Error during get product: %s", "Repository", e)
            raise ProductException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=ProductErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )

    def get_products_by_ids(self, ids: list[str]) -> list[Product]:
        try:
            response = (
                self.client.table(self.PRODUCTS).select("*").in_("id", ids).execute()
            )
            return (
                [Product.from_dict(product_data) for product_data in response.data]
                if response.data
                else []
            )
        except APIError as e:
            logger.exception("[%s] Error during get product by id: %s", "Repository", e)
            raise ProductException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=ProductErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception("[%s] Error during get product by id: %s", "Repository", e)
            raise ProductException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=ProductErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )
