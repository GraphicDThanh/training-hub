## 2. Define eval criteria
1. **Specificity in Responses**
   - **Accuracy**: Responses must match the knowledge base data (e.g., correct product name, price, shipping method).
   - **Relevance**: Responses must align with the query context (e.g., return conditions for a specific category).
   - **Clarity**: Responses should be concise, easy to understand, and formatted for readability.
   - **Evaluation**: Use exact-match comparison for FAQs and numerical fields like prices, and semantic similarity for contextual queries.
   - **Rejection Handling**: Provide a clear message when the chatbot cannot answer a query.
2. **Indicators of Good Performance**
   - **Precision and Recall**:
       - **Precision**: At least 95% of the chatbot's responses must accurately address the query.
       - **Recall**: At least 90% of the relevant knowledge base must be utilized when responding to queries.
   - **Response Time**: Ensure responses are generated within 2 seconds on average.
   - **Customer Satisfaction**: Maintain a user rating of 4.5/5 or above on test scenarios.
3. **Safeguards Against Failures**
   - **Fallback Handling**: Ensure 100% coverage for unanswerable queries by providing a fallback message like "Sorry, I can't find the information you're looking for right now. Please contact support."
   - **Error Detection**: Use health checks to ensure the knowledge base is accessible and prevent empty or incomplete responses.
   - **Hallucination Prevention**:
     - Verify responses by cross-referencing retrieved data with the knowledge base before generating an answer.
     - Bot should not talk about toxic things, competitors, or unrelated topics.
4. **Borrow Existing Evaluators and Patterns**
   - **Promptfoo Evaluation**:
        - Create test sets with diverse customer queries, including edge cases.
        - Use Promptfoo's ranking and scoring mechanism to evaluate chatbot performance against predefined gold-standard responses.
    - **LangChain Built-In Testing**:
        - Validate retrieval with RetrievalQA tools to confirm correct document retrieval.
        - Evaluate response generation using LangChain's chain-of-thought prompting for structured answers.
5. **Performance Goals**
   - **Knowledge Retrieval**: Ensure at least 95% of relevant documents are retrieved correctly during testing.
   - **Accuracy**: Target a 90% or higher accuracy score in Promptfoo evaluations for common customer queries.
   - **Resilience**: Handle 100% of test cases with either an accurate response or a fallback message.
   - **Speed**: Maintain an average response generation time under 2 seconds during peak load testing.