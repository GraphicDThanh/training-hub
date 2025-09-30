trajectory_examples = [
    {
        "inputs": {
            "inputs": {
                "messages": [
                    {
                        "role": "user",
                        "content": "Do you offer free shipping?",
                    },
                ]
            },
        },
        "outputs": {
            "inputs": [],
            "results": [
                {
                    "messages": [
                        {
                            "role": "assistant",
                            "content": "Yes, free shipping is available on orders over 1 million VND.",
                        },
                    ],
                }
            ],
            "steps": [["__start__", "assistant", "safe_tools", "assistant"]],
            "tool_calls": [
                {
                    "name": "lookup_documents",
                    "args": {
                        "document_request": {
                            "query": "Do you offer free shipping?",
                            "service_categories": ["faqs"],
                        }
                    },
                }
            ],
        },
    },
    {
        "inputs": {
            "inputs": {
                "messages": [
                    {
                        "role": "user",
                        "content": "Give me list policies",
                    },
                ]
            },
        },
        "outputs": {
            "inputs": [],
            "results": [
                {
                    "messages": [
                        {
                            "role": "assistant",
                            "content": """
                                Here is a list of our policies:

                                1. **Payments Policy**
                                - There are two payment methods when shopping online at IVY moda:
                                    - Cash on Delivery (COD): Customers will pay when receiving the goods, including the cost of the items and shipping fees to the delivery personnel.
                                    - Online Payment via OnePay using domestic ATM cards or international cards directly on the website.

                                2. **Returns Policy**
                                - Returns are accepted within 15 days from the date the customer receives the items.
                                - Applicable at all IVY moda stores and the Online Warehouse system of IVY moda.
                                - The returned items must still have the original tags, barcodes, and be unused, with the original invoice attached.

                                3. **Warranty Policy**
                                - When shopping at IVY moda, you will receive lifetime free warranty privileges! However, this policy excludes special cases such as:
                                    - Products with the IVY Secret or IVY Accessories label: underwear, camisoles, accessories (bags, shoes, belts...), cotton/wool, cotton wool products, jeans.

                                4. **Shipping Policy**
                                - [Details not provided in the retrieved documents.]

                                5. **Privacy Policy**
                                - [Details not provided in the retrieved documents.]

                                If you need more specific information about any of these policies, feel free to ask!
                                """,
                        },
                    ],
                }
            ],
            "steps": [["__start__", "assistant", "safe_tools", "assistant"]],
            "tool_calls": [
                {
                    "name": "lookup_documents",
                    "args": {
                        "document_request": {
                            "query": "What are your policies?",
                            "service_categories": ["policies"],
                        }
                    },
                }
            ],
        },
    },
]


trajectory_examples_with_interrupt = [
    {
        "inputs": {
            "inputs": {
                "messages": [
                    {
                        "role": "user",
                        "content": """
                            Help me create a support ticket with below details:
                            - Name: "John Doe"
                            - Email: "john.doe@gmail.com"
                            - Phone number: "0123456789"
                            - Subject: "I have a problem with my order"
                            - Description: "I received the wrong item in my order. Help me resolve this issue."
                        """,
                    },
                ],
            },
            "human_action": "approve",
        },
        "outputs": {
            "inputs": [],
            "results": [
                {
                    "messages": [
                        {
                            "role": "assistant",
                            "content": "Your support ticket has been created successfully. Here are the details:\n\n- **Name:** John Doe\n- **Email:** john.doe@gmail.com\n- **Phone Number:** 0123456789\n- **Subject:** I have a problem with my order\n- **Description:** I received the wrong item in my order. Help me resolve this issue.\n\nIf you need any further assistance, feel free to ask!",
                        },
                    ],
                }
            ],
            "steps": [["__start__", "assistant", "sensitive_tools", "assistant"]],
            "tool_calls": [
                {
                    "name": "create_support_ticket",
                    "args": {
                        "data_request": {
                            "email": "john.doe@gmail.com",
                            "subject": "I have a problem with my order",
                            "name": "John Doe",
                            "phone": "0123456789",
                            "description": "I received the wrong item in my order. Help me resolve this issue.",
                        }
                    },
                }
            ],
        },
    },
    {
        "inputs": {
            "inputs": {
                "messages": [
                    {
                        "role": "user",
                        "content": """
                            Help me create a support ticket with below details:
                            - Name: "John Doe"
                            - Email: "john.doe@gmail.com"
                            - Phone number: "0123456789"
                            - Subject: "I have a problem with my order"
                            - Description: "I received the wrong item in my order. Help me resolve this issue."
                        """,
                    },
                ],
            },
            "human_action": "reject",
        },
        "outputs": {
            "inputs": [],
            "results": [
                {
                    "messages": [
                        {
                            "role": "assistant",
                            "content": "Thank you for your feedback. I will not create the above ticket. Let me know if I can assist you with anything else.",
                        },
                    ],
                }
            ],
            "steps": [
                ["__start__", "assistant", "sensitive_tools", "__start__", "assistant"]
            ],
            "tool_calls": [
                {
                    "name": "create_support_ticket",
                    "args": {
                        "data_request": {
                            "email": "john.doe@gmail.com",
                            "subject": "I have a problem with my order",
                            "name": "John Doe",
                            "phone": "0123456789",
                            "description": "I received the wrong item in my order. Help me resolve this issue.",
                        }
                    },
                }
            ],
        },
    },
]
