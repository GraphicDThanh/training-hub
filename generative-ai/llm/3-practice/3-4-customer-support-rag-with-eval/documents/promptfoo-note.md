## Evals LLM RAG app step-by-step
> Note detail in process workflow of evaluation with Promptfoo to prepare for demo

| Step | Step Name | Purpose | pf - prompt | pf - provider | pf - assert target |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | RAG - Retrieve docs | eval retrievals | query | retriever | content retrieved |
| 2 | RAG - LLM output | eval prompts, evals providers | full prompt | LLM model | prompts with more accurate context |
| 3 | RAG - End-to-end | eval RAG | full prompt | RAG application | end user using |

### Step 0:
- Clean up base knowledge to smaller set
  - `faqs.txt`: 5 topics account, order&payment, delivery, return&warranty, product preservation
  - `information.json`: list categories (8), policies (5)
  - `policies.json`: shop policies detail
  - `products.json`: 28 products
### Step 1:
- 1.1 Setup POC
- 1.2 Add evals for retrieve "Documents" (1)
  - [ ] `faqs.txt`
  - [ ] `information.json`
  - [ ] `policies.yaml`
  - [ ] `products.json`
### Step 2: 
### Step 3: 

---

(1) Documents: 
- faqs.txt
- order-process.json
- product-infomation.txt
- products.json
- returns-and-refunds.csv
- shipping-info.txt

At step 2:

Note: full prompt = system message + query + context
Step 1: Eval Retrieve Doc
--- prompt: query
--- provider: retrieve
--- assert target: context search in docs
--- purpose: eval retrievals
Step 2: Eval LLM output (done poc, need add more evals)
---- prompt: full prompt send to LLM (system
message, context, query)
---- provider: LLM model
---- assert target: prompt
---- purpose: eval prompts models
Relate to 2/
- Prepare dataset for evals
-- List out all questions to a csv file column "query" (question_set.csv)
-- Use retriever to get context by the query --> add to context column of csv file (question_and_context.csv)
-- Write a prompt to get response and put to csv file (datasets.csv) which include question, response
-- Generate evals config yaml file and update assertion base to groups and data
Run evals, update prompt , and repeat...
-- Evals run on LLM chatgpt-3.5-turbo with query is prompt txt and context load dynamic
----- this dynamic should based on specific doc. If query is free shipping, retrieve ship doc only and provide context. not reuse the retrieve of the app.
1. E2E: test prompt with Rag app (current e2e with only user query is not correct, target is eval the prompt, prompt with only query make no sense)
--- prompt: full prompt send to LLM (system
message, context, query)
--- providers: RAG app
--- assert target: response, performance, cost
--- purpose: eval RAG app as user using