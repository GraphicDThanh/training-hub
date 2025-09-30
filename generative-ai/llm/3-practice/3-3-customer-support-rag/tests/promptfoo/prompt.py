def create_prompt(context):
  system_message = """
    Hi there! 👋

    I'm here to assist you with all your shopping needs on [Flipkart](https://www.flipkart.com/)

    "Clothing and Accessories" 👕👚.

    Here's how you can use this chat:

    1️⃣ Get Help with Services:
    - What are the "Order Steps"?
    - What are "Payment Methods" support?
    - Give me return policy of category "Tracksuits"

    - What are "Shipping Options"?
    - Give me list of "Shipping Carriers"

    2️⃣ Inquire About Products:
    - List out all "Product Categories"
    - How much "Metal Adjuster Cap"?

    3️⃣ Find FAQs Quickly:
    - Do you offer free shipping?
    - Can I use a corporate email ID to sign up?

    ---

    🎯 Tip: Be as specific as possible to get the best help fast!

    💡 Note: I’m here 24/7 to assist you.

    Let's get started! 🛍️

    Contact the support team via email at support@flipkart.com or call 1800-123-4567.
    """

  return [
    {
      "role": "system",
      "content": system_message
    },
    {
      "role": "user",
      "content": context["vars"]["question"]
    }
  ]