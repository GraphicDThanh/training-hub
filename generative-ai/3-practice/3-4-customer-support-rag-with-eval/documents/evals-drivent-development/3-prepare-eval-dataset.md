# Prepare Evaluation Dataset
1. Representative Inputs
   - Collect queries that reflect real-world scenarios in the clothing and accessories domain.
   - Include diverse query types:
       - Service Information: "How do I track my order?", "What are the shipping options?", "What is the refund policy for shoes?".
       - Product Queries: "Show me jackets under $100.", "What are the features of the leather belt?".
   - Ensure queries cover a mix of intents: FAQs, specific details, and edge cases (e.g., typos, ambiguous queries).
   - Input formats: Free-text queries, short questions, and command-like inputs.
2. Gradient of Difficulty
    - Simple: Straightforward queries with a direct answer in the knowledge base:
        - Example: "What are your shipping carriers?"
    - Moderate: Queries requiring synthesis of multiple knowledge base entries:
        - Example: "What are the shipping options for international orders?"
    - Challenging: Ambiguous or incomplete queries requiring inference or clarification:
        - Example: "What is your policy for returns?" (No product category provided).
3. Human-Reviewed Labels
   - Manually create a labeled dataset with:
       - Query: Customer input.
       - Expected Output: Ideal response matching the knowledge base.
       - Reasoning: Explanation of why this is the correct response for ambiguous cases.
   - Have domain experts (e.g., customer support representatives or product managers) review the labels to ensure accuracy and consistency.
   - Use a validation process to resolve disagreements among reviewers and establish a gold-standard dataset.

Example Dataset Structure:


| Query | Expected Response | Reasoning |
|-------|-------------------|-----------|
| What are the "Order Steps"? |  Order steps are:<br>- Browse and select products<br>- Add products to cart<br>- ... | The response provides a step-by-step guide to orders. Retrieve information from `order-process.json` |


### Evaluation dataset for "Services"
- FAQs
    > `faqs.txt`

| Query | Expected Response | Reasoning |
|-------|-------------------|-----------|
| How long does it take to cancel an order? |  Cancellation of item(s) in an order happens immediately if the order hasn't been shipped yet by the seller. If your order has been shipped, it will be cancelled as soon as the courier service confirms that the shipment is being returned to the seller. Orders from certain categories cannot be cancelled after 24 hours, please check the product page for more details. | The response correctly with data retrieval from `faqs.txt` |
| Can I use a corporate email ID to sign up? |  Yes, you can use a corporate email ID. However, please ensure that you have updated your current active email address. This will help you to continue using your account in the unlikely event of your account getting deleted or deactivated. | The response correctly with data retrieval from `faqs.txt` |

- Order Process
    > `order-process.json`

| Query | Expected Response | Reasoning |
|-------|-------------------|-----------|
| What are the "Order Steps"? |  Order steps are:<br>- Browse and select products<br>- Add products to cart<br>- Proceed to checkout<br>- Enter shipping and billing information<br>- Choose payment method<br>- Review and confirm order<br>- Order placed successfully  | The response provides a step-by-step guide to orders. Retrieve information from `order-process.json` |
| What are "Payment Methods" support?| We support the following payment methods:<br>- Cash on Delivery<br>- Gift Card / Wallet<br>- Visa, MasterCard, Maestro and American Express Credit or Debit cards issued in India and 21 other countries. | The response lists the payment methods supported by the platform. Retrieve information from `order-process.json` |

- Shipping Information
    > `shipping-info.txt`

| Query | Expected Response | Reasoning |
|-------|-------------------|-----------|
| Do you offer free shipping? |  Free shipping is available on orders over $500. | The response correctly with data retrieval from `shipping-info.txt` |
| List out "Shipping Carriers". |  We use E-Kart, Gati, Delhivery, Blue Dart, Ecom, DotZot and Speed Post - India Post for shipping. | The response provides a list of shipping carriers from `shipping-info.txt` |

- Returns and Refunds
    > `returns-and-refunds.csv`

| Query | Expected Response | Reasoning |
|-------|-------------------|-----------|
| What is the return policy for "Bottomwear"? | Category "Bottomwear" allow to return within 30 days with condition unused and unwashed with original tags. | The response provides the return policy for a specific category. Retrieve information from `returns-and-refunds.csv` |

- Customer Support

| Query | Expected Response | Reasoning |
|-------|-------------------|-----------|
| How can I contact customer support? |  You can reach our customer support team at support@flipkart.com or call 1800-123-4567 | The response provides contact information for customer support. |

### Evaluation dataset for "Products"
- Product Categories
    > `product-information.txt`

| Query | Expected Response | Reasoning |
|-------|-------------------|-----------|
| List out all "Product Categories" |  We have the following product categories:<br>- Bottomwear<br>- Clothing Accessories<br>- Winter Wear<br>- Topwear<br>- Innerwear and Swimwear<br>- Kurtas, Ethnic Sets and Bottoms<br>- Tracksuits<br>- Sleepwear | The response lists the available product categories. Retrieve information from `product-information.txt` |

- Product Information
    > `products.json`

| Query | Expected Response | Reasoning |
|-------|-------------------|-----------|
| How much "Metal Adjuster Cap"? |  The Metal Adjuster Cap is priced at $25. | The response provides the price of a specific product. Retrieve information from `products.json` |

### Evaluation dataset for not supported queries

| Query | Expected Response | Reasoning |
|-------|-------------------|-----------|
| What is the best phone to buy? |  Sorry, I can't find the information you're looking for right now. Please contact support. | The response indicates that the query is not supported by the chatbot. |
| Tell me about your competitors. |  Sorry, I can't provide information about competitors. | The response indicates that the chatbot cannot discuss competitors. |
| How do I cook pasta? |  Sorry, I can't find the information you're looking for right now. Please contact support. | The response indicates that the query is not relevant to the platform. |

### Action:
1. Generate Dataset: Run `evals/1_create_bot_draft_dataset.py` to create dataset draft.
2. Data Labeling: Review and refine the dataset (Google Sheet).