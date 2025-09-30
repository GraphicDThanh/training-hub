import logging

from common.types.response import ServiceResponse
from common.errors.order import OrderError, OrderItemError
from common.exceptions.order import OrderException, OrderItemException
from common.entities import Order, User, OrderReturn
from repositories import OrderItemRepository, OrderRepository, OrderReturnRepository
from services.shipping import ShippingService
from services.user import UserService
from common.enums import OrderStatus, OrderReturnStatus


logger = logging.getLogger(__name__)


class OrderService:
    def __init__(
        self,
        order_repo: OrderRepository,
        order_item_repo: OrderItemRepository,
        order_return_repo: OrderReturnRepository,
        shipping_service: ShippingService,
        user_service: UserService
    ):
        self.order_repo = order_repo
        self.order_item_repo = order_item_repo
        self.order_return_repo = order_return_repo
        self.shipping_service = shipping_service
        self.user_service = user_service

    def add(self, order: Order) -> ServiceResponse:
        """
        Add a new order.

        Args:
            order (Order): Order object to add.

        Returns:
            ServiceResponse: Response object containing the result of the operation.
        """
        try:
            order_result = self.order_repo.add(order)
            if order_result is None:
                return ServiceResponse(
                    success=False,
                    status_code=400,
                    errors=[OrderError.create_failed()],
                    message="Cart Service: no data after created order",
                )

            # Create order items
            order_items = []
            for order_item in order.items:
                order_item_result = self.order_item_repo.add(order_item)
                if order_item_result is None:
                    logger.error(
                        "Order Service: no data after created order item.   By pass order item of product %s.",
                        order_item.product_id,
                    )
                    continue

                order_items.append(order_item_result)

            order_result.items = order_items

            return ServiceResponse(
                data={"order": order_result},
                message="Cart Service: order created successfully",
            )
        except OrderException as e:
            logger.error(f"Service: Error creating order: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[OrderError.failure(e.error_code, e.message)],
                message="Cart Service: error creating order",
            )
        except OrderItemException as e:
            logger.error(f"Service: Error creating order item: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[OrderItemError.failure(e.error_code, e.message)],
                message="Cart Service: error creating order item",
            )
        except Exception as e:
            logger.error(f"Service: Error creating order: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[OrderError.failure(str(e))],
                message="Cart Service: error creating order",
            )

    def get_orders_by_user(self, user: User) -> ServiceResponse:
        """
        Get all orders for a user.

        Args:
            user_id (str): User ID to get orders for.

        Returns:
            ServiceResponse: Response object containing the result of the operation.
        """
        try:
            orders = self.order_repo.get_orders_by_user(user.id)
            return ServiceResponse(
                data={"orders": orders},
                message="Order Service: orders retrieved successfully",
            )
        except OrderException as e:
            logger.error(f"Service: Error retrieving orders: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[OrderError.failure(e.error_code, e.message)],
                message="Order Service: error retrieving orders",
            )
        except Exception as e:
            logger.error(f"Service: Error retrieving orders: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[OrderError.failure(str(e))],
                message="Order Service: error retrieving orders",
            )

    def get_order_by_user(
        self, user: User, order_id: str
    ) -> ServiceResponse:
        """
        Get an order by user.

        Args:
            user (User): User object to get orders for.
            order_id (str): Order ID to get.

        Returns:
            ServiceResponse: Response object containing the result of the operation.
        """
        try:
            orders = self.order_repo.get_orders_by_user(user.id)

            target_order = None
            for order in orders:
                if order.id == order_id:
                    target_order = order
                    break

            if target_order:
                # Fetch order nested data
                # - Shipping Option
                shipping_option_response = self.shipping_service.get_shipping_option_by_id(
                    target_order.shipping_option_id
                )
                if (
                    shipping_option_response.success
                    and shipping_option_response.data["shipping_option"]
                ):
                    target_order.shipping_option = shipping_option_response.data["shipping_option"]

                # - Shipping Carrier
                shipping_carrier_response = self.shipping_service.get_shipping_carrier_by_id(
                    target_order.shipping_carrier_id
                )
                if (
                    shipping_carrier_response.success
                    and shipping_carrier_response.data["shipping_carrier"]
                ):
                    target_order.shipping_carrier = shipping_carrier_response.data["shipping_carrier"]

                # - Shipping Address
                shipping_address_response = self.user_service.get_shipping_address(user.id)
                if (
                    shipping_address_response.success
                    and shipping_address_response.data["shipping_address"]
                ):
                    shipping_address = shipping_address_response.data["shipping_address"]
                    if target_order.shipping_address_id == shipping_address.id:
                        target_order.shipping_address = shipping_address

                # - Payment Method
                payment_method_response = self.user_service.get_payment_method(user.id)
                if (
                    payment_method_response.success
                    and payment_method_response.data["payment_method"]
                ):
                    payment_method = payment_method_response.data["payment_method"]
                    if target_order.payment_method_id == payment_method.id:
                        target_order.payment_method = payment_method

                # - Order Return
                order_return_response = self.get_order_returns_by_order_id(
                    target_order.id
                )
                if (
                    order_return_response.success
                    and order_return_response.data["order_returns"]
                ):
                    target_order.order_returns = order_return_response.data["order_returns"]

                return ServiceResponse(
                    data={"order": target_order},
                    message="Order Service: order retrieved successfully",
                )

            return ServiceResponse(
                success=False,
                status_code=404,
                errors=[OrderError.not_found()],
                message="Order Service: order not found",
            )
        except OrderException as e:
            logger.error(f"Service: Error retrieving order: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[OrderError.failure(e.error_code, e.message)],
                message="Order Service: error retrieving order",
            )
        except Exception as e:
            logger.error(f"Service: Error retrieving order: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[OrderError.failure(str(e))],
                message="Order Service: error retrieving order",
            )

    def update_order(self, item: Order):
        """
        Update an order.

        Args:
            item: Order object to update.

        Returns:
            None
        """
        try:
            order = self.order_repo.update(item)

            if not order:
                return ServiceResponse(
                    success=False,
                    status_code=404,
                    errors=[OrderError.not_found()],
                    message="Order Service: order not found after update",
                )

            return ServiceResponse(
                data={"order": order},
                message="Order Service: order updated successfully",
            )
        except OrderException as e:
            logger.error(f"Service: Error updating order: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[OrderError.failure(e.error_code, e.message)],
                message="Order Service: error updating order",
            )
        except Exception as e:
            logger.error(f"Service: Error updating order: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[OrderError.failure(str(e))],
                message="Order Service: error updating order",
            )

    def create_order_return_request(self, item: OrderReturn) -> ServiceResponse:
        """
        Create a return order request.

        Args:
            item: Order object to create return request.

        Returns:
            ServiceResponse
        """
        # Create order return request
        try:
            order_return_request = self.order_return_repo.add(item)
            return ServiceResponse(
                data={"order_return_request": order_return_request},
                message="Order Service: order returned request created successfully. We will process your request soon. Thank you for your patience.",
            )
        except OrderException as e:
            logger.error(f"Service: Error creating return order request: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[OrderError.failure(e.error_code, e.message)],
                message="Order Service: error creating return order request",
            )
        except Exception as e:
            logger.error(f"Service: Error create return order request: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[OrderError.failure(str(e))],
                message="Order Service: error returning order",
            )

    def get_order_returns_by_order_id(
        self, order_id: str
    ) -> ServiceResponse:
        """
        Get order return requests by order ID.

        Args:
            order_id (str): Order ID to get return requests for.

        Returns:
            ServiceResponse: Response object containing the result of the operation.
        """
        try:
            order_returns = self.order_return_repo.get_order_returns_by_order_id(order_id)
            return ServiceResponse(
                data={"order_returns": order_returns},
                message="Order Service: order return requests retrieved successfully",
            )
        except OrderException as e:
            logger.error(f"Service: Error retrieving order return requests: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[OrderError.failure(e.error_code, e.message)],
                message="Order Service: error retrieving order return requests",
            )
        except Exception as e:
            logger.error(f"Service: Error retrieving order return requests: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[OrderError.failure(str(e))],
                message="Order Service: error retrieving order return requests",
            )

    def return_order(self, user: User, order_id: str, reason: str) -> ServiceResponse:
        def get_error_message_if_order_not_allow_return(order_status):
            error_message = None

            if order_status in [
                OrderStatus.PENDING_CONFIRM,
                OrderStatus.WAITING_FOR_PICKUP
            ]:
                error_message = f"Order Service: order status {order_status.label()} not allow to return."
            elif order_status == OrderStatus.CANCELLED:
                error_message = "Order Service: this order has been canceled. Cannot create return order request."
            elif order_status == OrderStatus.ON_DELIVERY:
                error_message = "Order Service: this order is on delivery. Cannot create return order request."
            elif order_status == OrderStatus.RETURN_REQUESTED:
                error_message = "Order Service: order already has a return request. Please check your order detail."

            return error_message

        # Valid if order is exist first
        response = self.get_order_by_user(user, order_id)
        if response.success is False:
            return ServiceResponse(
                success=False,
                status_code=400,
                errors=[OrderError.failure(response.message)],
                message=f"Order Service: return order failed: {response.message}",
            )

        order = response.data["order"]

        # Validate if order allow return
        error_message = get_error_message_if_order_not_allow_return(order.status)
        if error_message:
            return ServiceResponse(
                success=False,
                status_code=400,
                errors=[OrderError.failure(error_message)],
                message=error_message,
            )

        # Create order return request
        order_return = OrderReturn(
            order_id=order.id,
            reason=reason,
            status=OrderReturnStatus.REQUESTED,
        )
        create_order_return_response = self.create_order_return_request(order_return)
        if create_order_return_response.success is False:
            return ServiceResponse(
                success=False,
                status_code=400,
                errors=[OrderError.failure(error_message)],
                message=response.message,
            )

        # Update order status to RETURN_REQUESTED
        order.status = OrderStatus.RETURN_REQUESTED
        update_order_response = self.update_order(order)
        if update_order_response.success is False:
            return ServiceResponse(
                success=False,
                status_code=400,
                errors=[OrderError.failure(update_order_response.message)],
                message= f"Order Service: Successfully create order return request. But update order status to RETURN_REQUESTED fail with message: {update_order_response.message}",
            )

        return ServiceResponse(
            data={
                "order": order,
                "order_return_request": create_order_return_response.data["order_return_request"]
            },
            message="Order Service: order returned request created successfully. We will process your request soon. Thank you for your patience.",
        )

    def cancel(self, order: Order, reason: str) -> ServiceResponse:
        """
        Cancel an order.

        Args:
            order (Order): Order object to cancel.
            reason (str): Reason for cancellation.

        Returns:
            ServiceResponse: Response object containing the result of the operation.
        """
        def get_error_message_if_order_not_allow_cancel(order_status):
            error_message = None
            if order_status in [
                OrderStatus.PENDING_CONFIRM,
                OrderStatus.WAITING_FOR_PICKUP
            ]:
                return error_message

            if order_status == OrderStatus.CANCELLED:
                error_message = "Order Service: order already cancelled. Please check your order detail."
            elif order_status in [
                OrderStatus.ON_DELIVERY,
                OrderStatus.DELIVERED
            ]:
                error_message = f"Order Service: order status {order_status.label()} not allow to cancel anymore. Please do return order instead once you received the package."
            elif order_status == OrderStatus.RETURN_REQUESTED:
                error_message = "Order Service: this order not allow to cancel anymore. Please check your order detail."

            return error_message

        error_message = get_error_message_if_order_not_allow_cancel(order.status)
        if error_message:
            return ServiceResponse(
                success=False,
                status_code=400,
                errors=[OrderError.failure(error_message)],
                message=error_message,
            )

        try:
            order.status = OrderStatus.CANCELLED
            order.cancel_reason = reason
            updated_order = self.order_repo.update(order)
            return ServiceResponse(
                data={"order": updated_order},
                message="Order Service: order cancelled successfully",
            )
        except OrderException as e:
            logger.error(f"Service: Error cancelling order: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[OrderError.failure(e.error_code, e.message)],
                message="Order Service: error cancelling order",
            )
        except Exception as e:
            logger.error(f"Service: Error cancelling order: {e.message}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[OrderError.failure(str(e))],
                message="Order Service: error cancelling order",
            )