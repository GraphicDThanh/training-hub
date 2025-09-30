from pydantic import BaseModel, ConfigDict
from typing_extensions import Literal, NotRequired, TypedDict
from common.errors.error import Error


class ServiceResponse(BaseModel):
    """Base class for all service responses."""

    success: bool = True
    data: dict = {}
    status_code: int = 200
    message: str = ""
    errors: list[Error] = None
    model_config = ConfigDict(arbitrary_types_allowed=True)


class PaymentResponse(TypedDict):
    id: str
    status: Literal["succeeded", "failed"]
    amount: float
    currency: NotRequired[str] = "USD"
    message: NotRequired[str] = "Payment processed successfully"


class RefundResponse(TypedDict):
    id: str
    status: Literal["succeeded", "failed"]
    amount: float
    currency: NotRequired[str] = "USD"
    message: NotRequired[str] = "Refund processed successfully"