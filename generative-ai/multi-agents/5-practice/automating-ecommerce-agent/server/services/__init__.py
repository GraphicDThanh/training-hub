from repositories import (
    auth_repo,
    cart_item_repo,
    cart_repo,
    order_item_repo,
    order_repo,
    order_return_repo,
    product_repo,
    shipping_carrier_repo,
    shipping_option_repo,
    user_repo,
    support_ticket_repo,
)

from .auth import AuthService
from .cart import CartService
from .order import OrderService
from .shipping import ShippingService
from .user import UserService
from .product import ProductService
from .payment import PaymentService


shipping_service = ShippingService(shipping_option_repo, shipping_carrier_repo)
product_service = ProductService(product_repo)
auth_service = AuthService(auth_repo)
user_service = UserService(user_repo, support_ticket_repo)
order_service = OrderService(order_repo, order_item_repo, order_return_repo, shipping_service, user_service)
payment_service = PaymentService()
cart_service = CartService(
    cart_repo, cart_item_repo, order_repo, product_repo,
    order_service, payment_service
)
