from common.entities import PaymentMethod, ShippingAddress, ShippingOption
from gotrue.types import AuthResponse as SupabaseAuthResponse
from gotrue.types import (
    SignInWithEmailAndPasswordCredentials as SupabaseAuthSignInWithEmailAndPasswordCredentials,
)
from gotrue.types import UserResponse as SupabaseAuthUserResponse
from pydantic import BaseModel

from .request import ChatRequest


class CartCheckoutUserData(BaseModel):
    shipping_address: ShippingAddress
    payment_method: PaymentMethod
    selected_shipping_option: ShippingOption
