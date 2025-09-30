examples = [
    {
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Give me product Dreamy Styled Collar Shirt",
                }
            ]
        },
        "outputs": {
            "response": "Here are the details for the **Dreamy Styled Collar Shirt**:\n\n- **Name**: Dreamy Styled Collar Shirt\n- **Description**: This design is part of the Dreamy Bloom collection, a perfect companion for women, helping them always shine. The product is made from premium materials, soft as if caressing the wearer's skin. Every detail of the outfit is meticulously crafted, from the elegant silhouette to the feminine touch.\n- **Price**: $17.00\n- **Available Sizes**: S, M, L, XL, XXL\n- **Thumbnail**: ![Thumbnail](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/11/05/a071b83c16f697e65538597314d51f9e.webp)\n- **Product URL**: [View Product](https://ivymoda.com/sanpham/ao-so-mi-dreamy-co-kieu-ms-16m8968-41265)\n- **Quantity Available**: 36\n\nLet me know if you need more information!",
        },
    },
    {
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Compare Straight Cut Button-down Collar Shirt with DIVAS Polo T-shirt",
                }
            ]
        },
        "outputs": {
            "response": """
                Here is the comparison between the **Straight Cut Button-down Collar Shirt** and the **DIVAS Polo T-shirt**:

| Product Name                             | Price | Available Quantity | Description                                                                                                                                                                                                 | Size Available      | Image                                                                                     | Product URL                                                        |
|------------------------------------------|-------|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|-------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| Straight Cut Button-down Collar Shirt    | $17   | 51                 | The shirt provides comfort while remaining impressive, suitable for various occasions from office to street wear. - Button-down collar design brings elegance and neatness, suitable for both office and casual styles. - Modern zipper detail creates a novel accent and adds convenience when wearing. | S, M, L, XL, XXL    | ![Straight Cut Button-down Collar Shirt](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/12/06/06ae1f0d2157a7b14479f3e01b18c3bc.webp) | [👉 Shop Now](https://ivymoda.com/sanpham/ao-so-mi-co-duc-dang-suong-ms-16m8962-41263) |
| DIVAS Polo T-shirt                       | $15   | 96                 | The design is chosen from the Office Divas collection, deeply embodying modern style exclusively for women. The minimalist design language is cleverly accentuated with soft stylized details that not only elevate elegant beauty but also express independent personality and sophisticated fashion. | S, M, L, XL, XXL    | ![DIVAS Polo T-shirt](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/12/06/6b990bd1d618a2811f8692590c4e5ce6.webp) | [👉 Shop Now](https://ivymoda.com/sanpham/ao-thun-co-duc-divas-ms-58m8987-41306) |

Feel free to ask if you need more information!"""
        },
    },
    {
        "inputs": {
            "messages": [
                {
                    "role": "user",
                    "content": "Is there Flowing basic shirt in the store?",
                }
            ]
        },
        "outputs": {
            "response": "It appears that the product "
            "Flowing basic shirt"
            " is not found in the store. Would you like to expand your search with Google Shopping?"
        },
    },
]

trajectory_examples = [
    {
        "inputs": {
            "inputs": {
                "messages": [
                    {
                        "role": "user",
                        "content": "Give me product Dreamy Styled Collar Shirt",
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
                            "content": "Here are the details for the **Dreamy Styled Collar Shirt**:\n\n- **Name**: Dreamy Styled Collar Shirt\n- **Price**: $17.00\n- **Available Quantity**: 36\n- **Description**: This design is part of the Dreamy Bloom collection, a perfect companion for women, helping them always shine. The product is made from premium materials, soft as if caressing the wearer's skin. Every detail of the outfit is meticulously crafted, from the elegant silhouette to the feminine touch.\n- **Sizes Available**: S, M, L, XL, XXL\n- **Image**: ![Dreamy Styled Collar Shirt](https://pubcdn.ivymoda.com/files/product/thumab/1400/2024/11/05/a071b83c16f697e65538597314d51f9e.webp)\n- **Product URL**: [👉 Shop Now](https://ivymoda.com/sanpham/ao-so-mi-dreamy-co-kieu-ms-16m8968-41265)",
                        }
                    ],
                }
            ],
            "steps": [["__start__", "agent", "tools", "agent"]],
            "tool_calls": [
                {"name": "sql_db_list_tables", "args": {}},
                {"name": "sql_db_schema", "args": {"table_name": "products"}},
                {
                    "name": "check_and_execute_query_tool",
                    "args": {
                        "query": "SELECT * FROM products WHERE name LIKE '%Dreamy Styled Collar Shirt%';"
                    },
                },
            ],
        },
    }
]
