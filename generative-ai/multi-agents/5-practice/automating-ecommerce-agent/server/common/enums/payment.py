from enum import Enum


class PaymentOptionCategory(Enum):
    CREDIT_CARD = 0
    DEBIT_CARD = 1
    PAYPAL = 2
    BANK_TRANSFER = 3
    COD = 4

    def label(self):
        return {
            PaymentOptionCategory.CREDIT_CARD: "Credit Card",
            PaymentOptionCategory.DEBIT_CARD: "Debit Card",
            PaymentOptionCategory.BANK_TRANSFER: "Bank Transfer",
            PaymentOptionCategory.PAYPAL: "PayPal",
            PaymentOptionCategory.COD: "Cash on Delivery",
        }[self]


class PaymentOptionProvider(Enum):
    STRIPE = 0
    PAYPAL = 1

    def label(self):
        return {
            PaymentOptionProvider.STRIPE: "Stripe",
            PaymentOptionProvider.PAYPAL: "PayPal",
        }[self]


class PaymentStatus(Enum):
    PENDING = 0
    COMPLETED = 1
    FAILED = 2

    def label(self):
        return {
            PaymentStatus.PENDING: "Pending",
            PaymentStatus.COMPLETED: "Completed",
            PaymentStatus.FAILED: "Failed",
        }[self]
