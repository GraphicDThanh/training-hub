import streamlit as st

st.markdown(
    """
    Thank you for choosing us! Welcome to Agent User Guide 👋

    ### Here are some tips to help you get started:

    💁‍♀️ Get Help with Services:
    - Give me list categories
    - Give me list policies
    - Do you allow return product?
    - What is your privacy policy?
    - Do you offer free shipping?

    💁‍♀️ Inquire About Products in Store:
    - Search products:
        - Do you have "Oversize Piece Suits Blazer"
        - Give me product "SOLAR Stylish V-neck Dress"
    - Compare products:
        - Compare "Black Dahlia Boat Neck Dress" and "Leopard Silk Flared Dress with Collar"
        - Compare "Straight Cut Button-down Collar Shirt" with "DIVAS Polo T-shirt"
        - Compare "Echo Polo - Regular fit knitted polo shirt" and "Daily Metagent T-shirt"
    - Is "Magnolia Tuytsi Blazer" in stock?
    - Do you have "Magnolia Tuytsi Blazer" in size L?
    - Give me 2 products in category "shirt".

    💁‍♀️ Find FAQs Quickly:
    - How can I change the delivery address for my order?
    - How can I maintain the shape of my clothing?

    💁‍♀️ Create support ticket:
    - I want to create a support ticket.
    - Help me create a support ticket with below details:
        - Name: "John Doe"
        - Email: "john.doe@gmail.com"
        - Phone number: "0123456789"
        - Subject: "I have a problem with my order"
        - Description: "I received the wrong item in my order. Help me resolve this issue."

    ---
    ### Unlock more features by logging in to your account! 🚀

    🚀 Profile:
    - Get my profile.

    🚀 Cart Management:
    - Adđ product "Flowing basic shirt" to cart.
    - Remove product "Flowing basic shirt" out of cart.
    - Show me my cart.
    - Clear my cart.

    🚀 Order Management:
    - Show me my order history.
    - Show my order with id <your-order-id>.
    - Cancel my order "<your-order-id>" because "<your-reason-to-request-cancel>".
    - Return order "<your-order-id>" because "<your-reason-to-request-return>".

    ---
    🎯 Tip:
    - ✅ Use example to get started easily and more accuracy.
    - ✅ Be as short and specific as possible.
    ---
    """
)

st.markdown("---")

st.page_link("pages/agent.py", label="Let’s get started!", icon="🛍️")
