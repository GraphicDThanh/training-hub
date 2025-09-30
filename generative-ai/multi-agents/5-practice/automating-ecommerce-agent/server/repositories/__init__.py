from .auth import AuthRepository
from .cart import CartItemRepository, CartRepository
from .order import OrderItemRepository, OrderRepository, OrderReturnRepository
from .product import ProductRepository
from .shipping import ShippingCarrierRepository, ShippingOptionRepository
from .support_ticket import SupportTicketRepository
from .user import UserRepository

product_repo = ProductRepository()
auth_repo = AuthRepository()
user_repo = UserRepository()
cart_repo = CartRepository()
cart_item_repo = CartItemRepository()
order_return_repo = OrderReturnRepository()
order_repo = OrderRepository()
order_item_repo = OrderItemRepository()
shipping_option_repo = ShippingOptionRepository()
shipping_carrier_repo = ShippingCarrierRepository()
support_ticket_repo = SupportTicketRepository()
