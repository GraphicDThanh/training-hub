from .error import Error, ErrorCode, ErrorMessage, ErrorType


class ShippingErrorCode(ErrorCode):
    MISSING_SHIPPING_OPTIONS = "missing_shipping_options"
    MISSING_SHIPPING_CARRIERS = "missing_shipping_carriers"
    MISSING_SHIPPING_CARRIERS_BY_SHIPPING_OPTION = (
        "missing_shipping_carriers_by_shipping_option"
    )
    INVALID_SHIPPING_OPTION_NAME = "invalid_shipping_option_name"


class ShippingErrorMessage(ErrorMessage):
    MISSING_SHIPPING_OPTIONS = "Missing shipping options in ecommerce system."
    MISSING_SHIPPING_CARRIERS = "Missing shipping carriers in ecommerce system."
    MISSING_SHIPPING_CARRIERS_BY_SHIPPING_OPTION = (
        "Missing shipping carriers for the given shipping option in ecommerce system."
    )
    INVALID_SHIPPING_OPTION_NAME = "Invalid shipping option name provided."


class ShippingError(Error):
    @staticmethod
    def missing_shipping_options(
        code=ShippingErrorCode.MISSING_SHIPPING_OPTIONS,
        message=ShippingErrorMessage.MISSING_SHIPPING_OPTIONS,
    ):
        return Error(error_type=ErrorType.FAILURE, code=code, message=message)

    @staticmethod
    def missing_shipping_carriers_by_shipping_option(
        code=ShippingErrorCode.MISSING_SHIPPING_CARRIERS_BY_SHIPPING_OPTION,
        message=ShippingErrorMessage.MISSING_SHIPPING_CARRIERS_BY_SHIPPING_OPTION,
    ):
        return Error(error_type=ErrorType.FAILURE, code=code, message=message)
