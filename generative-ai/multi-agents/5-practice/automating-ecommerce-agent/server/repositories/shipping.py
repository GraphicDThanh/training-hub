import logging

from common.config import settings
from common.constants import DatabaseTable
from common.constants import StatusCode
from common.entities import ShippingCarrier, ShippingOption
from common.errors.shipping import ShippingErrorCode
from common.errors.supabase import APIError
from common.exceptions.shipping import ShippingException

from .base import Repository

logger = logging.getLogger(__name__)


class ShippingCarrierRepository(Repository[ShippingCarrier]):
    def __init__(self):
        super().__init__(supabase_key=settings.supabase.SERVICE_ROLE_KEY)
        self.SHIPPING_CARRIERS = DatabaseTable.SHIPPING_CARRIERS.value
        self.SHIPPING_OPTION_CARRIERS = DatabaseTable.SHIPPING_OPTION_CARRIERS.value

    def get(self, id: str) -> ShippingCarrier:
        """
        Fetch a shipping carrier by its ID.

        Args:
            id (str): The ID of the shipping carrier.

        Returns:
            ShippingCarrier: The shipping carrier with the specified ID.
        """
        try:
            response = (
                self.client.table(self.SHIPPING_CARRIERS)
                .select("*")
                .eq("id", id)
                .execute()
            )
            return (
                ShippingCarrier.from_dict(response.data[0]) if response.data else None
            )
        except APIError as e:
            logger.exception(
                "[%s] Error during get shipping carrier: %s", "Repository", e
            )
            raise ShippingException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=ShippingErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception(
                "[%s] Error during get shipping carrier: %s", "Repository", e
            )
            raise ShippingException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=ShippingErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )

    def get_all(self) -> list[ShippingCarrier]:
        raise NotImplementedError(
            "Get all operation is not implemented for shipping options."
        )

    def add(self, item: ShippingCarrier) -> None:
        raise NotImplementedError("Add operation is not implemented for products.")

    def update(self, item: ShippingCarrier) -> None:
        raise NotImplementedError("Update operation is not implemented for products.")

    def delete(self, id: int) -> None:
        raise NotImplementedError("Delete operation is not implemented for products.")

    def get_by_shipping_option(self, shipping_option_id: str) -> list[ShippingCarrier]:
        """
        Fetch all shipping carriers for a given shipping option ID.

        Args:
            shipping_option_id (str): The ID of the shipping option.

        Returns:
            list[ShippingCarrier]: A list of all shipping carriers for the given shipping option.
        """
        try:
            # Fetch the shipping option carriers relation
            # to get the shipping carrier IDs
            response_shipping_option_carriers = (
                self.client.table(self.SHIPPING_OPTION_CARRIERS)
                .select("*")
                .eq("shipping_option_id", shipping_option_id)
                .execute()
            )
            if not response_shipping_option_carriers.data:
                raise ShippingException(
                    status_code=StatusCode.NOT_FOUND,
                    error_code=ShippingErrorCode.MISSING_SHIPPING_CARRIERS_BY_SHIPPING_OPTION,
                    message="No shipping option carriers relation found for the given shipping option.",
                )

            # Fetch the shipping carriers using the IDs from the relation
            response_shipping_carriers = (
                self.client.table(self.SHIPPING_CARRIERS)
                .select("*")
                .in_(
                    "id",
                    [
                        carrier["shipping_carrier_id"]
                        for carrier in response_shipping_option_carriers.data
                    ],
                )
                .execute()
            )
            return [
                ShippingCarrier.from_dict(carrier_data)
                for carrier_data in response_shipping_carriers.data
            ]
        except APIError as e:
            logger.exception(
                "[%s] Error during get shipping carriers: %s", "Repository", e
            )
            raise ShippingException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=ShippingErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception(
                "[%s] Error during get shipping carriers: %s", "Repository", e
            )
            raise ShippingException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=ShippingErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )


class ShippingOptionRepository(Repository[ShippingOption]):
    def __init__(self):
        super().__init__(supabase_key=settings.supabase.SERVICE_ROLE_KEY)
        self.SHIPPING_OPTIONS = DatabaseTable.SHIPPING_OPTIONS.value

    def get(self, id: str) -> ShippingOption:
        """
        Fetch a shipping option by its ID.

        Args:
            id (str): The ID of the shipping option.

        Returns:
            ShippingOption: The shipping option with the specified ID.
        """
        try:
            response = (
                self.client.table(self.SHIPPING_OPTIONS)
                .select("*")
                .eq("id", id)
                .execute()
            )
            return ShippingOption.from_dict(response.data[0]) if response.data else None
        except APIError as e:
            logger.exception(
                "[%s] Error during get shipping option: %s", "Repository", e
            )
            raise ShippingException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=ShippingErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception(
                "[%s] Error during get shipping option: %s", "Repository", e
            )
            raise ShippingException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=ShippingErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )

    def get_all(self) -> list[ShippingOption]:
        """
        Fetch all shipping options from the database.

        Returns:
            list[ShippingOption]: A list of all shipping options.
        """
        try:
            response = self.client.table(self.SHIPPING_OPTIONS).select("*").execute()
            if not response.data:
                raise ShippingException(
                    status_code=StatusCode.NOT_FOUND,
                    error_code=ShippingErrorCode.MISSING_SHIPPING_OPTIONS,
                    message="No shipping options found.",
                )

            return [
                ShippingOption.from_dict(option_data) for option_data in response.data
            ]
        except APIError as e:
            logger.exception(
                "[%s] Error during get shipping options: %s", "Repository", e
            )
            raise ShippingException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=ShippingErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception(
                "[%s] Error during get shipping options: %s", "Repository", e
            )
            raise ShippingException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=ShippingErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )

    def add(self, item: ShippingOption) -> None:
        raise NotImplementedError("Add operation is not implemented for products.")

    def update(self, item: ShippingOption) -> None:
        raise NotImplementedError("Update operation is not implemented for products.")

    def delete(self, id: int) -> None:
        raise NotImplementedError("Delete operation is not implemented for products.")

    def get_by_name(self, name: str) -> ShippingOption:
        """
        Fetch a shipping option by its name.

        Args:
            name (str): The name of the shipping option.

        Returns:
            ShippingOption: The shipping option with the specified name.
        """
        try:
            response = (
                self.client.table(self.SHIPPING_OPTIONS)
                .select("*")
                .eq("name", name)
                .execute()
            )
            if not response.data:
                raise ShippingException(
                    status_code=StatusCode.NOT_FOUND,
                    error_code=ShippingErrorCode.INVALID_SHIPPING_OPTION_NAME,
                    message="No shipping option found with the given name.",
                )

            return ShippingOption.from_dict(response.data[0])
        except APIError as e:
            logger.exception(
                "[%s] Error during get shipping option by name: %s", "Repository", e
            )
            raise ShippingException(
                status_code=StatusCode.SUPABASE_API_ERROR,
                error_code=ShippingErrorCode.SUPABASE_API_ERROR,
                message=e.message,
            )
        except Exception as e:
            logger.exception(
                "[%s] Error during get shipping option by name: %s", "Repository", e
            )
            raise ShippingException(
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                error_code=ShippingErrorCode.INTERNAL_SERVER_ERROR,
                message=str(e),
            )
