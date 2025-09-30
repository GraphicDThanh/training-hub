from .error import Error, ErrorCode, ErrorMessage


class AuthErrorCode(ErrorCode):
    # Supabase specific error codes
    SUPABASE_AUTH_INVALID_CREDENTIALS = "invalid_credentials"
    SUPABASE_AUTH_BAD_JWT = "bad_jwt"

    # Our system specific error codes
    SUPABASE_AUTH_ERROR = "supabase_auth_error"
    INVALID_CREDENTIALS = "invalid_credentials"
    INVALID_TOKEN = "invalid_token"


class AuthErrorMessage(ErrorMessage):
    SUPABASE_AUTH_ERROR = "Supabase Authentication API error"
    INVALID_CREDENTIALS = "Invalid credentials"
    INVALID_TOKEN = "Invalid token"


class AuthError(Error):
    @staticmethod
    def supabase_auth_error():
        return Error.failure(
            code=AuthErrorCode.SUPABASE_AUTH_ERROR,
            message=AuthErrorMessage.SUPABASE_AUTH_ERROR,
        )

    @staticmethod
    def invalid_token():
        return Error.unauthorized(
            code=AuthErrorCode.INVALID_TOKEN, message=AuthErrorMessage.INVALID_TOKEN
        )

    @staticmethod
    def invalid_credentials():
        return Error.unauthorized(
            code=AuthErrorCode.INVALID_CREDENTIALS,
            message=AuthErrorMessage.INVALID_CREDENTIALS,
        )

    @staticmethod
    def not_found():
        return Error.not_found(
            code=AuthErrorCode.SUPABASE_AUTH_ERROR, message="User not found"
        )
