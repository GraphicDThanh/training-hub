## 1. Define the Problem
> Clothing and Accessories Store

- Customers often experience difficulties accessing quick support for order processes, shipping details, refunds, and product information.
- Traditional support systems lead to delays and repetitive inquiries, reducing customer satisfaction and efficiency.

Let's build a **Customer Support chatbot**: automated response user query system to provide instant and accurate information on service and product-related queries (**with great evals**).

### Goals
- **Reduce cost**
  - Minimize the need for human agents to handle repetitive queries.
  - Improve operational efficiency by automating customer support.
- **Minimize latency**
  - Provide instant responses to customer queries.
  - Enhance customer satisfaction by delivering quick and accurate information.
- **Accurate and Relevant Information**
  - Retrieve information from a reliable knowledge base.
  - Ensure response relevance with context and accuracy.
- **Avoid Harm**
  - Minimize incorrect outputs
  - Avoid hallucination
  - Don't share personal information.

### Use Cases
1. **Service Information:**
- Guide customers through the order process.
- List shipping methods and carriers.
- Provide refund policies based on categories.
- Retrieve answers to frequently asked questions.
2. **Product Support:**
- Display product categories.
- Share basic product details (name, price, description).

### Knowledge Base
- **Service documents:**
  - `faqs.txt`: Frequently asked questions.
  - `order_process.txt`: Order process steps and payment methods support.
  - `shipping-info.txt`: Shipping options, carriers and free ship condition.
  - `returns-and-refunds.csv`: Return window and condition by categories.
- **Product documents:**
  - `product-infomation.txt`: Product categories.
  - `products.json`: Product details (name, price, description).

## What good looks like
A successful chatbot implementation for the clothing and accessories store would:

1. **Provide Accurate and Relevant Information**
   - Respond instantly to customer queries with precise details about order processes, shipping methods, refund policies, and product information.
   - Retrieve and display relevant FAQs, ensuring consistency and reliability.
   - Gentle decline when unable to provide an answer.
2. **Enhance Customer Experience**
   - Reduce response times and eliminate the frustration of navigating traditional support channels.
   - Present information in a clear, concise, and user-friendly manner.
3. **Improve Operational Efficiency**
   - Handle repetitive queries autonomously, freeing up human agents to focus on more complex issues.
   - Maintain scalability to manage an increasing number of queries without additional resources.
4. **Deliver Comprehensive Product Support**
   - Showcase organized product categories and detailed product information, such as names, prices, and descriptions, to assist with purchase decisions.
   - Allow customers to quickly access and explore the product catalog.
5. **Leverage a Robust Knowledge Base**
   - Accurately retrieve data from well-structured service and product documents.
   - Ensure the chatbot stays up-to-date with the latest store policies, offerings, and inventory details.

### RAG Steps
- **Indexing**:
    - Load and split documents.
    - Store indexed documents.
- **Retrieval and Generation**:
    - Retrieve relevant information.
    - Generate responses based on retrieved data.
