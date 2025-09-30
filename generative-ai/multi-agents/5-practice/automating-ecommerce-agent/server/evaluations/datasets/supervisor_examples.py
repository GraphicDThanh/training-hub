examples = [
    # Greeting
    {
        "description": "Supervisor answer greeting intent directly.",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Hi"},
            ],
            "is_authenticated": False,
        },
        "outputs": {"response": "Hi there! How can I help you today?"},
    },
    # Authentication required actions - direct answer
    {
        "description": "Supervisor answer authentication required action directly.",
        "inputs": {
            "messages": [
                {"role": "user", "content": "Get my cart"},
            ],
            "is_authenticated": False,
        },
        "outputs": {"response": "You need to be logged in to access this feature."},
    },
    # Not relevant questions
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
                "I’m here to assist with shopping inquiries. Can I help you with something else?"
            )
        },
    },
    # Unsecured actions
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
                "I’m here to assist with shopping inquiries. Can I help you with something else?"
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
