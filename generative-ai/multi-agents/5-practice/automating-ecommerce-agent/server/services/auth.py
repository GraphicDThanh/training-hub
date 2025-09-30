from typing import Any, Dict, Optional

from common.config import settings
from common.entities import User
from common.errors.auth import AuthError, AuthErrorCode
from common.exceptions.auth import AuhApiException
from common.types import (
    SupabaseAuthSignInWithEmailAndPasswordCredentials,
    SupabaseAuthUserResponse,
)
from common.types.response import ServiceResponse
from repositories.auth import AuthRepository


class AuthService:
    def __init__(self, auth_repository: AuthRepository):
        self.repository = auth_repository

    def login(
        self, credentials: SupabaseAuthSignInWithEmailAndPasswordCredentials
    ) -> ServiceResponse:
        """
        Authenticate user with email and password

        Args:
            email: User's email
            password: User's password

        Returns:
            User data if authentication is successful

        Raises:
            Exception: If authentication fails
        """
        try:
            response: SupabaseAuthUserResponse = self.repository.sign_in_with_password(
                credentials
            )

            if not response or not response.user or not response.session:
                return ServiceResponse(
                    success=False,
                    status_code=400,
                    errors=[AuthError.validation("Invalid login response")],
                    message="Auth Service: Invalid login response",
                )

            # Set session
            self.repository.set_user_session(
                access_token=response.session.access_token,
                refresh_token=response.session.refresh_token,
            )

            # Set user data
            data = {
                "user": {
                    "id": response.user.id,
                    "email": response.user.email,
                },
                "session": {
                    "access_token": response.session.access_token,
                    "refresh_token": response.session.refresh_token,
                    "expires_at": response.session.expires_at,
                },
            }
            return ServiceResponse(data=data, message="Login successful")

        except AuhApiException as e:
            if e.error_code == AuthErrorCode.INVALID_CREDENTIALS:
                return ServiceResponse(
                    success=False,
                    status_code=e.status_code,
                    errors=[AuthError.invalid_credentials()],
                    message="Invalid credentials",
                )

            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[AuthError.supabase_auth_error()],
                message="Authentication API error",
            )

    def logout(self) -> ServiceResponse:
        """
        Sign out the current user

        Raises:
            Exception: If sign out fails
        """
        try:
            self.repository.sign_out()
        except AuhApiException as e:
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[AuthError.supabase_auth_error()],
                message="Authentication API error",
            )

    def get_user_by_token(self, token: str) -> Optional[Dict[str, Any]]:
        """
        Get user data from JWT token

        Args:
            token: JWT token to verify

        Returns:
            User data if token is valid

        Raises:
            Exception: If token is invalid
        """
        try:
            user: User = self.repository.get_user_by_token(token)
            data = {
                "user": user,
            }
            return ServiceResponse(data=data)
        except AuhApiException as e:
            if e.error_code == AuthErrorCode.INVALID_TOKEN:
                return ServiceResponse(
                    success=False,
                    status_code=e.status_code,
                    errors=[AuthError.invalid_token()],
                    message="Invalid jwt token",
                )

            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[AuthError.supabase_auth_error()],
                message="Authentication API error",
            )

    def get_user_by_email(self, email: str) -> ServiceResponse:
        """
        Get user data by email

        Args:
            email: User's email

        Returns:
            User data if found

        Raises:
            Exception: If user is not found
        """
        try:
            user = self.repository.get_user_by_email(email)
            data = {
                "user": user,
            }
            return ServiceResponse(data=data)

        except AuhApiException as e:
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[AuthError.supabase_auth_error()],
                message="Authentication API error",
            )

    def get_user_by_id(self, user_id: str) -> ServiceResponse:
        """
        Get user data by ID

        Args:
            user_id: User's ID

        Returns:
            User data if found

        Raises:
            Exception: If user is not found
        """
        try:
            user = self.repository.get_user_by_id(user_id)
            if not user:
                return ServiceResponse(
                    success=False,
                    status_code=404,
                    errors=[AuthError.not_found()],
                    message="User not found",
                )

            data = {
                "user": user,
            }
            return ServiceResponse(data=data)

        except AuhApiException as e:
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[AuthError.supabase_auth_error()],
                message="Authentication API error",
            )

    def admin_create_user(self, email: str, password: str) -> ServiceResponse:
        """
        Create a new user

        Args:
            email: User's email
            password: User's password

        Returns:
            User data if creation is successful

        Raises:
            Exception: If creation fails
        """
        try:
            response = self.repository.admin_create_user(
                {
                    "email": email,
                    "password": password,
                }
            )
            if not response:
                return ServiceResponse(
                    success=False,
                    status_code=400,
                    errors=[AuthError.validation("Invalid create user response")],
                    message="Auth Service: Invalid create user response",
                )

            data = {"user": response}
            return ServiceResponse(data=data, message="User created successfully")

        except AuhApiException as e:
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[AuthError.supabase_auth_error()],
                message="Authentication API error",
            )

    def get_or_create_user(
        self, email: str, password: str = settings.eval.USER_PASSWORD
    ) -> ServiceResponse:
        # Get user by email
        response = self.get_user_by_email(email=email)
        if not response.success:
            return response

        # If user exists, return user
        if response.success and response.data["user"]:
            return ServiceResponse(data=response.data["user"], message="User exists.")

        # If user does not exist, create a new user
        response = self.admin_create_user(email=email, password=password)
        if not response.success:
            return response

        return ServiceResponse(data=response.data, message="User created successfully.")

    def delete_user(self, user_id: str) -> ServiceResponse:
        """
        Delete a user by ID
        Args:
            user_id: User's ID
        Returns:
            User data if deletion is successful
        Raises:
            Exception: If deletion fails
        """
        try:
            self.repository.delete_user(user_id)
            return ServiceResponse(message="User deleted successfully")

        except AuhApiException as e:
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[AuthError.supabase_auth_error()],
                message="Authentication API error",
            )
