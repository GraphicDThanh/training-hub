import logging
import random

from common.entities import (
    Cart,
    CartItem,
    Order,
    OrderItem,
    PaymentMethod,
    ShippingAddress,
    ShippingOption,
)
from common.enums import CartStatus, OrderStatus, PaymentStatus
from common.errors.cart import CartError
from common.exceptions.cart import CartException, CartItemException
from common.types.response import ServiceResponse
from repositories import (
    CartItemRepository,
    CartRepository,
    OrderRepository,
    ProductRepository,
)

from .order import OrderService
from .payment import PaymentService

logger = logging.getLogger(__name__)


class CartService:
    def __init__(
        self,
        cart_repo: CartRepository,
        cart_item_repo: CartItemRepository,
        order_repo: OrderRepository,
        product_repo: ProductRepository,
        order_service: OrderService,
        payment_service: PaymentService,
    ):
        self.cart_repo = cart_repo
        self.order_repo = order_repo
        self.cart_item_repo = cart_item_repo
        self.product_repo = product_repo
        self.order_service = order_service
        self.payment_service = payment_service

    def add(self, cart: Cart) -> ServiceResponse:
        """
        Add a new cart.

        Args:
            cart: Cart object to add.

        Returns:
            Cart: Created cart object.
        """
        try:
            data = self.cart_repo.add(cart)
            if not data:
                logger.exception("Service: Failed to create cart.")
                return ServiceResponse(
                    success=False,
                    status_code=500,
                    errors=[],
                    message="Cart Service: creating cart return empty",
                )

            return ServiceResponse(
                data={"cart": data},
                message="Cart Service: Cart created successfully",
            )

        except CartException as e:
            logger.exception(f"Service: Error creating cart: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: error creating cart",
            )
        except Exception as e:
            logger.exception(f"Service: Error creating cart: {e}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[CartError.failure(str(e))],
                message="Cart Service: error creating cart",
            )

    def get_by_user(self, user_id: str) -> ServiceResponse:
        """
        Get the user's active cart.
        Args:
            user_id: ID of the user.
        Returns:
            Cart: Cart object if found, None otherwise.
        """
        # Get active shopping session
        try:
            cart = self.cart_repo.get_by_user(user_id)

            # Cart not found
            if cart is None:
                return ServiceResponse(
                    data={"cart": None},
                    message="Cart Service: Cart not found",
                )

            # Cart found
            # Get cart items
            response: ServiceResponse = self.get_cart_items(cart.id)
            if response.success is False:
                logger.exception("Service: Failed to fetch cart items.")
                return cart

            cart.items = response.data["cart_items"]
            data = {
                # update other cart fields by reconvert cart object
                "cart": Cart.from_dict(cart.to_dict())
            }
            return ServiceResponse(
                data=data,
                message="Cart fetched successfully",
            )
        except CartException as e:
            logger.exception(f"Service: Error fetching cart: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: Error fetching cart",
            )
        except CartItemException as e:
            logger.exception(f"Service: Error fetching cart items: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: Error fetching cart items",
            )
        except Exception as e:
            logger.exception(f"Service: Error no handle{str(e)}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[CartError.failure(str(e))],
                message="Cart Service: error fetching cart",
            )

    def get_cart(self, cart_id: str) -> ServiceResponse:
        """
        Get a cart by its ID.

        Args:
            cart_id: ID of the cart to retrieve.

        Returns:
            Cart: Cart object if found, None otherwise.
        """
        try:
            cart = self.cart_repo.get(cart_id)

            if cart is None:
                return ServiceResponse(
                    success=False,
                    status_code=404,
                    errors=[CartError.not_found("CART_NOT_FOUND")],
                    message="Cart Not found.",
                )

            # Get cart items
            response_cart_items = self.cart_item_repo.get_cart_items(cart_id)
            cart.items = response_cart_items

            cart_response = Cart.from_dict(cart.to_dict())
            return ServiceResponse(
                data={
                    # update other cart fields by reconvert cart object
                    "cart": cart_response
                },
                message="Cart fetched successfully",
            )
        except CartItemException as e:
            logger.exception(f"Service: Error fetching cart items: {e.message}")
            return ServiceResponse(
                success=False,
                error_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: Error fetching cart items",
            )
        except CartException as e:
            logger.exception(f"Service: Error fetching cart: {e.message}")
            return ServiceResponse(
                success=False,
                error_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: Error fetching cart",
            )
        except Exception as e:
            logger.exception(f"Service: Error fetching cart: {str(e)}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[CartError.failure(str(e))],
                message="Cart Service: error fetching cart",
            )

    def get_or_create_cart(self, user_id: str) -> ServiceResponse:
        """
        Get or create a cart for the user.

        Args:
            user_id: ID of the user.

        Returns:
            ServiceResponse: Response object containing the cart.
        """
        try:
            # Get active shopping session
            response = self.get_by_user(user_id)
            if response.success and response.data["cart"]:
                return response

            # Create a new shopping session
            response = self.add(Cart(user_id=user_id))
            if response.success and response.data["cart"]:
                return response

            return ServiceResponse(
                success=False,
                message="Cart Service: Cart not found",
            )
        except Exception as e:
            logger.exception(f"Service: Error creating cart: {e}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[CartError.failure(str(e))],
                message="Cart Service: error creating cart",
            )

    def get_cart_items(self, cart_id: str) -> ServiceResponse:
        """
        Get cart items by cart ID.

        Args:
            cart_id: ID of the cart to retrieve items from.

        Returns:
            ServiceResponse: Response object containing the cart items.
        """
        try:
            cart_items = self.cart_item_repo.get_cart_items(cart_id)
            return ServiceResponse(
                data={"cart_items": cart_items},
                message="Cart items fetched successfully",
            )
        except CartItemException as e:
            logger.exception(f"Service: Error fetching cart items: {e}")
            return ServiceResponse(
                success=False,
                error_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: Error fetching cart items",
            )
        except Exception as e:
            logger.exception(f"Service: Error fetching cart items: {e}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[CartError.failure(str(e))],
                message="Cart Service: error fetching cart items",
            )

    def add_to_cart(
        self, cart_id: str, product_id: str, quantity: int
    ) -> ServiceResponse:
        """
        Add a product to the cart.

        Args:
            cart_id: ID of the cart to add the product to.
            product_id: ID of the product to add.
            quantity: Quantity of the product to add.

        Returns:
            ServiceResponse: Response object indicating success or failure.
        """
        try:
            cart_item = self.cart_item_repo.get_cart_item_by_product(
                cart_id, product_id
            )

            if cart_item:
                cart_item.quantity += quantity
                self.cart_item_repo.update(cart_item)
                return ServiceResponse(message="Cart item added successfully")

            # Check product before add item to cart
            product = self.product_repo.get(product_id)
            if product is None:
                return ServiceResponse(message="Product not found in system.")

            # Add new cart item
            cart_item = CartItem(
                product_id=product_id,
                product=product,
                shopping_session_id=cart_id,
                quantity=quantity,
            )
            self.cart_item_repo.add(cart_item)

            return ServiceResponse(
                message="Cart item added successfully",
            )
        except CartItemException as e:
            logger.exception(f"Service: Error adding cart item: {e}")
            return ServiceResponse(
                success=False,
                error_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: Error adding cart item",
            )
        except CartException as e:
            logger.exception(f"Service: Error adding cart item: {e}")
            return ServiceResponse(
                success=False,
                error_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: Error adding cart item",
            )

    def remove_from_cart(self, cart_id: str, product_id: str) -> ServiceResponse:
        """
        Remove a cart item by cart ID and product ID.

        Args:
            cart_id: ID of the cart to remove the item from.
            product_id: ID of the product to remove.

        Returns:
            ServiceResponse: Response object indicating success or failure.
        """
        try:
            cart_item = self.cart_item_repo.get_cart_item_by_product(
                cart_id, product_id
            )

            if cart_item is None:
                return ServiceResponse(
                    success=False,
                    message="Product not found in cart.",
                )

            self.cart_item_repo.delete(cart_item.id)

            return ServiceResponse(
                message="Cart item removed successfully",
            )
        except CartItemException as e:
            logger.exception(f"Service: Error get cart item by product id: {e}")
            return ServiceResponse(
                success=False,
                error_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: Error get cart item by product id",
            )
        except CartException as e:
            logger.exception(f"Service: Error removing cart item: {e}")
            return ServiceResponse(
                success=False,
                error_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: Error removing cart item",
            )
        except Exception as e:
            logger.exception(f"Service: Error removing cart item: {e}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[CartError.failure(str(e))],
                message="Cart Service: error removing cart item",
            )

    def update_cart_status(self, cart: Cart, status: CartStatus) -> ServiceResponse:
        try:
            cart.status = status
            response = self.cart_repo.update(cart)
            return ServiceResponse(
                data={"cart": response},
                message="Cart status updated successfully",
            )
        except CartException as e:
            logger.exception(f"Service: Error updating cart status: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: Error updating cart status",
            )
        except Exception as e:
            logger.exception(f"Service: Error updating cart status: {e}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[CartError.failure(str(e))],
                message="Cart Service: error updating cart status",
            )

    def clear_cart(self, cart: Cart) -> ServiceResponse:
        try:
            self.cart_repo.clear_cart(cart.id)
            return ServiceResponse(
                message="Cart cleared successfully",
            )
        except CartException as e:
            logger.exception(f"Service: Error fetching cart: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: Error fetching cart",
            )
        except Exception as e:
            logger.exception(f"Service: Error fetching cart: {e}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[CartError.failure(str(e))],
                message="Cart Service: error fetching cart",
            )

    def checkout(
        self,
        cart: Cart,
        shipping_address: ShippingAddress,
        payment_method: PaymentMethod,
        shipping_option: ShippingOption,
    ) -> ServiceResponse:
        """
        Checkout the cart.

        Args:
            cart: Cart object to checkout.
        """

        def create_order_object(cart, shipping_address, payment_method):
            # Create an order from the cart
            order = Order(
                user_id=cart.user_id,
                status=OrderStatus.PENDING_CONFIRM.value,
                shipping_address_id=shipping_address.id,
                payment_method_id=payment_method.id,
                shipping_option_id=shipping_option.id,
                # Auto select shipping carrier based on shipping option
                shipping_carrier_id=random.choice(shipping_option.shipping_carriers).id,
                shipping_cost=shipping_option.base_price,
                shopping_session_id=cart.id,
                total_cost=cart.total_cost + shipping_option.base_price,
                total_items=cart.total_items,
                payment_status=PaymentStatus.PENDING.value,
            )

            # set order items
            order_items = [
                OrderItem(
                    product_id=cart_item.product.id,
                    order_id=order.id,
                    product_name=cart_item.product.name,
                    price_at_purchase=cart_item.product.price,
                    subtotal=cart_item.product.price * cart_item.quantity,
                    quantity=cart_item.quantity,
                )
                for cart_item in cart.items
                if cart_item.product is not None
            ]
            order.items = order_items
            return order

        def create_order_for_cart():
            # Create Order
            # - Create an order object from the cart
            order_object = create_order_object(cart, shipping_address, payment_method)

            # - Create the order in db
            response = self.order_service.add(order_object)
            if response.success is False:
                logger.exception("Service: Failed to create order.")
                return ServiceResponse(
                    success=False,
                    status_code=response.status_code,
                    errors=response.errors,
                    message=f"Cart Service: Failed to create order: {response.message}",
                )

            return response.data["order"]

        def update_user_cart():
            # Update the cart status to CHECKED_OUT
            self.update_cart_status(cart, CartStatus.CHECKED_OUT)

            # Create new active cart
            add_cart_response = self.add(Cart(user_id=cart.user_id))

            return add_cart_response

        def pay_the_order(order: Order):
            # Payment Process
            payment_response = self.payment_service.process_payment(
                order, payment_method
            )

            if payment_response.success:
                order.payment_status = PaymentStatus.COMPLETED
                order.transaction_id = payment_response.data["payment"]["id"]
            else:
                # Update order payment status
                order.payment_status = PaymentStatus.FAILED
                order.transaction_id = payment_response.data["payment"]["id"]

            return order

        def update_the_order(order: Order):
            order_response = self.order_service.update_order(order_updated)
            if order_response.success is False:
                logger.exception("Service: Failed to update order.")
                return ServiceResponse(
                    success=False,
                    status_code=order_response.status_code,
                    errors=order_response.errors,
                    message=f"Cart Service: Failed to update order after checkout and payment finish: {order_response.message}",
                )

            return order_response.data["order"]

        try:
            # Create Order
            create_order_for_cart_result = create_order_for_cart()
            if isinstance(create_order_for_cart_result, ServiceResponse):
                return create_order_for_cart_result

            order = create_order_for_cart_result

            # Pay the order
            order_updated = pay_the_order(order)
            # Update order in db
            update_the_order_result = update_the_order(order_updated)
            if isinstance(update_the_order_result, ServiceResponse):
                return update_the_order_result

            order_updated = update_the_order_result

            # User cart update
            update_user_cart_response = update_user_cart()
            if update_user_cart_response.success is False:
                logger.exception("Service: Failed to update user cart.")
                return ServiceResponse(
                    success=False,
                    status_code=update_user_cart_response.status_code,
                    errors=update_user_cart_response.errors,
                    message=f"Cart Service: Failed to update user cart after checkout: {update_user_cart_response.message}",
                )

            new_active_cart = update_user_cart_response.data["cart"]

            if order_updated.payment_status == PaymentStatus.FAILED.value:
                return ServiceResponse(
                    success=False,
                    data={
                        "order": order_updated,
                        "cart": new_active_cart,
                    },
                    status_code=400,
                    errors=[CartError.failure("PAYMENT_FAILED", "Payment failed")],
                    message="Checkout completed successfully, but payment failed",
                )

            return ServiceResponse(
                data={
                    "order": order_updated,
                    "cart": new_active_cart,
                },
                message="Checkout completed successfully, payment successfully",
            )
        except CartException as e:
            logger.exception(f"Service: Error creating order: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="Cart Service: Error creating order",
            )
        except Exception as e:
            logger.exception(f"Service: Unexpected error during checkout: {e}")
            return ServiceResponse(
                success=False,
                message="Cart Service: Unexpected error during checkout",
            )

    def is_active_cart(self, cart: Cart) -> bool:
        """
        Check if the cart is active.

        Args:
            cart: Cart object to check.

        Returns:
            bool: True if the cart is active, False otherwise.
        """
        return cart.status == CartStatus.ACTIVE.value

    def is_empty_cart(self, cart: Cart) -> bool:
        """
        Check if the cart is empty.

        Args:
            cart: Cart object to check.

        Returns:
            bool: True if the cart is empty, False otherwise.
        """
        return len(cart.items) == 0
