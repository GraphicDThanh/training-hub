import logging

from common.config import settings
from common.entities import User
from common.errors.auth import AuthErrorCode
from common.errors.supabase import AuthApiError
from common.exceptions.auth import AuhApiException
from common.types import (
    SupabaseAuthResponse,
    SupabaseAuthSignInWithEmailAndPasswordCredentials,
    SupabaseAuthUserResponse,
)

from supabase import create_client

logger = logging.getLogger(__name__)


class AuthRepository:
    def __init__(
        self,
        supabase_url: str = settings.supabase.API_URL,
        supabase_key: str = settings.supabase.ANON_KEY,
        supabase_key_admin: str = settings.supabase.SERVICE_ROLE_KEY,
    ):
        self.client = create_client(supabase_url, supabase_key)
        self.client_admin = create_client(supabase_url, supabase_key_admin)

    def sign_in_with_password(
        self, credentials: SupabaseAuthSignInWithEmailAndPasswordCredentials
    ) -> SupabaseAuthResponse:
        """
        Authenticate user with email and password

        Args:
            credentials: User's email and password
        Returns:
            User data if authentication is successful
        Raises:
            Exception: If authentication fails
        """
        try:
            return self.client.auth.sign_in_with_password(credentials)
        except AuthApiError as e:
            logger.exception("[%s] Error during login: %s", "Repository", e)
            if e.code == AuthErrorCode.SUPABASE_AUTH_INVALID_CREDENTIALS:
                raise AuhApiException(
                    status_code=e.status,
                    error_code=AuthErrorCode.INVALID_CREDENTIALS,
                    message=e.message,
                )

            raise AuhApiException(
                status_code=e.status,
                error_code=AuthErrorCode.SUPABASE_AUTH_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception("[%s] Error during login: %s", "Repository", e)
            raise AuhApiException(message=str(e))

    def sign_out(self):
        """
        Sign out the current user
        """
        try:
            self.client.auth.sign_out()
        except Exception as e:
            logger.exception("Error during logout: %s", e)
            raise AuhApiException(message=str(e))

    def get_user_by_token(self, token: str):
        """
        Get user by JWT token

        Args:
            token: JWT token
        Returns:
            User data if authentication is successful
        Raises:
            Exception: If authentication fails
        """
        try:
            user_response: SupabaseAuthUserResponse = self.client.auth.get_user(token)
            return (
                User.from_dict(dict(user_response.user)) if user_response.user else None
            )
        except AuthApiError as e:
            logger.exception("[%s] Error during login: %s", "Repository", e)
            if e.code == AuthErrorCode.SUPABASE_AUTH_BAD_JWT:
                raise AuhApiException(
                    status_code=e.status,
                    error_code=AuthErrorCode.INVALID_TOKEN,
                    message=e.message,
                )

            raise AuhApiException(
                status_code=e.status,
                error_code=AuthErrorCode.SUPABASE_AUTH_ERROR,
                message=e.message,
            )

    def get_user_by_email(self, email: str) -> SupabaseAuthResponse:
        """
        Get user by email

        Args:
            email: User's email
        Returns:
            User data if found
        Raises:
            Exception: If user is not found
        """
        try:
            # As supabase not support searching by email, we need to list all users and go through pages to find the user
            page = 1
            per_page = 100

            while True:
                users = self.client_admin.auth.admin.list_users(
                    page=page, per_page=per_page
                )
                if not users:
                    break

                for user in users:
                    if user.email == email:
                        return user

                page += 1

            return None
        except AuthApiError as e:
            logger.exception("[%s] Error during get user by email: %s", "Repository", e)
            raise AuhApiException(message=str(e))

    def get_user_by_id(self, user_id: str) -> SupabaseAuthResponse:
        """
        Get user by ID

        Args:
            user_id: User's ID
        Returns:
            User data if found
        Raises:
            Exception: If user is not found
        """
        try:
            user_response: SupabaseAuthUserResponse = (
                self.client_admin.auth.admin.get_user_by_id(user_id)
            )
            return (
                User.from_dict(dict(user_response.user)) if user_response.user else None
            )
        except AuthApiError as e:
            logger.exception("[%s] Error during get user by id: %s", "Repository", e)
            raise AuhApiException(message=str(e))

    def admin_create_user(
        self, credentials: SupabaseAuthSignInWithEmailAndPasswordCredentials
    ) -> SupabaseAuthResponse:
        """
        Create a new user with email and password

        Args:
            credentials: User's email and password
        Returns:
            User data if creation is successful
        Raises:
            Exception: If creation fails
        """
        try:
            response = self.client_admin.auth.admin.create_user(
                {
                    "email": credentials["email"],
                    "password": credentials["password"],
                    "email_confirm": True,
                }
            )

            return User.from_dict(dict(response.user)) if response.user else None
        except AuthApiError as e:
            logger.exception("[%s] Error during create user: %s", "Repository", e)
            raise AuhApiException(message=str(e))

    def delete_user(self, user_id: str) -> SupabaseAuthResponse:
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
            return self.client_admin.auth.admin.delete_user(user_id)
        except AuthApiError as e:
            logger.exception("[%s] Error during delete user: %s", "Repository", e)
            raise AuhApiException(message=str(e))

    def set_user_session(self, access_token: str, refresh_token: str):
        """
        Set user session with access token
        Args:
            access_token: Access token
        """
        try:
            self.client.auth.set_session(access_token, refresh_token)
        except AuthApiError as e:
            logger.exception("[%s] Error during set user session: %s", "Repository", e)
            raise AuhApiException(message=str(e))
