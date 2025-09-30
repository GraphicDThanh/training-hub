from .error import Error, ErrorCode, ErrorMessage, ErrorType


class CartErrorCode(ErrorCode):
    EMPTY_CART = "empty_cart"
    INACTIVE_CART = "inactive_cart"

class CartErrorMessage(ErrorMessage):
    EMPTY_CART = "Cart is empty."
    INACTIVE_CART = "Cart is not active."


class CartError(Error):

    @staticmethod
    def inactive_cart(
        code=CartErrorCode.INACTIVE_CART,
        message=CartErrorMessage.INACTIVE_CART
    ):
        return Error(
            error_type=ErrorType.VALIDATION,
            code=code,
            message=message
        )

    @staticmethod
    def clear_cart_empty(
        code=CartErrorCode.EMPTY_CART,
        message=CartErrorMessage.EMPTY_CART
    ):
        return Error(
            error_type=ErrorType.VALIDATION,
            code=code,
            message=message
        )

