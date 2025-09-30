# 🛍️ Ecommerce Customer Support Agent

This repo is an implementation of a chatbot specifically focused on question answering over the Ecommerce website
Built with [LangChain](https://github.com/langchain-ai/langchain/), [LangGraph](https://github.com/langchain-ai/langgraph/), and [Streamlit](https://streamlit.io/).

![](assets/images/1-agent.png)

## Prerequisites
- [uv](https://docs.astral.sh/uv/)
- [pre-commit](https://pre-commit.com/)
- [make](https://www.gnu.org/software/make/)

## 🔑 Tech Stack
- Python
- LangChain
- LangSmith
- LangGraph
- LangServe
- Streamlit
- OpenAI models:
  - Chat model: `gpt-4o-mini`
  - Embedding model: `text-embedding-3-small`
- Architecture:
  - Agent architect: multi-agents
  - App architect: client-server

### Tech Stack Introduction
- Language
  - [Python](https://www.python.org/): Python is a programming language that lets you work quickly and integrate systems more effectively.
- Framework
  - [LangChain](https://langchain.com/): LangChain’s flexible abstractions and AI-first toolkit make it the #1 choice for developers when building with GenAI.
  - [LangSmith](https://www.langchain.com/langsmith): LangSmith is an all-in-one developer platform for every step of the LLM-powered application lifecycle, whether you’re building with LangChain or not. Debug, collaborate, test, and monitor your LLM applications.
  - [LangGraph](https://www.langchain.com/langgraph): Gain control with LangGraph to design agents that reliably handle complex tasks. Build and scale agentic applications with LangGraph Platform.
  - [LangServe](https://python.langchain.com/docs/langserve): LangServe helps developers deploy LangChain runnables and chains as a REST API. This library is integrated with FastAPI and uses pydantic for data validation.
- Library
  - [Streamlit.io](https://streamlit.io/): A faster way to build and share data apps. Streamlit turns data scripts into shareable web apps in minutes. All in pure Python. No front‑end experience required.
- Vector Store
  - [Chroma](https://docs.trychroma.com/): Chroma is the AI-native open-source vector database. Chroma makes it easy to build LLM apps by making knowledge, facts, and skills pluggable for LLMs.
    - [LangChain integrate with Chroma](https://python.langchain.com/docs/integrations/vectorstores/chroma/)


## 🛠️ Tools
- [uv](https://docs.astral.sh/uv/): Python package manager
- [pre-commit](https://pre-commit.com/): Git hooks
- [ruff](https://github.com/astral-sh/ruff): Python linter
- [langchain-cli](https://python.langchain.com/docs/langchain-cli/): LangChain CLI
- [remote-pdb](https://github.com/jupyter/remote-pdb): Remote debugger

## Code Structure
```
├──client/
├──server/
├──├── agents/ - Different agent implementations (supervisor, service, product, etc.)
├──├── apis/ - API routers and middleware
├──├── common/ - Shared utilities, entities, constants
├──├── rag/ - Retrieval-augmented generation system
├──├── repositories/ - Data access layer
├──├── services/ - Business logic
├──├── scripts/ - Utility scripts
├──├── workflow/ - Workflow
├──└── main.py - Application entry point
├──supabase/
├──README.md
├──pyproject.toml
└──Makefile
```

## 📚 Setup
### ⬇️ Clone repo
- Clone repo with branch
  ```bash
  git clone https://gitlab.asoft-python.com/thanh.nguyen/multi-agents-training.git
  ```
- Access repo folder
  ```bash
  cd multi-agents-training
  ```
- Checkout to project branch (if needed)
  ```bash
  git checkout practice/automating-ecommerce-agent
  cd 5-practice/automating-ecommerce-agent
  ```
- Access project folder
  ```bash
  cd 5-practice/automating-ecommerce-agent
  ```

### 📦 Init environment
- Install dependencies: `uv sync`
- Access virtual environment: `source .venv/bin/activate`
- Create a `.env`: `cp .env.example .env` and fill require environment variables
  ```bash
  OPENAI_API_KEY=
  LANGCHAIN_API_KEY=
  LANGCHAIN_PROJECT=
  ```
- Load env: `make load_env`

OR

```
export OPENAI_API_KEY=
...
```

### 📚 Prepare data (only needs to be done once)
- Run `make create_knowledge_base`

### ✅ Running app
1. 🤖 Server App: `make run_server`

2. 🎉 Client App: `make run_client`

## Documents
- [Practice Document](https://docs.google.com/document/d/1MbKpfOL28SwjFMueOJEwStXAxfrQnbonCNWDVEk7pP4)
- [Diagram](https://whimsical.com/llm-practice-FXQKsCa4VDeRMqkNnc9J2y@2bsEvpTYSt1HjAkUH64LpYtPFrf2AqCCnNz)
- [Slide Review](https://docs.google.com/presentation/d/198PTE42bET8gOUJOixdVGH8gdffTNa4lmgRHpYxXTqc/edit?usp=sharing)

## Authors
- Thanh Nguyen