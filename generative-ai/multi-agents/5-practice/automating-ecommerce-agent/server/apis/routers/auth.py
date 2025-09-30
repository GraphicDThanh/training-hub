import logging

from common.types import SupabaseAuthSignInWithEmailAndPasswordCredentials
from common.types.response import ServiceResponse
from common.utils import get_response_errors
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from services import auth_service

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login")
def login(data: SupabaseAuthSignInWithEmailAndPasswordCredentials) -> JSONResponse:
    response: ServiceResponse = auth_service.login(data)

    if response.success:
        return JSONResponse(
            status_code=response.status_code,
            content={
                "status": "success",
                "message": response.message,
                "data": response.data,
            },
        )

    return JSONResponse(
        status_code=response.status_code,
        content={
            "status": "error",
            "message": response.message,
            "errors": get_response_errors(response),
        },
    )


@router.post("/logout")
def logout():
    try:
        auth_service.logout()
        return JSONResponse(
            content={"status": "success", "message": "Logged out successfully"},
            status_code=200,
        )
    except Exception as e:
        logging.error(f"Logout failed: {e}")
        return JSONResponse(
            content={
                "status": "error",
                "message": "Logout failed",
            },
            status_code=500,
        )
