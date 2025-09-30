# Agent Scenario

## All Users
### Greeting
- Q: "Hi"
- A: "Hello! How can I assist you today?"

### Service Inquiry
- Q: Give me list categories
- A:
    """
    Here are the categories available:

    1. Shirts
    2. T-Shirts
    3. Sweaters
    4. Coats
    5. Jackets
    6. Pants
    7. Shorts
    8. Dresses

    If you have any other questions or need further assistance, feel free to ask!
    """

### Product Inquiry
- Q: Give me product "Dreamy Styled Collar Shirt"
- A:
    """
    Here are the details for the product **"Dreamy Styled Collar Shirt"**:

    - **Description**: This design is part of the Dreamy Bloom collection, a perfect companion for women, helping them always shine. The product is made from premium materials, soft as if caressing the wearer's skin. Every detail of the outfit is meticulously crafted, from the elegant silhouette to the feminine touch.
    - **Price**: $17.00
    - **Available Sizes**: S, M, L, XL, XXL
    - **Thumbnail**: ![Dreamy Styled Collar Shirt](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/11/05/a071b83c16f697e65538597314d51f9e.webp)
    - **Product URL**: [View Product](https://ivymoda.com/sanpham/ao-so-mi-dreamy-co-kieu-ms-16m8968-41265)
    - **Quantity Available**: 36

    If you need more information or assistance, feel free to ask!
    """

- Q: Add this item to my cart
- A: You need to be logged in to access this feature.

## Authenticated User
### Get cart detail
- Q: Get my cart
- A:
"""
Your cart is currently empty.

If you'd like to add items to your cart or need assistance with anything else, just let me know!
"""

### Add item to cart
- Q: Add "Dreamy Styled Collar Shirt" to my cart
- A:
"""
The item **"Dreamy Styled Collar Shirt"** has been successfully added to your cart. Here are the details:

| Product Name                  | Price | Quantity | Total Price | Image                                                                                     |
|-------------------------------|-------|----------|-------------|-------------------------------------------------------------------------------------------|
| Dreamy Styled Collar Shirt     | $17.00| 2        | $34.00      | ![Dreamy Styled Collar Shirt](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/11/05/a071b83c16f697e65538597314d51f9e.webp) |

If you need anything else or want to proceed to checkout, just let me know!
"""

### Checkout cart
- Q: Check my cart out
- A:
"""
Your cart has been successfully checked out, and the payment has been completed.

Your order ID is **ca593a44-cb7a-4a3f-bc7d-496da2799bd9**.

If you need any further assistance or details about your order, feel free to ask!
"""

### Get order detail
- Q: Get order "ca593a44-cb7a-4a3f-bc7d-496da2799bd9"
- A:
"""
Here are the details for your order **ID: ca593a44-cb7a-4a3f-bc7d-496da2799bd9**:

- **Order ID**: ca593a44-cb7a-4a3f-bc7d-496da2799bd9
- **Status**: Pending Confirmation
- **Total Items**: 2
- **Total Weight**: 0.0 Kg
- **Total Cost**: $159.99
- **Shipping Cost**: $125.99
- **Shipping Address**:
  - 114 Nguyen Thi Dinh
  - 68 Le Chan
  - Da Nang, VN
  - Postal Code: 55000
- **Shipping Option**: Express Shipping (Delivery within 2-3 business days)
- **Shipping Carrier**: UPS
- **Payment Method**: Credit/Debit Card
- **Payment Status**: Completed
- **Created At**: April 25, 2025

### Items:
| Item ID                             | Name                      | Quantity | Price | Subtotal |
|-------------------------------------|---------------------------|----------|-------|----------|
| 97aee127-ec08-42b8-b382-cb3c9cb6fff1| Dreamy Styled Collar Shirt | 2        | $17.00| $34.00   |

If you need any further assistance or details, feel free to ask!
"""

### Cancel Order
#### Missing data
- Q: Help me cancel this order
- A:
"""
Please provide the reason for canceling the order. You can respond with the format:

"I want to cancel order with ID ca593a44-cb7a-4a3f-bc7d-496da2799bd9 because [your reason]."

Once I have that, I can proceed with the cancellation.
"""
### Enough data
- Q: I want to cancel order with ID ca593a44-cb7a-4a3f-bc7d-496da2799bd9 because I dont need anymore.
- A:
"""
Your order with ID **ca593a44-cb7a-4a3f-bc7d-496da2799bd9** has been successfully canceled.

### Cancellation Details:
- **Order ID**: ca593a44-cb7a-4a3f-bc7d-496da2799bd9
- **Status**: Cancelled
- **Payment Status**: Completed
- **Reason for Cancellation**: I don't need anymore.
- **Total Cost**: $159.99
- **Shipping Cost**: $125.99

If you need any further assistance or have any other questions, feel free to ask!
"""

### Order History
- Q: Get my orders
- A:
"""
Here is the list of your orders:

| Order ID                             | Status            | Payment Status | Total Items | Shipping Cost | Total Cost | Created At           |
|--------------------------------------|-------------------|----------------|-------------|---------------|------------|----------------------|
| b9de1a4f-c89e-4adb-a3a4-eb4e4d0e40de | Pending Confirmation | Failed         | 1           | $24.99        | $41.99     | April 25, 2025       |
| fe5f56ff-391b-46e1-b938-36c5c4fe5ef7 | Cancelled         | Failed         | 1           | $125.99       | $142.99    | April 25, 2025       |
| ca593a44-cb7a-4a3f-bc7d-496da2799bd9 | Cancelled         | Completed      | 2           | $125.99       | $159.99    | April 25, 2025       |

If you need more details about any specific order or further assistance, just let me know!
"""

### Return Order
- Q: Return order b9de1a4f-c89e-4adb-a3a4-eb4e4d0e40de because It has wrong items
- A:
"""
Your return request for order **b9de1a4f-c89e-4adb-a3a4-eb4e4d0e40de** has been successfully created. Here are the details:

Return Request Details:
- **Id**: 5b2cba12-93c5-48d1-8f50-62677ebbf698
- **Order Id**: b9de1a4f-c89e-4adb-a3a4-eb4e4d0e40de
- **Status**: Requested
- **Reason**: It has wrong items
- **Created At**: April 25, 2025

We will process your request soon. Thank you for your patience! If you have any other questions or need further assistance, feel free to ask!
"""

- Q: Get order b9de1a4f-c89e-4adb-a3a4-eb4e4d0e40de
- A:
"""
Here are the details for your order **ID: b9de1a4f-c89e-4adb-a3a4-eb4e4d0e40de**:

- **Order ID**: b9de1a4f-c89e-4adb-a3a4-eb4e4d0e40de
- **Status**: Return
- **Total Items**: 1
- **Total Weight**: 0.0 Kg
- **Total Cost**: $41.99
- **Shipping Cost**: $24.99
- **Shipping Address**:
  - 114 Nguyen Thi Dinh
  - 68 Le Chan
  - Da Nang, VN
  - Postal Code: 55000
- **Shipping Option**: Next-Day Shipping
- **Shipping Carrier**: DHL
- **Payment Method**: Credit/Debit Card
- **Payment Status**: Completed
- **Created At**: April 25, 2025

- Items:
| Item ID                             | Name                      | Quantity | Price | Subtotal |
|-------------------------------------|---------------------------|----------|-------|----------|
| 7b810e1d-dbb0-4b3d-a008-ddff08067a15| Dreamy Styled Collar Shirt | 1        | $17.00| $17.00   |

- Order Returns:
| Id                                   | Status    | Reason               |
|--------------------------------------|-----------|----------------------|
| 5b2cba12-93c5-48d1-8f50-62677ebbf698| Requested | It has wrong items   |

If you need any further assistance or details, feel free to ask!
"""

