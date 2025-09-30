from .base import BaseException
from common.errors.auth import AuthErrorCode


class AuhApiException(BaseException):
    """Exception raised for authentication API errors."""
    def __init__(
            self,
            status_code: int = 500,
            error_code: AuthErrorCode = AuthErrorCode.SUPABASE_AUTH_ERROR,
            message: str = "Supabase Authentication API error"
    ):
        super().__init__(status_code, error_code, message)