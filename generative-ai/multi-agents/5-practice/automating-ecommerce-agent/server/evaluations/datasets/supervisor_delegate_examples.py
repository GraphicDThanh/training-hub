examples = [
    {
        "description": "Supervisor delegate to the service agent",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Do you offer free shipping?"},
            ],
            "mock_agent_responses": {
                "service_agent": "Yes, free shipping is available on orders over 1 million VND.",
            },
        },
        "outputs": {"delegation_chain": ["__start__", "service_agent", "__end__"]},
    },
    {
        "description": "Supervisor delegate to the product agent",
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Give me product Dreamy Styled Collar Shirt",
                },
            ],
            "mock_agent_responses": {
                "product_agent": """
                    Here are the details for the **Dreamy Styled Collar Shirt**:
                    - **Description**: This design is part of the Dreamy Bloom collection, a perfect companion for women, helping them always shine. The product is made from premium materials, soft as if caressing the wearer's skin. Every detail of the outfit is meticulously crafted, from the elegant silhouette to the feminine touch.
                    - **Price**: 17.0 VND
                    - **Available Sizes**: S, M, L, XL, XXL
                    - **Thumbnail**: ![Dreamy Styled Collar Shirt](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/11/05/a071b83c16f697e65538597314d51f9e.webp)
                    - **Product URL**: [View Product](https://ivymoda.com/sanpham/ao-so-mi-dreamy-co-kieu-ms-16m8968-41265)
                    - **Quantity Available**: 36 units

                    Let me know if you need any more information!
                """,
            },
        },
        "outputs": {"delegation_chain": ["__start__", "product_agent", "__end__"]},
    },
    {
        "description": "Supervisor delegate to the cart agent because user is anonymous.",
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Add Dreamy Styled Collar Shirt to my cart.",
                },
            ],
            "mock_agent_responses": {
                "product_agent": "Here are the details for the **Dreamy Styled Collar Shirt**:\n\n- **Name**: Dreamy Styled Collar Shirt\n- **Description**: This design is part of the Dreamy Bloom collection, a perfect companion for women, helping them always shine. The product is made from premium materials, soft as if caressing the wearer's skin. Every detail of the outfit is meticulously crafted, from the elegant silhouette to the feminine touch.\n- **Price**: $17.00\n- **Available Sizes**: S, M, L, XL, XXL\n- **Thumbnail**: ![Thumbnail](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/11/05/a071b83c16f697e65538597314d51f9e.webp)\n- **Product URL**: [View Product](https://ivymoda.com/sanpham/ao-so-mi-dreamy-co-kieu-ms-16m8968-41265)\n- **Quantity Available**: 36\n\nLet me know if you need more information!"
            },
        },
        "outputs": {"delegation_chain": ["__start__", "product_agent", "__end__"]},
    },
    {
        "description": "Supervisor delegate to the cart agent.",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Get my cart detail."},
            ],
            "mock_agent_responses": {
                "cart_agent": "Your cart is currently empty. There are no items in your cart.",
            },
            "is_authenticated": True,
        },
        "outputs": {"delegation_chain": ["__start__", "cart_agent", "__end__"]},
    },
    {
        "description": "Supervisor delegate to the order agent.",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Get my orders."},
            ],
            "mock_agent_responses": {
                "order_agent": """You currently have no orders. If you need assistance with anything else, feel free to ask!""",
            },
            "is_authenticated": True,
        },
        "outputs": {"delegation_chain": ["__start__", "order_agent", "__end__"]},
    },
]
