import logging
from typing import Optional

from common.config import settings
from common.constants import DatabaseTable, StatusCode
from common.entities import (
    PaymentMethod,
    PaymentOption,
    ShippingAddress,
    SupportTicket,
    User,
)
from common.errors.supabase import APIError
from common.errors.user import UserErrorCode
from common.exceptions.user import UserException

from .base import Repository

logger = logging.getLogger(__name__)


class UserRepository(Repository[User]):
    def __init__(self):
        super().__init__(supabase_key=settings.supabase.SERVICE_ROLE_KEY)
        self.USERS = DatabaseTable.USERS.value
        self.SHIPPING_ADDRESSES = DatabaseTable.SHIPPING_ADDRESSES.value
        self.PAYMENT_METHODS = DatabaseTable.PAYMENT_METHODS.value
        self.PAYMENT_OPTIONS = DatabaseTable.PAYMENT_OPTIONS.value
        self.SUPPORT_TICKETS = DatabaseTable.SUPPORT_TICKETS.value

    def get(self, id: str) -> User:
        raise NotImplementedError("Get operation is not implemented for users.")

    def add(self) -> None:
        raise NotImplementedError("Delete operation is not implemented for users.")

    def delete(self, id: str) -> None:
        raise NotImplementedError("Delete operation is not implemented for users.")

    def update(self, item: User) -> None:
        raise NotImplementedError("Update operation is not implemented for users.")

    def get_all(self) -> list[User]:
        raise NotImplementedError("Get all operation is not implemented for users.")

    def get_shipping_address(self, user_id: str) -> ShippingAddress:
        try:
            response = (
                self.client.table(self.SHIPPING_ADDRESSES)
                .select("*")
                .eq("user_id", user_id)
                .eq("is_default", True)
                .execute()
            )
            # Get first item if exists
            first_record = response.data[0] if response.data else None
            if first_record:
                return ShippingAddress.from_dict(first_record)
            return None
        except APIError as api_e:
            raise UserException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=UserErrorCode.SUPABASE_API_ERROR,
                message=api_e.message,
            ) from api_e
        except Exception as e:
            raise UserException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=UserErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            ) from e

    def get_payment_method(self, user_id: str) -> Optional[PaymentMethod]:
        try:
            payment_method_response = (
                self.client.table(self.PAYMENT_METHODS)
                .select("*")
                .eq("user_id", user_id)
                .eq("is_default", True)
                .limit(1)
                .execute()
            )

            if not payment_method_response.data:
                return None

            # Get first item if exists
            payment_method = PaymentMethod.from_dict(payment_method_response.data[0])
            payment_option_response = (
                self.client.table(self.PAYMENT_OPTIONS)
                .select("*")
                .eq("id", payment_method.payment_option_id)
                .limit(1)
                .execute()
            )

            # Attach payment option to the payment method
            payment_method.payment_option = (
                PaymentOption.from_dict(payment_option_response.data[0])
                if payment_option_response.data
                else None
            )

            return payment_method
        except APIError as e:
            raise UserException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=UserErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            ) from e
        except Exception as e:
            raise UserException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=UserErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            ) from e

    def create_support_ticket(self, support_ticket: SupportTicket) -> None:
        try:
            response = (
                self.client.table(self.SUPPORT_TICKETS)
                .insert(support_ticket.db_model_data())
                .execute()
            )
            return SupportTicket.from_dict(response.data[0]) if response.data else None
        except APIError as e:
            logger.exception(
                "[%s] Error during add support ticket: %s", "Repository", e
            )
            raise UserException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=UserErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            ) from e
        except Exception as e:
            logger.exception(
                "[%s] Error during add support ticket: %s", "Repository", e
            )
            raise UserException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=UserErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            ) from e

    def create_shipping_address(
        self, shipping_address: ShippingAddress
    ) -> ShippingAddress:
        try:
            response = (
                self.client.table(self.SHIPPING_ADDRESSES)
                .insert(shipping_address.db_model_data())
                .execute()
            )
            return (
                ShippingAddress.from_dict(response.data[0]) if response.data else None
            )
        except APIError as e:
            logger.exception(
                "[%s] Error during add shipping address: %s", "Repository", e
            )
            raise UserException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=UserErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            ) from e
        except Exception as e:
            logger.exception(
                "[%s] Error during add shipping address: %s", "Repository", e
            )
            raise UserException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=UserErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            ) from e

    def create_payment_method(self, payment_method: PaymentMethod) -> PaymentMethod:
        try:
            response = (
                self.client.table(self.PAYMENT_METHODS)
                .insert(payment_method.db_model_data())
                .execute()
            )
            return PaymentMethod.from_dict(response.data[0]) if response.data else None
        except APIError as e:
            logger.exception(
                "[%s] Error during add payment method: %s", "Repository", e
            )
            raise UserException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=UserErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            ) from e
        except Exception as e:
            logger.exception(
                "[%s] Error during add payment method: %s", "Repository", e
            )
            raise UserException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=UserErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            ) from e
