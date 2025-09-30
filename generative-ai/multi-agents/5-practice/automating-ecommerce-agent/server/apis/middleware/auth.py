import logging

from common.types.response import ServiceResponse
from common.utils import get_response_errors
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from services import auth_service

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


async def auth_middleware(request: Request, call_next):
    """
    Middleware to handle authentication for FastAPI application.
    This middleware checks for the presence of an authentication token in the request headers and sets the user to the request state.
    It does not raise an error if the token is not present.
    """
    request.state.user = None

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        logging.info("No token provided, skipping authentication.")
        return await call_next(request)

    token = auth_header.replace("Bearer ", "")

    response: ServiceResponse = auth_service.get_user_by_token(token)

    # Token verification failed
    if response.success is False:
        logging.error(f"Token verification failed: {response.message}")
        return JSONResponse(
            content={
                "status": "error",
                "message": response.message,
                "errors": get_response_errors(response),
            },
            status_code=401,
        )

    # User is successfully verified -> go ahead
    request.state.user = response.data["user"]
    return await call_next(request)
