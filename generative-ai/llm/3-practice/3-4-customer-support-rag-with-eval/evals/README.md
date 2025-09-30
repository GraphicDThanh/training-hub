# Evaluations
## Setup
- Access to evals folder: `cd evals`
- Ingest data for evals:
  - `uv run evals/rag/ingest/ingest_faqs.py`
  -
## Commands
- Check version or install: `npx promptfoo@latest --version`
- Run evals
```
npx promptfoo@latest eval -c ./promptfooconfig/retrievers/rag_docs_retrieval_promptfooconfig.yaml --no-cache
```
- Run preview: `npx promptfoo@latest view`
- Run with no cache: `--no-cache`
- Run with DEBUG on: `LOG_LEVEL=debug npx promptfoo...`
- Run more info: `--verbose`

## Promptfoo Config Files
All configuration files under `promptfooconfig` folder
### Retriever evals

- FAQ: `npx promptfoo@latest eval -c ./promptfooconfig/retrievers/faqs_docs_retrieval_promptfooconfig.yaml --no-cache`
- Information: `npx promptfoo@latest eval -c ./promptfooconfig/retrievers/policies_retrieval_promptfooconfig.yaml --no-cache`
- Policies: `npx promptfoo@latest eval -c ./promptfooconfig/retrievers/policies_retrieval_promptfooconfig.yaml --no-cache`

- View: `npx promptfoo@latest view`

## Dataset:
- Generate draft dataset
  ```bash
  cd src/evals
  python generators/1_create_bot_draft_dataset.py
  # output: evals/data/draft_chatbot_outputs_n={x}_{%Y-%m-%d_%H-%M-%S}.csv
  ```
  - Data Labeling
    Open draft dataset (with Google Sheet for example), update then save it as named like `evals/data/reviewed_chatbot_outputs_n=12_2024-12-06_16-55-04.csv.csv`

- Generate tests for eval from reviewed dataset in step 2
  - Stand at folder `3-4-customer-support-rag-with-eval`
  - Run script in `./2_chatbot_eval.py` to generate evals from reviewed dataset
  - The script will generate yaml file in `evals/data/promptfoo_eval_chatbot.yaml`
