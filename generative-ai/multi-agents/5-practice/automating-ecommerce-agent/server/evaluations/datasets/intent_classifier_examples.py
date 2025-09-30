examples = [
    # Greeting intent examples
    {
        "inputs": {"messages": [{"role": "user", "content": "Hi"}]},
        "outputs": {"query_intent": "greeting"},
    },
    # Service intent examples
    {
        "inputs": {
            "messages": [{"role": "user", "content": "Do you offer free shipping?"}]
        },
        "outputs": {"query_intent": "service"},
    },
    {
        "inputs": {
            "messages": [
                {"role": "user", "content": "Help me create a support ticket."}
            ]
        },
        "outputs": {"query_intent": "service"},
    },
    {
        "inputs": {
            "messages": [{"role": "user", "content": "Give me product categories"}]
        },
        "outputs": {"query_intent": "product"},
    },
    {
        "inputs": {
            "messages": [{"role": "user", "content": "Give me list of policies"}]
        },
        "outputs": {"query_intent": "service"},
    },
    # Product intent examples
    {
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": 'Give me product "Dreamy Styled Collar Shirt"',
                }
            ]
        },
        "outputs": {"query_intent": "product"},
    },
    {
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": 'Compare "Viviane Pleated Fitted Dress" and "Pauline Neckline Fitted Dress"',
                }
            ]
        },
        "outputs": {"query_intent": "product"},
    },
    # Cart intent examples
    {
        "inputs": {
            "messages": [
                {"role": "user", "content": "Add Viviane Pleated Fitted Dress to cart"}
            ]
        },
        "outputs": {"query_intent": "cart"},
    },
    {
        "inputs": {"messages": [{"role": "user", "content": "Clear my cart"}]},
        "outputs": {"query_intent": "cart"},
    },
    {
        "inputs": {"messages": [{"role": "user", "content": "Get my cart detail"}]},
        "outputs": {"query_intent": "cart"},
    },
    {
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": 'Remove "Viviane Pleated Fitted Dress" from cart',
                }
            ]
        },
        "outputs": {"query_intent": "cart"},
    },
    # Order intent examples
    {
        "inputs": {"messages": [{"role": "user", "content": "Get my orders"}]},
        "outputs": {"query_intent": "order"},
    },
    # Unknown intent examples
    {
        "inputs": {
            "messages": [{"role": "user", "content": "What is the weather like today?"}]
        },
        "outputs": {"query_intent": "unknown"},
    },
    {
        "inputs": {"messages": [{"role": "user", "content": "Tell me a joke"}]},
        "outputs": {"query_intent": "unknown"},
    },
    {
        "inputs": {"messages": [{"role": "user", "content": "???"}]},
        "outputs": {"query_intent": "unknown"},
    },
]
