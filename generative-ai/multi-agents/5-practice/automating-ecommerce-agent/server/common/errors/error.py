class ErrorType:
    FAILURE = 0
    NOT_IMPLEMENTED = 1
    UNAUTHORIZED = 2
    CONFLICT = 3
    VALIDATION = 4
    NOT_FOUND = 5
    FORBIDDEN = 6


class ErrorCode:
    INTERNAL_SERVER_ERROR = "internal_server_error"
    SUPABASE_API_ERROR = "supabase_api_error"
    NOT_IMPLEMENTED = "not_implemented"
    UNAUTHORIZED = "unauthorized"
    CONFLICT = "conflict"
    VALIDATION = "validation"
    NOT_FOUND = "not_found"
    FORBIDDEN = "forbidden"


class ErrorMessage:
    INTERNAL_SERVER_ERROR = "Internal Server Error"
    SUPABASE_API_ERROR = "Supabase API Error"
    NOT_IMPLEMENTED = "Not Implemented"
    UNAUTHORIZED = "Unauthorized"
    CONFLICT = "Conflict"
    VALIDATION = "Validation Error"
    NOT_FOUND = "Not Found"
    FORBIDDEN = "Forbidden"



class Error:
    def __init__(
            self,
            error_type: ErrorType,
            code: ErrorCode,
            message: ErrorMessage
    ):
        self.error_type = error_type
        self.code = code
        self.message = message

    def to_dict(self):
        return {
            "error_type": self.error_type.name,
            "code": self.code.value,
            "message": self.message.value
        }

    @staticmethod
    def failure(
        code: str = ErrorCode.INTERNAL_SERVER_ERROR,
        message: str = ErrorMessage.INTERNAL_SERVER_ERROR
    ):
        return Error(
            error_type=ErrorType.FAILURE,
            code=code,
            message=message
        )

    @staticmethod
    def not_implemented(
        code=ErrorCode.NOT_IMPLEMENTED,
        message=ErrorMessage.NOT_IMPLEMENTED
    ):
        return Error(
            error_type=ErrorType.NOT_IMPLEMENTED,
            code=code,
            message=message
        )

    @staticmethod
    def conflict(
        code=ErrorCode.CONFLICT,
        message=ErrorMessage.CONFLICT
    ):
        return Error(
            error_type=ErrorType.CONFLICT,
            code=code,
            message=message
        )

    @staticmethod
    def unauthorized(
        code=ErrorCode.UNAUTHORIZED,
        message=ErrorMessage.UNAUTHORIZED
    ):
        return Error(
            error_type=ErrorType.UNAUTHORIZED,
            code=code,
            message=message
        )

    @staticmethod
    def forbidden(
        code=ErrorCode.FORBIDDEN,
        message=ErrorMessage.FORBIDDEN
    ):
        return Error(
            error_type=ErrorType.FORBIDDEN,
            code=code,
            message=message
        )

    @staticmethod
    def not_found(
        code=ErrorCode.NOT_FOUND,
        message=ErrorMessage.NOT_FOUND
    ):
        return Error(
            error_type=ErrorType.NOT_FOUND,
            code=code,
            message=message
        )

    @staticmethod
    def validation(
        code=ErrorCode.VALIDATION,
        message=ErrorMessage.VALIDATION
    ):
        return Error(
            error_type=ErrorType.VALIDATION,
            code=code,
            message=message
        )