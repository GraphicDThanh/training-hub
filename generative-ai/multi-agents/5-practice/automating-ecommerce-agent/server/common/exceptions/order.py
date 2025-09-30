from common.errors.order import OrderErrorCode

from .base import BaseException


class OrderException(BaseException):
    """Exception raised for errors order"""
    def __init__(
            self,
            status_code: int = 500,
            error_code: OrderErrorCode = OrderErrorCode.INTERNAL_SERVER_ERROR,
            message: str = "Order API error"
    ):
        super().__init__(status_code, error_code, message)


class OrderItemException(BaseException):
    """Exception raised for errors order item"""
    def __init__(
            self,
            status_code: int = 500,
            error_code: OrderErrorCode = OrderErrorCode.INTERNAL_SERVER_ERROR,
            message: str = "Order item API error"
    ):
        super().__init__(status_code, error_code, message)
