import logging

from common.constants import StatusCode
from common.entities import PaymentMethod, ShippingAddress, SupportTicket
from common.errors.cart import CartError
from common.exceptions.user import UserException
from common.types.response import ServiceResponse
from repositories.support_ticket import SupportTicketRepository
from repositories.user import UserRepository

logger = logging.getLogger(__name__)


class UserService:
    """
    A service class for managing user-related operations
    such as shipping addresses, payment methods, and support tickets.

    This service acts as an intermediary between the API layer and the data repositories,
    handling business logic and providing consistent response formats.

    Attributes:
        user_repo (UserRepository): Repository for user-related database operations
        support_ticket (SupportTicketRepository): Repository for support ticket operations

    Methods:
        get_shipping_address(user_id: str) -> ServiceResponse:
            Retrieves a user's shipping address from the repository.

        get_payment_method(user_id: str) -> ServiceResponse:
            Retrieves a user's payment method from the repository.

        create_support_ticket(support_ticket: SupportTicket) -> ServiceResponse:
            Creates a new support ticket in the system.

        create_shipping_address(shipping_address: ShippingAddress) -> ServiceResponse:
            Creates a new shipping address for a user.

        create_payment_method(payment_method: PaymentMethod) -> ServiceResponse:
            Creates a new payment method for a user.

    Returns:
        All methods return a ServiceResponse object containing:
            - success: Boolean indicating operation success
            - status_code: HTTP status code
            - data: Response data (if successful)
            - errors: List of errors (if unsuccessful)
            - message: Human-readable status message

    Raises:
        UserException: When user-related operations fail
        Exception: For unexpected errors during support ticket creation
    """

    def __init__(
        self, user_repo: UserRepository, support_ticket: SupportTicketRepository
    ):
        self.user_repo = user_repo
        self.support_ticket = support_ticket

    def get_user_by_id(self, user_id: str) -> ServiceResponse:
        """
        Get user by id

        Args:
            user_id (str): user id

        Returns:
            ServiceResponse: response
        """

        try:
            data = self.user_repo.get(user_id)
            return ServiceResponse(
                success=True,
                status_code=StatusCode.OK,
                data={"user": data},
                message="User Service: user fetched successfully",
            )
        except UserException as e:
            print(f"Service: Error fetching user by id: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="User Service: error fetching user by id",
            )

    def get_shipping_address(self, user_id: str) -> ServiceResponse:
        """
        Get the user's shipping address.
        """
        try:
            data = self.user_repo.get_shipping_address(user_id)
            return ServiceResponse(
                success=True,
                status_code=StatusCode.OK,
                data={"shipping_address": data},
                message="User Service: shipping address fetched successfully",
            )
        except UserException as e:
            print(f"Service: Error fetching shipping address: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="User Service: error fetching shipping address",
            )

    def get_payment_method(self, user_id: str) -> ServiceResponse:
        """
        Get the user's payment method.
        """
        try:
            data = self.user_repo.get_payment_method(user_id)
        except UserException as e:
            print(f"Service: Error fetching payment method: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="User Service: error fetching payment method",
            )

        return ServiceResponse(
            success=True,
            status_code=StatusCode.OK,
            data={"payment_method": data},
            message="User Service: payment method fetched successfully",
        )

    def create_support_ticket(self, support_ticket: SupportTicket) -> ServiceResponse:
        """
        Create a support ticket.
        """
        try:
            data = self.user_repo.create_support_ticket(support_ticket)
            if not data:
                logger.exception("Service: Failed to create support ticket.")
                return ServiceResponse(
                    success=False,
                    status_code=500,
                    errors=[],
                    message="User Service: create support ticket return empty",
                )

            return ServiceResponse(
                data={"support_ticket": data},
                message="User Service: support ticket created successfully",
            )

        except UserException as e:
            print(f"Service: Error creating support ticket: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="User Service: error creating support ticket",
            )
        except Exception as e:
            logger.exception(f"Service: Error creating support ticket: {e}")
            return ServiceResponse(
                success=False,
                status_code=500,
                errors=[],
                message="User Service: error creating support ticket",
            )

    def create_shipping_address(
        self, shipping_address: ShippingAddress
    ) -> ServiceResponse:
        """
        Create a shipping address for the user.
        """
        try:
            data = self.user_repo.create_shipping_address(shipping_address)
            return ServiceResponse(
                success=True,
                status_code=StatusCode.OK,
                data={"shipping_address": data},
                message="User Service: shipping address created successfully",
            )
        except UserException as e:
            print(f"Service: Error creating shipping address: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="User Service: error creating shipping address",
            )

    def create_payment_method(self, payment_method: PaymentMethod) -> ServiceResponse:
        """
        Create a payment method for the user.
        """
        try:
            data = self.user_repo.create_payment_method(payment_method)
            return ServiceResponse(
                success=True,
                status_code=StatusCode.OK,
                data={"payment_method": data},
                message="User Service: payment method created successfully",
            )
        except UserException as e:
            print(f"Service: Error creating payment method: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[CartError.failure(e.error_code, e.message)],
                message="User Service: error creating payment method",
            )
