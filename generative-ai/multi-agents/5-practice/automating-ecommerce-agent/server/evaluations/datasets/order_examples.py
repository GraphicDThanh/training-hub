examples = [
    {
        "inputs": {
            "messages": [
                {"role": "user", "content": "Get order list."},
            ],
            "is_authenticated": True,
            "order_action": "list_has_items",
        },
        "outputs": {
            "response": """Here is your order list:
| Order ID                               | Status                | Payment Status | Total Items | Shipping Cost | Total Cost | Created At           |
|----------------------------------------|-----------------------|----------------|-------------|----------------|------------|----------------------|
| 420d1740-b923-4681-a59a-5c914efe3857 | Pending Confirmation   | Completed       | 0           | $17.00         | $39.99     | 2025-05-05 16:16:24  |""",
        },
    },
    {
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Get order detail of id order_id.",
                },
            ],
            "is_authenticated": True,
            "order_action": "get_detail_found",
        },
        "outputs": {
            "response": """Here is your order detail:
- Order ID: 9ec9e49a-6cec-41fc-bfc4-702658cb4546
- Created At: 2025-05-08 17:23:21 UTC
- Status: Pending Confirmation
- Total Items: 2
- Total Weight: 0.0 Kg
- Total Cost: $39.99
- Shipping Cost: $5.99
- Shipping Address: 123 Main St, Apt 4B, Eval Town, CA, 12345, USA
- Shipping Option: Standard Shipping (Delivery within 5-7 business days)
- Shipping Carrier: USPS
- Payment Method: Credit/Debit Card
- Payment Status: Completed
- Order Items:

| Item ID                               | Name                                         | Quantity | Price | Subtotal |
|---------------------------------------|----------------------------------------------|----------|-------|----------|
| 57d7307b-d9a8-4ef6-b9d4-4314025b44eb | Straight Cut Button-down Collar Shirt        | 2        | $17.00| $34.00   |""",
        },
    },
    {
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
            Here is your cancel order request:
            - Id: c1b6bc48-ad1d-4328-b357-c40fbc3976f1
            - Order Id: c1b6bc48-ad1d-4328-b357-c40fbc3976f1
            - Status: Cancelled
            - Reason: I don't need anymore.
            - Created At: 2025-05-13 10:44:29 UTC
            """,
        },
    },
    {
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Return order order_id in the list because wrong items.",
                },
            ],
            "is_authenticated": True,
            "order_action": "return_order_success",
        },
        "outputs": {
            "response": """Here is your order return request:
  - Order ID: 8cf2f83c-ed68-4df0-95fe-332e998e5d53
  - Status: Requested
  - Reason: wrong items
  - Created At: 2024-05-13 12:21:26 UTC

Your request has been created successfully, and we will process it soon. Thank you for your patience!""",
        },
    },
    {
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Return order order_id in the list because wrong items.",
                },
            ],
            "is_authenticated": True,
            "order_action": "return_order_failed",
        },
        "outputs": {
            "response": """
                The return request for order ID **5bea001e-7551-466b-8509-eebd7b07f10b** has failed because the order status is "Pending Confirmation," which does not allow for returns.
                If you need further assistance or would like to take another action, please let me know!
            """,
        },
    },
]
