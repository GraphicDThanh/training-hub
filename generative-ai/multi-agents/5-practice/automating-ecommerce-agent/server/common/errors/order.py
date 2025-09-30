from .error import Error, ErrorCode, ErrorMessage, ErrorType


class OrderErrorCode(ErrorCode):
    CREATE_FAILED = "create_failed"
    NOT_FOUND = "not_found"
    ORDER_STATUS_NOT_ALLOW_TO_RETURN = "order_status_not_allow_to_return"


class OrderErrorMessage(ErrorMessage):
    CREATE_FAILED = "Failed to create order"
    NOT_FOUND = "Order not found"
    ORDER_STATUS_NOT_ALLOW_TO_RETURN = "Order status not allow to return"


class OrderError(Error):
    @staticmethod
    def create_failed(
        code=OrderErrorCode.CREATE_FAILED,
        message=OrderErrorMessage.CREATE_FAILED,
    ):
        return Error(
            code=code,
            message=message,
            error_type=ErrorType.FAILURE,
        )

    @staticmethod
    def not_found(
        code=OrderErrorCode.NOT_FOUND,
        message=OrderErrorMessage.NOT_FOUND,
    ):
        return Error(
            code=code,
            message=message,
            error_type=ErrorType.FAILURE,
        )

    @staticmethod
    def order_status_not_allow_to_return(
        code=OrderErrorCode.ORDER_STATUS_NOT_ALLOW_TO_RETURN,
        message=OrderErrorMessage.ORDER_STATUS_NOT_ALLOW_TO_RETURN,
    ):
        return Error(
            code=code,
            message=message,
            error_type=ErrorType.VALIDATION,
        )

class OrderItemErrorCode(ErrorCode):
    CREATE_FAILED = "create_failed"


class OrderItemErrorMessage(ErrorMessage):
    CREATE_FAILED = "Failed to create order item"


class OrderItemError(Error):
    @staticmethod
    def create_failed(
        code=OrderErrorCode.CREATE_FAILED,
        message=OrderErrorMessage.CREATE_FAILED,
    ):
        return Error(
            code=code,
            message=message,
            error_type=ErrorType.FAILURE,
        )
