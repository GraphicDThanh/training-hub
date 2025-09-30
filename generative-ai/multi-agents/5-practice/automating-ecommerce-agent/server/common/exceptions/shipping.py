from common.errors.shipping import ShippingErrorCode

from .base import BaseException


class ShippingException(BaseException):
    """Exception raised for errors shipping"""

    def __init__(
        self,
        status_code: int = 500,
        error_code: ShippingErrorCode = ShippingErrorCode.INTERNAL_SERVER_ERROR,
        message: str = "Shipping API error",
    ):
        super().__init__(status_code, error_code, message)
