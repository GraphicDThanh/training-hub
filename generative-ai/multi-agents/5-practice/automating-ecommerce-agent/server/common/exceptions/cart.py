from common.errors.cart import CartErrorCode

from .base import BaseException


class CartException(BaseException):
    """Exception raised for errors cart"""
    def __init__(
            self,
            status_code: int = 500,
            error_code: CartErrorCode = CartErrorCode.INTERNAL_SERVER_ERROR,
            message: str = "Cart API error"
    ):
        super().__init__(status_code, error_code, message)

class CartItemException(BaseException):
    """Exception raised for errors cart item"""
    def __init__(
            self,
            status_code: int = 500,
            error_code: CartErrorCode = CartErrorCode.INTERNAL_SERVER_ERROR,
            message: str = "Cart item API error"
    ):
        super().__init__(status_code, error_code, message)
