The project is about a multi-agents for ecommerce system with architect supervisor sub-graphs.
Currently, there are these agents:
- `supervisor_agent`: observation to delegate to sub-agents.
- `intent_classifier_agent`: Classify the user’s intent.
- `greeting_agent`: Response to greetings, unrecognized input, or unsecure queries.
- `service_agent`: Answer question of FAQs, shop policies, or create a support ticket.
- `product_agent`: Answer product questions and fashion-related products comparisons, product categories, help retrieve product for cart actions if needed.
- `cart_agent`: Handles query about cart actions such as get cart detail, add item to cart, remove item out of cart, clear cart, or check out cart.
- `order_agent`: get orders history, get order detail, cancel order, return order.
- `customer_agent`: Get profile information.

