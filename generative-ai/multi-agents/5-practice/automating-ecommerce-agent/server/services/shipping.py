from common.constants import StatusCode
from common.entities import ShippingOption
from common.errors.shipping import ShippingError
from common.exceptions.shipping import ShippingException
from common.types.response import ServiceResponse
from repositories.shipping import ShippingCarrierRepository, ShippingOptionRepository


class ShippingService:
    def __init__(
        self,
        shipping_option_repo: ShippingOptionRepository,
        shipping_carrier_repo: ShippingCarrierRepository,
    ):
        self.shipping_option_repo = shipping_option_repo
        self.shipping_carrier_repo = shipping_carrier_repo

    def get_shipping_options(self) -> ServiceResponse:
        """
        Get all shipping options and their associated shipping carriers.

        Returns:
            ServiceResponse: Response containing shipping options.
        """
        try:
            shipping_options: list[ShippingOption] = self.shipping_option_repo.get_all()

            for shipping_option in shipping_options:
                shipping_carriers = self.shipping_carrier_repo.get_by_shipping_option(
                    shipping_option.id
                )
                shipping_option.shipping_carriers = shipping_carriers

            return ServiceResponse(
                success=True,
                status_code=StatusCode.OK,
                data={"shipping_options": shipping_options},
                message="Shipping Service: shipping options fetched successfully",
            )
        except ShippingException as e:
            print(f"Service: Error fetching shipping options: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[ShippingError.failure(e.error_code, e.message)],
                message="Shipping Service: error fetching shipping options",
            )
        except Exception as e:
            print(f"Service: Error fetching shipping options: {e}")
            return ServiceResponse(
                success=False,
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                errors=[ShippingError.failure()],
                message="Shipping Service: error fetching shipping options",
            )

    def get_shipping_option_by_name(self, name: str) -> ServiceResponse:
        """
        Get a shipping option by its name.

        Args:
            name (str): The name of the shipping option.

        Returns:
            ServiceResponse: Response containing the shipping option.
        """
        try:
            shipping_option = self.shipping_option_repo.get_by_name(name)
            return ServiceResponse(
                success=True,
                status_code=StatusCode.OK,
                data={"shipping_option": shipping_option},
                message="Shipping Service: shipping option fetched successfully",
            )
        except ShippingException as e:
            print(f"Service: Error fetching shipping option by name: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[ShippingError.failure(e.error_code, e.message)],
                message="Shipping Service: error fetching shipping option by name",
            )
        except Exception as e:
            print(f"Service: Error fetching shipping option by name: {e}")
            return ServiceResponse(
                success=False,
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                errors=[ShippingError.failure()],
                message="Shipping Service: error fetching shipping option by name",
            )

    def get_shipping_option_by_id(self, shipping_option_id: str) -> ServiceResponse:
        """
        Get a shipping option by its ID.

        Args:
            shipping_option_id (str): The ID of the shipping option.

        Returns:
            ServiceResponse: Response containing the shipping option.
        """
        try:
            shipping_option = self.shipping_option_repo.get(shipping_option_id)
            return ServiceResponse(
                success=True,
                status_code=StatusCode.OK,
                data={"shipping_option": shipping_option},
                message="Shipping Service: shipping option fetched successfully",
            )
        except ShippingException as e:
            print(f"Service: Error fetching shipping option by ID: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[ShippingError.failure(e.error_code, e.message)],
                message="Shipping Service: error fetching shipping option by ID",
            )
        except Exception as e:
            print(f"Service: Error fetching shipping option by ID: {e}")
            return ServiceResponse(
                success=False,
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                errors=[ShippingError.failure()],
                message="Shipping Service: error fetching shipping option by ID",
            )

    def get_shipping_carrier_by_id(self, shipping_carrier_id: str) -> ServiceResponse:
        """
        Get a shipping carrier by its ID.

        Args:
            shipping_carrier_id (str): The ID of the shipping carrier.

        Returns:
            ServiceResponse: Response containing the shipping carrier.
        """
        try:
            shipping_carrier = self.shipping_carrier_repo.get(shipping_carrier_id)
            return ServiceResponse(
                success=True,
                status_code=StatusCode.OK,
                data={"shipping_carrier": shipping_carrier},
                message="Shipping Service: shipping carrier fetched successfully",
            )
        except ShippingException as e:
            print(f"Service: Error fetching shipping carrier by ID: {e}")
            return ServiceResponse(
                success=False,
                status_code=e.status_code,
                errors=[ShippingError.failure(e.error_code, e.message)],
                message="Shipping Service: error fetching shipping carrier by ID",
            )
        except Exception as e:
            print(f"Service: Error fetching shipping carrier by ID: {e}")
            return ServiceResponse(
                success=False,
                status_code=StatusCode.INTERNAL_SERVER_ERROR,
                errors=[ShippingError.failure()],
                message="Shipping Service: error fetching shipping carrier by ID",
            )
