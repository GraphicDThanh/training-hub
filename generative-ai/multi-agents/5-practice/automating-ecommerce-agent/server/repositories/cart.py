import logging
from typing import Optional

from common.config import settings
from common.constants import DatabaseTable
from common.constants import StatusCode
from common.entities import Cart, CartItem
from common.enums import CartStatus
from common.errors.cart import CartErrorCode
from common.errors.supabase import APIError
from common.exceptions.cart import CartException, CartItemException
from repositories.product import ProductRepository

from .base import Repository

logger = logging.getLogger(__name__)
product_repo = ProductRepository()


class CartRepository(Repository[Cart]):
    def __init__(self):
        super().__init__(supabase_key=settings.supabase.SERVICE_ROLE_KEY)
        self.CARTS = DatabaseTable.CARTS.value
        self.CARTS_ITEMS = DatabaseTable.CART_ITEMS.value

    def get(self, id: str) -> Optional[Cart]:
        try:
            response = (
                self.client.table(self.CARTS)
                .select("*")
                .eq("id", id)
                .limit(1)
                .execute()
            )

            return Cart.from_dict(response.data[0]) if response.data else None
        except APIError as e:
            logger.exception("[%s] Error during get cart: %s", "Repository", e)
            raise CartException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )

    def get_all(self) -> NotImplementedError:
        raise NotImplementedError(
            "Get all operation is not implemented for shopping sessions."
        )

    def add(self, cart: Cart) -> Optional[Cart]:
        try:
            cart_data = cart.db_model_data()
            response = self.client.table(self.CARTS).insert(cart_data).execute()

            return Cart.from_dict(response.data[0]) if response.data else None
        except APIError as e:
            logger.exception("[%s] Error during add cart: %s", "Repository", e)
            raise CartException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception("[%s] Error during add cart: %s", "Repository", e)
            raise CartException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=CartErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )

    def update(self, cart: Cart) -> Optional[Cart]:
        try:
            response = (
                self.client.table(self.CARTS)
                .update(cart.db_model_data())
                .eq("id", cart.id)
                .execute()
            )

            return Cart.from_dict(response.data[0]) if response.data else None
        except APIError as e:
            logger.exception("[%s] Error during add update cart: %s", "Repository", e)
            raise CartException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )

    def delete(self, id: str) -> NotImplementedError:
        raise NotImplementedError(
            "Delete operation is not implemented for shopping sessions."
        )

    def get_by_user(self, user_id: str) -> Optional[Cart]:
        try:
            response = (
                self.client.table(self.CARTS)
                .select("*")
                .eq("user_id", user_id)
                .eq("status", CartStatus.ACTIVE.value)
                .limit(1)
                .execute()
            )

            return Cart.from_dict(response.data[0]) if response.data else None
        except APIError as e:
            raise CartException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )

    def clear_cart(self, cart_id: str) -> None:
        try:
            self.client.table(self.CARTS_ITEMS).delete().eq(
                "shopping_session_id", cart_id
            ).execute()
        except Exception as e:
            logger.exception("[%s] Error during clear cart: %s", "Repository", e)
            raise CartException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )


class CartItemRepository(Repository[CartItem]):
    def __init__(self):
        super().__init__(supabase_key=settings.supabase.SERVICE_ROLE_KEY)
        self.CART_ITEMS = DatabaseTable.CART_ITEMS.value

    def get(self, id: str) -> CartItem | None:
        try:
            response = (
                self.client.table(self.CART_ITEMS)
                .select("*")
                .eq("id", id)
                .single()
                .execute()
            )
            data = response.data
            return CartItem.from_dict(data) if data else None
        except APIError as e:
            raise CartItemException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )

    def get_all(self) -> list[CartItem] | None:
        raise NotImplementedError(
            "Get all operation is not implemented for cart items."
        )

    def add(self, cart_item: CartItem) -> None:
        try:
            cart_item_data = cart_item.db_model_data()
            response = (
                self.client.table(self.CART_ITEMS).insert(cart_item_data).execute()
            )
            return response.data[0] if response.data else None
        except APIError as e:
            print(f"Error creating cart item: {e}")
            raise CartItemException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )

    def update(self, cart_item: CartItem) -> None:
        try:
            cart_item_data = cart_item.db_model_data()
            self.client.table(self.CART_ITEMS).update(cart_item_data).eq(
                "id", cart_item.id
            ).execute()
        except APIError as e:
            print(f"Error updating cart item: {e}")
            raise CartItemException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )

    def delete(self, id: str) -> None:
        try:
            self.client.table(self.CART_ITEMS).delete().eq("id", id).execute()
        except APIError as e:
            print(f"Error deleting cart item: {e}")
            raise CartItemException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )

    def get_cart_items(self, cart_id: str) -> list[CartItem]:
        try:
            response = (
                self.client.table(self.CART_ITEMS)
                .select("*")
                .eq("shopping_session_id", cart_id)
                .execute()
            )

            if not response.data:
                return []

            # Map response data to CartItem objects and collect product IDs
            cart_items = [CartItem.from_dict(item) for item in response.data]
            product_ids = [cart_item.product_id for cart_item in cart_items]

            # Fetch products by their IDs
            products = {
                product.id: product
                for product in product_repo.get_products_by_ids(product_ids)
            }

            # Map products to their corresponding cart items
            for cart_item in cart_items:
                cart_item.product = products.get(cart_item.product_id)

            return cart_items
        except APIError as e:
            raise CartItemException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )

    def get_cart_item_by_product(
        self, cart_id: str, product_id: str
    ) -> CartItem | None:
        try:
            response = (
                self.client.table(self.CART_ITEMS)
                .select("*")
                .eq("shopping_session_id", cart_id)
                .eq("product_id", product_id)
                .limit(1)
                .execute()
            )

            cart_item_data = response.data[0] if response.data else None
            if cart_item_data:
                return CartItem.from_dict(cart_item_data)

            return None
        except APIError as e:
            logger.exception("[%s] Error during get cart: %s", "Repository", e)
            raise CartItemException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
