# Build a Customer Support Bot

> **Build**: a customer support chatbot for an airline to help users research and make travel arrangements.
> **Learn target**: gain an understanding of LangGraph's key concepts and architectures.
> ([tutorial link](https://langchain-ai.github.io/langgraph/tutorials/customer-support/customer-support/#build-a-customer-support-bot))


## Preparation:
### Step 1: Setup env
```bash
uv sync
source ./.venv/bin/activate
```
### Step 2: Populate db
```bash
uv run python scripts/populate_db.py
```

### Debug:
- Add debug point: `from remote_pdb import RemotePdb; RemotePdb("127.0.0.1", 4444).set_trace`
- Access debugger: `telnet 127.0.0.1 4444`