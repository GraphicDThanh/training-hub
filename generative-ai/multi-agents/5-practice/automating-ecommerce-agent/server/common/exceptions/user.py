from .base import BaseException
from common.errors.user import UserErrorCode


class UserException(BaseException):
    """Exception raised for errors user"""
    def __init__(
            self,
            status_code: int = 500,
            error_code: UserErrorCode = UserErrorCode.INTERNAL_SERVER_ERROR,
            message: str = "User API error"
    ):
        super().__init__(status_code, error_code, message)