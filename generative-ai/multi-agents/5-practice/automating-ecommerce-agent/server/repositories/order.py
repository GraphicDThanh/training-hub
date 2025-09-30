import logging

from common.config import settings
from common.constants import DatabaseTable, StatusCode
from common.entities import Order, OrderItem, OrderReturn
from common.errors.cart import CartErrorCode
from common.errors.order import OrderErrorCode
from common.exceptions.order import OrderException, OrderItemException
from postgrest.exceptions import APIError

from .base import Repository

logger = logging.getLogger(__name__)


class OrderRepository(Repository[Order]):
    def __init__(self):
        super().__init__(supabase_key=settings.supabase.SERVICE_ROLE_KEY)
        self.ORDERS = DatabaseTable.ORDERS.value

    def get(self, id: str) -> Order | None:
        try:
            response = (
                self.client.table(self.ORDERS)
                .select("*")
                .eq("id", id)
                .single()
                .execute()
            )
            data = response.data

            if not data:
                print(f"Order with ID {id} not found.")
                return None

            order_dict = response.data[0]
            items_response = (
                self.client.table("order_items")
                .select("*")
                .eq("order_id", order_dict["id"])
                .execute()
            )
            order_dict["items"] = items_response.data
            order = Order.from_dict(response.data[0]) if response.data else None
            return order

        except APIError as api_e:
            print(f"Error fetching order: {api_e}")
            raise OrderException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=OrderErrorCode.SUPABASE_API_ERROR,
                message=api_e.message,
            )
        except Exception as e:
            logger.exception("[%s] Error during get order: %s", "Repository", e)
            raise OrderException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=ValueError.INTERNAL_SERVER_ERROR,
                message=str(e),
            )

    def get_all(self) -> list[Order] | None:
        raise NotImplementedError("Get all operation is not implemented for orders.")

    def add(self, item: Order) -> Order:
        """
        Create an order from the cart.

        Args:
            cart: Cart object to create order from.

        Returns:
            Order: Created order object.
        """
        try:
            # Create order
            response = (
                self.client.table(self.ORDERS).insert(item.db_model_data()).execute()
            )

            return Order.from_dict(response.data[0]) if response.data else None

        except APIError as e:
            logger.exception("[Repository] Error during create order: %s", e)
            raise OrderException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=OrderErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception("[%s] Error during create order: %s", "Repository", e)
            raise OrderException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=OrderErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )

    def update(self, item: Order) -> None:
        """
        Update an order.

        Args:
            item: Order object to update.

        Returns:
            None
        """
        try:
            response = (
                self.client.table(self.ORDERS)
                .update(item.db_model_data())
                .eq("id", item.id)
                .execute()
            )

            if not response.data:
                print("Order update failed.")
                return None

            order_dict = response.data[0]
            items_response = (
                self.client.table("order_items")
                .select("*")
                .eq("order_id", order_dict["id"])
                .execute()
            )
            order_dict["items"] = items_response.data
            order = Order.from_dict(response.data[0]) if response.data else None
            return order
        except APIError as e:
            logger.exception("[Repository] Error during update order: %s", e)
            raise OrderException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=OrderErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception("[%s] Error during update order: %s", "Repository", e)
            raise OrderException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=OrderErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )

    def delete(self, id: str) -> None:
        raise NotImplementedError(
            "Delete operation is not implemented for shopping sessions."
        )

    def get_orders_by_user(self, user_id: str) -> list[Order] | None:
        """
        Get all orders for a user.

        Args:
            user_id: User ID to get orders for.

        Returns:
            list[Order]: List of orders for the user.
        """
        try:
            response = (
                self.client.table(self.ORDERS)
                .select("*")
                .eq("user_id", user_id)
                .execute()
            )

            orders = []
            for order_dict in response.data:
                items_response = (
                    self.client.table("order_items")
                    .select("*")
                    .eq("order_id", order_dict["id"])
                    .execute()
                )
                order_dict["items"] = items_response.data
                order = Order.from_dict(order_dict) if response.data else None
                orders.append(order)

            return orders
        except APIError as api_e:
            print(f"Error fetching orders: {api_e}")
            raise OrderException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=OrderErrorCode.SUPABASE_API_ERROR,
                message=api_e.message,
            )
        except Exception as e:
            logger.exception(
                "[%s] Error during get orders by user: %s", "Repository", e
            )
            raise OrderException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=OrderErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )


class OrderReturnRepository(Repository[OrderReturn]):
    def __init__(self):
        super().__init__(supabase_key=settings.supabase.SERVICE_ROLE_KEY)
        self.ORDER_RETURNS = DatabaseTable.ORDER_RETURNS.value

    def get(self, id: str) -> OrderReturn | None:
        raise NotImplementedError("Get operation is not implemented for orders.")

    def get_all(self) -> list[Order] | None:
        raise NotImplementedError("Get all operation is not implemented for orders.")

    def add(self, item: OrderReturn) -> OrderReturn:
        """
        Create an order return.
        Args:
            cart: Cart object to create order from.

        Returns:
            OrderReturn: Created order return object.
        """
        try:
            # Create order return request
            response = (
                self.client.table(self.ORDER_RETURNS)
                .insert(item.db_model_data())
                .execute()
            )

            return OrderReturn.from_dict(response.data[0]) if response.data else None

        except APIError as e:
            logger.exception("[Repository] Error during create order return: %s", e)
            raise OrderException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=OrderErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception(
                "[%s] Error during create order return: %s", "Repository", e
            )
            raise OrderException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=OrderErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )

    def update(self, item: Order) -> None:
        raise NotImplementedError(
            "Update operation is not implemented for order returns."
        )

    def delete(self, id: str) -> None:
        raise NotImplementedError(
            "Delete operation is not implemented for shopping sessions."
        )

    def get_order_returns_by_order_id(self, order_id: str) -> list[OrderReturn] | None:
        """
        Get all order returns for an order.

        Args:
            order_id: Order ID to get order returns for.

        Returns:
            list[OrderReturn]: List of order returns for the order.
        """
        try:
            response = (
                self.client.table(self.ORDER_RETURNS)
                .select("*")
                .eq("order_id", order_id)
                .execute()
            )

            return [OrderReturn.from_dict(item) for item in response.data]
        except APIError as api_e:
            print(f"Error fetching order returns: {api_e}")
            raise OrderException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=OrderErrorCode.SUPABASE_API_ERROR,
                message=api_e.message,
            )
        except Exception as e:
            logger.exception(
                "[%s] Error during get order returns by order ID: %s", "Repository", e
            )
            raise OrderException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=OrderErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )


class OrderItemRepository(Repository[OrderItem]):
    def __init__(self):
        super().__init__(supabase_key=settings.supabase.SERVICE_ROLE_KEY)
        self.ORDER_ITEMS = DatabaseTable.ORDER_ITEMS.value

    def get(self, id: str) -> NotImplementedError:
        raise NotImplementedError("Get operation is not implemented for order items.")

    def get_all(self) -> NotImplementedError:
        raise NotImplementedError(
            "Get all operation is not implemented for order items."
        )

    def add(self, order_item: OrderItem) -> None:
        try:
            order_item_data = order_item.db_model_data()
            response = (
                self.client.table(self.ORDER_ITEMS).insert(order_item_data).execute()
            )
            return OrderItem.from_dict(response.data[0]) if response.data else None
        except APIError as e:
            print(f"Error creating cart item: {e}")
            raise OrderItemException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.error(f"Error creating order item: {e}")
            raise OrderItemException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=CartErrorCode.INTERNAL_SERVER_ERROR,
                message="Failed to create order item.",
            )

    def update(self, item: OrderItem) -> NotImplementedError:
        raise NotImplementedError(
            "Update operation is not implemented for order items."
        )

    def delete(self, id: str) -> NotImplementedError:
        raise NotImplementedError(
            "Delete operation is not implemented for order items."
        )

    def get_order_items(self, order_id: str) -> list[OrderItem]:
        try:
            response = (
                self.client.table(self.ORDER_ITEMS)
                .select("*")
                .eq("order_id", order_id)
                .execute()
            )

            if not response.data:
                return []

            # Map response data to OrderItem objects and collect product IDs
            order_items = [OrderItem.from_dict(item) for item in response.data]
            return order_items
        except APIError as e:
            raise OrderItemException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=CartErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.error(f"Error retrieving order items: {e}")
            raise OrderItemException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=CartErrorCode.INTERNAL_SERVER_ERROR,
                message="Failed to retrieve order items.",
            )
