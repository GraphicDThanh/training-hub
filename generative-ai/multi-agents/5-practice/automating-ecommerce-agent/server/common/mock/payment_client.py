
import uuid
import random
from common.types.response import PaymentResponse, RefundResponse


class MockPaymentClient:
    def pay(self, payment_data) -> PaymentResponse:
        """
        Simulate processing a payment.

        Args:
            payment_data: A dictionary containing payment details.

        Returns:
            A mock response simulating a successful payment confirmation.
        """
        success_response = {
            "id": f"pay_{uuid.uuid4()}",
            "status": "succeeded",
            "amount": payment_data["amount"],
            "currency": payment_data["currency"],
            "message": "Payment processed successfully"
        }

        failure_response = {
            "id": f"pay_{uuid.uuid4()}",
            "status": "failed",
            "amount": payment_data["amount"],
            "currency": payment_data["currency"],
            "message": "Payment processing failed"
        }

        return random.choices(
            population=[success_response, failure_response],
            weights=[0.8, 0.2],
        )[0]

    def refund(self, refund_data) -> RefundResponse:
        """
        Simulate processing a refund.

        Args:
            refund_data: A dictionary containing refund details.

        Returns:
            A mock response simulating a successful refund confirmation.
        """
        success_response = {
            "id": f"refund_{uuid.uuid4()}",
            "status": "succeeded",
            "amount": refund_data["amount"],
            "currency": refund_data["currency"],
            "message": "Refund processed successfully"
        }
        failure_response = {
            "id": f"refund_{uuid.uuid4()}",
            "status": "failed",
            "amount": refund_data["amount"],
            "currency": refund_data["currency"],
            "message": "Refund processing failed"
        }
        return random.choices(
            population=[success_response, failure_response],
            weights=[0.8, 0.2],
        )[0]
