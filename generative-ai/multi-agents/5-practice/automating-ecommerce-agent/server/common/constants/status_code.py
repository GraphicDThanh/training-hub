from enum import IntEnum


class StatusCode(IntEnum):
    # Success codes
    OK = 200
    CREATED = 201
    NO_CONTENT = 204

    # Client error codes
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    FORBIDDEN = 403
    NOT_FOUND = 404
    CONFLICT = 409

    # Server error codes
    INTERNAL_SERVER_ERROR = 500
    SUPABASE_API_ERROR = 500
