from enum import Enum
from typing import Optional


class DatabaseTable(str, Enum):
    """
    Database table names used throughout the application.
    Using str, Enum allows string comparison while maintaining type safety.
    """

    # Product related tables
    PRODUCTS = "products"
    CATEGORIES = "categories"
    SUPPORT_TICKETS = "support_tickets"

    # User related tables
    USERS = "auth.users"
    SHIPPING_ADDRESSES = "shipping_addresses"
    PAYMENT_METHODS = "payment_methods"

    # Cart related tables
    CARTS = "shopping_sessions"
    CART_ITEMS = "shopping_session_items"

    # Order related tables
    ORDERS = "orders"
    ORDER_ITEMS = "order_items"
    ORDER_RETURNS = "order_returns"

    # Shipping and payment related tables
    SHIPPING_OPTIONS = "shipping_options"
    SHIPPING_CARRIERS = "shipping_carriers"
    SHIPPING_OPTION_CARRIERS = "shipping_option_carriers"
    PAYMENT_OPTIONS = "payment_options"

    @classmethod
    def get_table_name(cls, table: Optional["DatabaseTable"]) -> str:
        """Helper method to safely get table name as string"""
        return table.value if table else None
