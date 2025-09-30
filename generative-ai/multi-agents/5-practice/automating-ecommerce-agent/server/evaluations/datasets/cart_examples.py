from common.config import settings
from common.entities import PaymentMethod, Product, ShippingAddress, ShippingOption
from common.types import CartCheckoutUserData

examples = [
    {
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Add Dreamy Styled Collar Shirt to my cart.",
                },
            ],
            "is_authenticated": True,
            "cart_items": [],
            "product_retrieved_intermediate_step": Product(
                id="cc962c05-9bc0-426b-b62a-9e62f4947d89",
                name="Dreamy Styled Collar Shirt",
                description="""
                This design is part of the Dreamy Bloom collection, a perfect companion for women, helping them always shine. The product is made from premium materials, soft as if caressing the wearer"sskin. Every detail of the outfit is meticulously crafted, from the elegant silhouette to the feminine patterns, giving confidence in every moment.
                """,
                price=17.00,
                sizes="S, M, L, XL",
                quantity=1,
                category_id="3c5d77b8-2b95-4a74-baa5-8f8e62229b15",
                thumbnail="https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/11/05/a071b83c16f697e65538597314d51f9e.webp",
                url="https://ivymoda.com/sanpham/ao-so-mi-dreamy-co-kieu-ms-16m8968-41265",
            ),
        },
        "outputs": {
            "response": """The "Dreamy Styled Collar Shirt" has been successfully added to your cart. Here are the details:

- **Total items:** 1
- **Total cost:** $17.00

| Product Name | Price | Quantity | Total Price | Image |
|--------------|-------|----------|-------------|-------|
| [Dreamy Styled Collar Shirt](https://ivymoda.com/sanpham/ao-so-mi-dreamy-co-kieu-ms-16m8968-41265) | $17.00 | 1 | $17.00 | ![Image](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/11/05/a071b83c16f697e65538597314d51f9e.webp) |

Let me know if you would like to add more items or proceed to checkout!""",
        },
    },
    {
        "inputs": {
            "messages": [
                {"role": "user", "content": "Get my cart."},
            ],
            "is_authenticated": True,
            "cart_items": [
                {
                    "product_id": "cc962c05-9bc0-426b-b62a-9e62f4947d89",
                    "quantity": 1,
                }
            ],
        },
        "outputs": {
            "response": """Here's your cart:
    - **Total items:** 1
    - **Total cost:** $17.00
    | Product Name | Price | Quantity | Total Price | Image |
    |--------------|-------|----------|-------------|-------|
    | [Dreamy Styled Collar Shirt](https://ivymoda.com/sanpham/ao-so-mi-dreamy-co-kieu-ms-16m8968-41265) | $17.00 | 1 | $17.00 | ![Dreamy Styled Collar Shirt](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/11/05/a071b83c16f697e65538597314d51f9e.webp) |""",
        },
    },
    {
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Remove Straight Cut Button-down Collar Shirt out of cart.",
                },
            ],
            "is_authenticated": True,
            "cart_items": [],
            "product_retrieved_intermediate_step": Product(
                id="fdeee24b-7f15-4070-aa21-3984e3042954",
                name="Straight Cut Button-down Collar Shirt",
                description="""
                This design is part of the Dreamy Bloom collection, a perfect companion
                """,
                price=17.00,
                sizes="S, M, L, XL",
                quantity=1,
                category_id="3c5d77b8-2b95-4a74-baa5-8f8e62229b15",
                thumbnail="https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/11/05/a071b83c16f697e65538597314d51f9e.webp",
                url="https://ivymoda.com/sanpham/ao-so-mi-dreamy-co-kieu-ms-16m8968-41265",
            ),
        },
        "outputs": {
            "response": "Your cart is currently empty. Let's add items to your cart first.",
        },
    },
    {
        "inputs": {
            "messages": [
                {"role": "user", "content": "Clear my cart."},
            ],
            "is_authenticated": True,
            "cart_items": [
                {
                    "product_id": "fdeee24b-7f15-4070-aa21-3984e3042954",
                    "quantity": 2,
                }
            ],
        },
        "outputs": {"response": "Your cart has been cleared. If you need further assistance, feel free to ask!"},
    },
    {
        "inputs": {
            "messages": [
                {"role": "user", "content": "Checkout my cart."},
            ],
            "is_authenticated": True,
            "cart_items": [],
            "cart_checkout_user_data": CartCheckoutUserData(
                shipping_address=ShippingAddress(
                    name="John Doe",
                    address_line_1="123 Main St",
                    city="Springfield",
                    state="IL",
                    postal_code="62701",
                    country="USA",
                    user_id="user_12345",
                ),
                payment_method=PaymentMethod(
                    user_id="user_12345",
                    type="credit_card",
                    card_number="4111111111111111",
                    expiration_date="12/25",
                    cvv="123",
                    payment_option_id=settings.eval.PAYMENT_OPTION_ID,
                ),
                selected_shipping_option=ShippingOption(
                    id="standard_shipping",
                    name="Standard Shipping",
                    cost=5.00,
                ),
            ),
        },
        "outputs": {
            "response": "Your cart is currently empty. Let's add items to your cart first.",
        },
    },
]
