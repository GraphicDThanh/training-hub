from common.entities import Order, PaymentMethod
from common.mock.payment_client import MockPaymentClient
from common.types.response import ServiceResponse


class PaymentService:
    def __init__(self):
        self.client = MockPaymentClient()

    def process_payment(
        self, order: Order, payment_method: PaymentMethod
    ) -> ServiceResponse:
        """
        Process an order payment

        Args:
            payment_data: Payment information for the order

        Returns:
            Confirmation of payment if successful

        Raises:
            Exception: If payment process fails
        """
        payment_data = {
            "order_id": order.id,
            "amount": order.total_cost,
            "currency": "USD",
        }
        payment_response = self.client.pay(payment_data)
        if payment_response["status"] == "succeeded":
            return ServiceResponse(
                data={
                    "payment": {
                        **payment_response,
                        "order_id": order.id,
                        "payment_method": payment_method.to_dict(),
                    }
                },
                message="Payment processed successfully",
            )

        if payment_response["status"] == "failed":
            return ServiceResponse(
                success=False,
                data={
                    "payment": {
                        **payment_response,
                        "order_id": order.id,
                        "payment_method": payment_method.to_dict(),
                    }
                },
                status_code=400,
                errors=[],
                message="Payment Service: Payment processing failed",
            )

        return ServiceResponse(
            success=False,
            status_code=400,
            errors=[],
            message="Payment Service: Payment processing failed",
        )

    def refund_payment(
        self, order: Order, payment_method: PaymentMethod
    ) -> ServiceResponse:
        """
        Process a refund for an order

        Args:
            refund_data: Refund request information

        Returns:
            Confirmation of refund if successful

        Raises:
            Exception: If refund process fails
        """
        refund_data = {
            "order_id": order.id,
            "amount": order.total_cost,
            "currency": "USD",
        }
        refund_response = self.client.refund(refund_data)
        if refund_response["status"] == "succeeded":
            return ServiceResponse(
                data={
                    "refund": {
                        **refund_response,
                        "order_id": order.id,
                        "payment_method": payment_method.to_dict(),
                    }
                },
                message="Refund processed successfully",
            )

        if refund_response["status"] == "failed":
            return ServiceResponse(
                success=False,
                status_code=400,
                errors=[],
                message="Payment Service: Refund processing failed",
            )

        return ServiceResponse(
            success=False,
            status_code=400,
            errors=[],
            message="Payment Service: Refund processing failed",
        )
