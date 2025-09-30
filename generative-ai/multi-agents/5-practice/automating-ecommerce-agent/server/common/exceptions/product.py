from common.errors.product import ProductErrorCode

from .base import BaseException


class ProductException(BaseException):
    """Exception raised for errors product"""

    def __init__(
        self,
        status_code: int = 500,
        error_code: ProductErrorCode = ProductErrorCode.INTERNAL_SERVER_ERROR,
        message: str = "Product API error",
    ):
        super().__init__(status_code, error_code, message)
