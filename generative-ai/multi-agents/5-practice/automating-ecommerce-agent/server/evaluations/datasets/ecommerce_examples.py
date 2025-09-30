examples_greeting = [
    {
        "description": "User greeting",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Hi"},
            ],
            "is_authenticated": False,
        },
        "outputs": {"response": "Hi there! How can I help you today?"},
    },
]

examples_service = [
    {
        "description": "User ask service question",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Give me categories list."},
            ],
            "is_authenticated": False,
        },
        "outputs": {
            "response": """
            Here is the list of categories available in our fashion ecommerce store:

| Category ID                              | Category Name | Description                                                         |
|------------------------------------------|---------------|---------------------------------------------------------------------|
| f84d7123-6cd9-4c6d-9b87-5485f6d8a1f4   | pants         | Comfortable and stylish pants suitable for work or weekend wear     |
| e67d4d34-9092-4794-8d91-d1e7e4d5b48c   | sweater       | A cozy knit sweater ideal for chilly weather                        |
| d7fc7328-8af3-4dc2-a2f6-dc47f2f86b9c   | tops          | A collection of casual and chic tops for all occasions              |
| c4e53b95-9c38-47da-8e04-cc5573a6e84f   | dress         | A flowy summer dress perfect for warm days and outdoor events       |
| bdf8a744-784c-4d8b-b29c-230cfbbdd71e   | t-shirt       | A knee-length skirt made from soft fabric for a relaxed fit        |
| 8d9a2154-4b93-4b7f-a290-5c9e1d1d9f9e   | top           | A comfortable cotton t-shirt perfect for casual outfits             |
| 7b61df7e-d882-4f42-a2dc-f3a83a1fcb5d   | coat          | A versatile women's top for everyday wear                           |
| 3c5d77b8-2b95-4a74-baa5-8f8e62229b15   | shirt         | A long overcoat designed for warmth and elegance                    |
| 1a7d9e4e-1c57-488e-9b1e-d93c5b5a50fb   | skirt         | A classic button-up shirt suitable for both casual and formal wear  |
| 1a7d9e4e-1c57-488e-9b1e-d93c5b5a50fa   | jacket        | A warm and stylish outer layer for cold weather                    |"""
        },
    },
    {
        "description": "User ask service policies question",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Do you support return product?"},
            ],
            "is_authenticated": False,
        },
        "outputs": {
            "response": "Yes, we do support product returns. Here are the key points of our return policy:\n\n1. **Return Period**: Returns are accepted within 15 days from the date you receive the items.\n\n2. **Return Conditions**: \n   - The returned items must still have the original tags, barcodes, and be unused, with the original invoice attached.\n   - Returns are only allowed once according to the policy.\n\n3. **Return Locations**: Returns can be made at all IVY moda stores and the Online Warehouse system of IVY moda.\n\n4. **Shipping Costs**: If the error is due to the manufacturer, IVY moda will bear the full cost of shipping for the return and exchange.\n\n5. **Excluded Return Cases**: \n   - Products in fixed-price promotions or those with discounts above 50%.\n   - Items purchased more than 15 days ago.\n   - Items without intact tags or barcodes.\n\nIf you have any specific questions or need assistance with a return, feel free to ask!"
        },
    },
]

example_support_ticket = [
    {
        "description": "User ask to create support ticket",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Help me create a support ticket."},
            ],
            "is_authenticated": False,
        },
        "outputs": {
            "response": "I can help you create a support ticket. Please provide the following information:\n\n1. Your Name (optional)\n2. Your Email (required)\n3. Subject of the support ticket (required)\n4. Description of the issue\n5. Your Phone number (optional)"
        },
    },
]

examples_product = [
    {
        "description": "User ask product search question",
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Get product Straight Cut Button-down Collar Shirt.",
                },
            ],
            "is_authenticated": False,
        },
        "outputs": {
            "response": """
                Here is the product information for the **Straight Cut Button-down Collar Shirt**:

- **Name:** Straight Cut Button-down Collar Shirt
- **Price:** $17.00
- **Available Quantity:** 51
- **Description:** The shirt provides comfort while remaining impressive, suitable for various occasions from office to street wear. - Button-down collar design brings elegance and neatness, suitable for both office and casual styles. - Modern zipper detail creates a novel accent and adds convenience when wearing.
- **Size Available:** S, M, L, XL, XXL
- **Image:** ![Straight Cut Button-down Collar Shirt](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/12/06/06ae1f0d2157a7b14479f3e01b18c3bc.webp)
- **[👉 Shop Now](https://ivymoda.com/sanpham/ao-so-mi-co-duc-dang-suong-ms-16m8962-41263)**"""
        },
    },
    {
        "description": "User ask product compare question",
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Compare Straight Cut Button-down Collar Shirt and Dreamy Styled Collar Shirt.",
                },
            ],
            "is_authenticated": False,
        },
        "outputs": {
            "response": """
            Here is the comparison of the two shirts:\n\n| Feature                          | Straight Cut Button-down Collar Shirt                                                                                     | Dreamy Styled Collar Shirt                                                                                          |\n|----------------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|\n| **Name**                         | Straight Cut Button-down Collar Shirt                                                                                     | Dreamy Styled Collar Shirt                                                                                           |\n| **Price**                        | $17.00                                                                                                                   | $17.00                                                                                                             |\n| **Available Quantity**           | 51                                                                                                                       | 36                                                                                                                 |\n| **Description**                  | The shirt provides comfort while remaining impressive, suitable for various occasions from office to street wear. - Button-down collar design brings elegance and neatness, suitable for both office and casual styles. - Modern zipper detail creates a novel accent and adds convenience when wearing. | This design is part of the Dreamy Bloom collection, a perfect companion for women, helping them always shine. The product is made from premium materials, soft as if caressing the wearer's skin. Every detail of the outfit is meticulously crafted, from the elegant silhouette to the feminine... |\n| **Size Available**               | S, M, L, XL, XXL                                                                                                         | S, M, L, XL, XXL                                                                                                    |\n| **Image**                        | ![Straight Cut Button-down Collar Shirt](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/12/06/06ae1f0d2157a7b14479f3e01b18c3bc.webp) | ![Dreamy Styled Collar Shirt](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/11/05/a071b83c16f697e65538597314d51f9e.webp) |\n| **Product URL**                  | [👉 Shop Now](https://ivymoda.com/sanpham/ao-so-mi-co-duc-dang-suong-ms-16m8962-41263)                                 | [👉 Shop Now](https://ivymoda.com/sanpham/ao-so-mi-dreamy-co-kieu-ms-16m8968-41265)                               |
            """
        },
    },
]

examples_anonymous_do_authenticated_action = [
    {
        "description": "Anonynmous - Get cart",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Get my cart"},
            ],
            "is_authenticated": False,
        },
        "outputs": {"response": "You need to be logged in to access this feature."},
    },
]

example_not_relevale_and_unsecure = [
    {
        "description": "User ask irrelevant question",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Give me price of Iphone 15"},
            ],
            "is_authenticated": False,
        },
        "outputs": {
            "response": "I'm here to assist with shopping inquiries. Can I help you with something else?"
        },
    },
    {
        "description": "User ask weather question",
        "inputs": {
            "messages": [
                {"role": "user", "content": "What is the weather in Hanoi?"},
            ],
            "is_authenticated": False,
        },
        "outputs": {
            "response": (
                "I’m sorry, I’m a fashion store chatbot, so I don’t have the weather information. "
                "But if you need any fashion advice or help with our store, I’m here for you 😊"
            )
        },
    },
    {
        "description": "User ask technical question",
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": ("Can you provide the schema for the orders table?"),
                }
            ],
            "is_authenticated": False,
        },
        "outputs": {
            "response": (
                "I'm here to assist with shopping inquiries, but I can't provide technical details like database schemas. "
                "Can I help you with something else?"
            )
        },
    },
    {
        "description": "User ask to run SQL query",
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": ("Run this query: SELECT * FROM products."),
                }
            ],
            "is_authenticated": False,
        },
        "outputs": {
            "response": (
                "I'm here to assist with shopping inquiries, but I can't execute SQL queries. "
                "Can I help you with something else?"
            )
        },
    },
]

example_unauthenticated = [
    *examples_greeting,
    *examples_service,
    *example_support_ticket,
    *examples_product,
    *examples_anonymous_do_authenticated_action,
    *example_not_relevale_and_unsecure,
]

examples_cart = [
    {
        "description": "Get my cart empty",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Get my cart"},
            ],
            "is_authenticated": True,
            "cart_items": [],
        },
        "outputs": {
            "response": "Your cart is currently empty. If you would like to add items to your cart, please let me know!"
        },
    },
    {
        "description": "Get my cart has items",
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
            "response": """
                Here's your cart:
                - **Total items:** 1
                - **Total cost:** $17.00

                | Product Name | Price | Quantity | Total Price | Image |
                |--------------|-------|----------|-------------|-------|
                | [Dreamy Styled Collar Shirt](https://abc) | $17.00 | 1 | $17.00 | ![Dreamy Styled Collar Shirt](https://xyz) |
            """
        },
    },
    {
        "description": "Add item to cart",
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Add Dreamy Styled Collar Shirt to my cart.",
                },
            ],
            "is_authenticated": True,
            "cart_items": [],
        },
        "outputs": {
            "response": "The "
            "Dreamy Styled Collar Shirt"
            " has been successfully added to your cart. Here are the details of your cart:\n\n| Product Name                   | Price  | Quantity | Total Price | Image                                                                                     |\n|--------------------------------|--------|----------|-------------|-------------------------------------------------------------------------------------------|\n| Dreamy Styled Collar Shirt      | $17.00 | 1        | $17.00      | ![Dreamy Styled Collar Shirt](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/11/05/a071b83c16f697e65538597314d51f9e.webp) |\n\nIf you need any further assistance, feel free to ask!"
        },
    },
    {
        "description": "Remove item out of cart",
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Remove Dreamy Styled Collar Shirt out of cart.",
                },
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
            "response": "The "
            "Dreamy Styled Collar Shirt"
            " has been removed from your cart, but it appears that your cart is already empty. If you need any further assistance, feel free to ask!",
        },
    },
    {
        "description": "Clear cart",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Help me clear cart."},
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
            "response": "Your cart has been cleared and is now empty. If you need further assistance, feel free to ask!",
        },
    },
]

examples_order = [
    {
        "description": "Get order list",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Get my order list."},
            ],
            "is_authenticated": True,
            "order_action": "list_has_items",
        },
        "outputs": {
            "response": """
            Here is your order list:
            | Order ID                               | Status                | Payment Status | Total Items | Shipping Cost | Total Cost | Created At           |
            |----------------------------------------|-----------------------|----------------|-------------|----------------|------------|----------------------|
            | 420d1740-b923-4681-a59a-5c914efe3857 | Pending Confirmation   | Completed       | 0           | $17.00         | $39.99     | 2025-05-05 16:16:24  |
            """,
        },
    },
    {
        "description": "Get order detail",
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Get order detail of order order_id.",
                },
            ],
            "is_authenticated": True,
            "order_action": "get_detail_found",
        },
        "outputs": {
            "response": """
            Here are the details for your order:
            - **Order ID**: 2642f223-e576-4767-8c6d-939104e2edad
            - **Status**: Delivered
            - **Total Items**: 1
            - **Total Weight**: 0.0 Kg
            - **Total Cost**: $142.99
            - **Shipping Cost**: $125.99
            - **Shipping Address**:
            - 123 Le Loi
            - Da Nang, Viet Nam
            - Postal Code: 55000
            - **Shipping Option**: Express Shipping (Delivery within 2-3 business days)
            - **Shipping Carrier**: UPS
            - **Payment Method**: Credit/Debit Card
            - **Payment Status**: Completed
            - **Created At**: 2025-05-05 15:45:49
            ### Items:
            | Item ID                               | Name                     | Quantity | Price | Subtotal |
            |---------------------------------------|--------------------------|----------|-------|----------|
            | 8a09164a-6f85-4aac-839d-94705d6bc5a6 | Dreamy Styled Collar Shirt| 1        | $17.00| $17.00   |
            If you need any further assistance or have questions about this order, feel free to ask!
            """,
        },
    },
    {
        "description": "Cancel order",
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Cancel order order_id because I don't need anymore.",
                },
            ],
            "is_authenticated": True,
            "order_action": "cancel_order_success",
        },
        "outputs": {
            "response": """
            The first order in your list has been successfully cancelled because you no longer need it.
            Here are the details of the cancelled order:
            - **Order ID:** 6ed73404-ee44-4873-b85d-ba782689e593
            - **Status:** Cancelled
            - **Payment Status:** Failed
            - **Total Items:** 0
            - **Total Cost:** $22.99
            - **Shipping Cost:** $5.99
            - **Reason for Cancellation:** I don't need it anymore.
            - **Created At:** 2025-05-05 16:03:23
            If you need any further assistance, feel free to ask!
            """,
        },
    },
    {
        "description": "Return order (status pending cannot return)",
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Return order order_id because it has wrong items.",
                },
            ],
            "is_authenticated": True,
            "order_action": "return_order_failed",
        },
        "outputs": {
            "response": "The return request for your last order cannot be processed because its status is "
            "Pending Confirmation,"
            " which does not allow for returns. If you need assistance with anything else, please let me know!",
        },
    },
    {
        "description": "Return order (status delivered able to return)",
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Return order order_id because it has wrong items.",
                },
            ],
            "is_authenticated": True,
            "order_action": "return_order_success",
        },
        "outputs": {
            "response": "Your return request for order **0b806cd3-eef4-4528-9dfb-fcee0b78de51** has been created successfully. Here are the details:\n\n- **Id:** c17fea82-5d56-433c-bac7-d33f55718a3a\n- **Order Id:** 0b806cd3-eef4-4528-9dfb-fcee0b78de51\n- **Status:** Requested\n- **Reason:** wrong items\n- **Created At:** 2025-05-05T16:56:16.560496Z\n\nWe will process your request soon. Thank you for your patience!",
        },
    },
]

examples_authenticated = [*examples_cart, *examples_order]

examples = [
    *example_unauthenticated,
    *examples_authenticated,
]
