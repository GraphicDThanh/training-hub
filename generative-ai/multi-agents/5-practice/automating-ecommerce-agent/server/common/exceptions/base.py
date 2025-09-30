from common.errors.error import ErrorCode


class BaseException(Exception):
    """Base class for all exceptions in this module."""
    def __init__(
            self,
            status_code: int = 500,
            error_code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR,
            message: str = "An error occurred"
        ):
        super().__init__(message)
        self.status_code = status_code
        self.error_code = error_code
        self.message = message



class NotImplementedException(BaseException):
    """Exception raised for not implemented features."""

    def __init__(self, status_code: int = 404, message: str = "Feature not implemented"):
        error_code = ErrorCode.NOT_IMPLEMENTED
        super().__init__(error_code, message)
