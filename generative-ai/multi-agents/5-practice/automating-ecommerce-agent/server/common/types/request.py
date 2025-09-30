import re
import uuid

from common.entities import Product
from pydantic import BaseModel, Field, ValidationError, field_validator
from typing_extensions import NotRequired, TypedDict


class ChatRequest(BaseModel):
    message: str = Field(
        description="User input to the agent.",
        examples=["Give me categories list."],
    )
    thread_id: str | None = Field(
        description="Thread ID to persist and continue a multi-turn conversation.",
        default=None,
        examples=["847c6285-8fc9-4560-a83f-4e6285809254"],
    )


class ToolCallApprovalRequest(BaseModel):
    thread_id: str | None = Field(
        description="Thread ID to persist and continue a multi-turn conversation.",
        default=None,
        examples=["847c6285-8fc9-4560-a83f-4e6285809254"],
    )
    tool_call_id: str = Field(
        description="Tool call ID to approve or reject.",
        examples=["847c6285-8fc9-4560-a83f-4e6285809254"],
    )
    user_input: str = Field(
        description="User input to the agent.",
        examples=["The tool call is approved."],
    )


class LookUpDocumentRequest(BaseModel):
    query: str

    service_categories: list[str] = Field(
        max_length=2,
        min_length=0,
    )

    @field_validator("service_categories")
    @classmethod
    def validate_service_categories(cls, value):
        if not value:
            raise ValidationError("service_categories cannot be empty")

        if set(value) - {"faqs", "policies"}:
            raise ValidationError(
                'service_categories must be either "faqs" or "policies"'
            )

        return value


class SelectShippingOptionRequest(BaseModel):
    name: str = Field(description="The name of the shipping option")

    @field_validator("name")
    @classmethod
    def validate_name(cls, value) -> Product:
        from services import shipping_service  # avoid circular import

        if not value:
            raise ValidationError("Shipping Option name must not be empty")

        # Find shipping option by name in the system
        response = shipping_service.get_shipping_option_by_name(value)
        if response.success is False:
            raise ValidationError(
                f"Shipping Option name '{value}' is invalid. Please select one of them again."
            )

        return value


class CreateSupportTicketRequest(BaseModel):
    email: str = Field(description="The email of the user")
    subject: str = Field(description="The subject of the support ticket")
    name: str = Field(default="Anonymous User", description="The name of the user")
    phone: str = Field(default="", description="The phone number of the user")
    description: str = Field(default="", description="The description of the issue")

    @field_validator("email")
    @classmethod
    def validate_email(cls, value):
        if not value:
            raise ValueError("Email is required")
        # Additional email validation can be added here

        pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
        is_email_validated = re.match(pattern, value) is not None

        if not is_email_validated:
            raise ValueError("Invalid email format")

        return value

    @field_validator("subject")
    @classmethod
    def validate_subject(cls, value):
        if not value:
            raise ValueError("Subject is required")

        if len(value) < 5:
            raise ValueError("Subject must be at least 5 characters long")

        return value


class AddToCartRequest(BaseModel):
    # product_names: list[str] = Field(description="Product names want to add to cart")
    quantity: int = Field(description="Product quantity want to add to cart", default=1)

    # @field_validator("product")
    # @classmethod
    # def validate_product(cls, value: str) -> Product:
    #     from services import product_service  # avoid circular import

    #     if not value:
    #         raise ValidationError("Product is required on add to cart")

    #     if isinstance(value, str) is False:
    #         raise ValidationError("Product name must be a string")

    #     response = product_service.get_product_by_name(value)
    #     if not response.success:
    #         raise ValidationError(f"Error when get product by name: {response.message}")

    #     return value

    @field_validator("quantity")
    @classmethod
    def validate_quantity(cls, value):
        if not isinstance(value, int):
            raise ValidationError("quantity must be an integer")

        if value <= 0:
            raise ValidationError("quantity must be greater than 0")

        return value


class GetOrderRequest(BaseModel):
    order_id: str = Field(description="The ID of the order to get")

    @field_validator("order_id")
    @classmethod
    def validate_order_id(cls, value):
        if not value:
            raise ValidationError("Order ID is required")

        try:
            uuid.UUID(value)
            return value
        except (ValueError, AttributeError, TypeError):
            raise ValidationError("Invalid UUID format")


class PaymentRequest(TypedDict):
    order_id: str
    amount: float
    currency: NotRequired[str] = "USD"
    description: NotRequired[str] = "Payment for order"


class RefundRequest(TypedDict):
    order_id: str
    amount: float
    currency: NotRequired[str] = "USD"
    description: NotRequired[str] = "Refund for order"
