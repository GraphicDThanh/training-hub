# Customer Support Agent
## Installation
1. Clone the repository
2. Access project: `cd customer-support-agent`
3. Install dependencies: `uv install`
4. Run app: `uv run streamlit run src/app.py`

## Code Structure
```
customer-support-agent/
├── docs/
├── data/                       # Data directory
│   ├── documents/              # Raw documents
│   ├── embeddings/             # Pre-trained embeddings
|
├── src/                        # Core application code
│   ├── __init__.py
|   ├── rag/                   # RAG-specific components
│   |   ├── __init__.py
│   |   ├── loaders/
|   |   |   ├── __init__.py
|   |   |   ├── base_loader.py
|   |   |   ├── txt_loader.py
|   |   |   ├── json_loader.py
|   |   |
│   |   ├── vector_stores/
|   |   |   ├── __init__.py
|   |   |   ├── base_store.py
|   |   |   ├── faiss_store.py
|   |   |
|   |   ├── retrievers/
|   |   |   ├── __init__.py
|   |   |   ├── base_retriever.py
|   |   |   ├── similarity_search_retriever.py
|   |   |
|   |   ├── chains/
|   |   |   ├── __init__.py
|   |   |   ├── chain.py
|   |   |
|   |   ├── text_splitters/
|   |   |   ├── __init__.py
|   |   |   ├── base_splitter.py
|   |   |   ├── text_splitter.py
|   |
|   ├── models/
|   |   ├── __init__.py
|   |   ├── base_model.py
|   |   ├── openai_model.py     # OpenAI GPT integration
|   |
|   ├── prompts/                # Prompt templates for LLMs
|   |   ├── __init__.py
|   |   ├── prompt_template.py
|   |
|   ├── parsers/                 # Output parser
|   |   ├── __init__.py
|   |   ├── output_parser.py
|   |
|   ├── callbacks/
|   |   ├── __init__.py
|   |   ├── callback_handler.py
|   |
|   ├── utils/
|   |   ├── __init__.py
|   |   ├── logger.py
|   |   ├── config.py
|   |   ├── exception_handler.py
|   |
|   ├── evaluation/
|   |   ├── __init__.py
|   |   ├── user_feedback.py
|   |   ├── performance.py
|   |
|   ├── memory/
|   |   ├── __init__.py
|   |
|   ├── app.py                  # Main application entry point
|
├── tests/
│   ├── __init__.py
│   ├── test_app.py
│   ├── test_loaders.py
│   ├── test_retrievers.py
│   ├── test_chains.py
│   ├── test_splitters.py
│   ├── test_parsers.py
|
├── README.md
├── pyproject.toml
├── .env
```

## Able to do
- Give me return policy by category "Tracksuits".
- What is the order steps?
- What are payment methods support?
- Give me "Product Categories.

## Remaining
- Error handling
- Render chat conversation not correct
- Ask for price not working
- Load files every request

