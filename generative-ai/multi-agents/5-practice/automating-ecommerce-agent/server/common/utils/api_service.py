from common.types.response import ServiceResponse


def get_response_errors(response: ServiceResponse) -> list:
    """
    Extracts errors from a ServiceResponse object.

    Args:
        response (ServiceResponse): The ServiceResponse object to extract errors from.

    Returns:
        list: A list of error messages.
    """
    if response.success:
        return []

    return [
        {
            "code": error.code,
            "message": error.message,
        }
        for error in response.errors
    ]


def build_require_approval_message(tool_call_data: dict, snapshot_values: dict) -> dict:
    print("tool_call_data: ", tool_call_data)
    tool_name = tool_call_data["name"]
    message = "\n\n**Action Required: Please Confirm**\n\n"

    if tool_name == "create_support_ticket":
        message += build_support_ticket_message(tool_call_data["args"]["data_request"])
    elif tool_name == "checkout_cart":
        message += build_checkout_cart_message(snapshot_values)

    return message


def build_support_ticket_message(data_request: dict) -> str:
    message = "**We are about to create a support ticket on your behalf. Please review the details below and confirm:**\n"
    for arg_name, arg_value in data_request.items():
        message += f"\n  - {arg_name.title()}: {arg_value}"
    message += (
        "\n\nOur support team will assist you directly based on this information. "
        "Please ensure all details are accurate before proceeding. Do you confirm?"
    )
    return message


def build_checkout_cart_message(snapshot_values: dict) -> str:
    cart = snapshot_values["active_cart"]
    cart_checkout_user_data = snapshot_values["cart_checkout_user_data"]
    shipping = cart_checkout_user_data["shipping_address"]
    payment = cart_checkout_user_data["payment_method"]
    shipping_option = cart_checkout_user_data["selected_shipping_option"]

    lines = [
        "We are about to checkout your cart. Please review the details below and confirm:\n",
        "#### Order Preview:",
        "##### Order Detail:",
        f"  - **Total Items**: {cart.total_items}",
        f"  - **Total Cost**: {cart.total_cost}\n",
        "\nItems:\n",
        build_order_items_table(cart.items),
        "##### Shipping Information:",
        f"  - **Shipping Option**: {shipping_option.name}",
        f"  - **Shipping Cost**: {shipping_option.base_price}",
        f"\n ##### Total Cost: {cart.total_cost + shipping_option.base_price}",
        "##### Payment & Shipping Address Details:",
        f"  - **Payment Method**: {payment.payment_option.name}",
        "  - **Shipping Address**:",
        f"    - Address Line 1: {shipping.address_line_1}",
        f"    - Address Line 2: {shipping.address_line_2}",
        f"    - City: {shipping.city}",
        f"    - State: {shipping.state}",
        f"    - Postal Code: {shipping.postal_code}",
        f"    - Country: {shipping.country}",
        "\n\nYour order will be processed based on this information. Please ensure all details are accurate before proceeding. Do you confirm?",
    ]

    return "\n".join(lines)


def build_order_items_table(items: list) -> str:
    table = "\n| Product | Quantity | Price | Total | Image |\n| --- | --- | --- | --- | --- |"
    for item in items:
        total_price = item.product.price * item.quantity
        table += (
            f"\n| {item.product.name} | {item.quantity} | {item.product.price} "
            f"| {total_price} | ![{item.product.name}]({item.product.thumbnail}) |"
        )
    return table + "\n"
