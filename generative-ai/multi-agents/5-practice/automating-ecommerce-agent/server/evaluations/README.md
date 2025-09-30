# Agent Evaluation

## Core concepts of Evaluation
Evaluation are made up from 3 main components:
1. **Dataset**: test input and optionally expected output
2. **Target function**: that define what you're evaluating.
   - Ex: One LLM call that include the prompt want to test
   - Ex: A part of application (sub agent, chain)
   - Ex: End-to-end application
3. **Evaluators**: score your target function's outputs.

## Packages
- [openevals](https://github.com/langchain-ai/openevals) package
- [agentevals]()

## Preparation
- Config environment values use in evaluation:
```bash
EVAL_USER_PASSWORD=abcABC@123
EVAL_USER_1_ORDER_STATUS_DELIVERED_FOR_RETURN=2642f223-e576-4767-8c6d-939104e2edad
EVAL_USER_2_ORDER=420d1740-b923-4681-a59a-5c914efe3857
EVAL_USER_2_ORDER_STATUS_PENDING_CONFIRM=222b1996-0972-42e4-aa0d-42af2b113936
EVAL_USER_2_ORDER_STATUS_DELIVERED=0b806cd3-eef4-4528-9dfb-fcee0b78de51
EVAL_USER_2_ORDER_STATUS_PENDING_CONFIRM_FOR_RETURN_NOT_ALLOW=cda34098-8b1a-4634-9147-92a3005d5b7c
```

- After run evaluation `make langsmith_agent_evals`, update the data for order status (in Supabase Dashboard) to make sure the order status is correct for next evaluation.
(Check the order id as above env variables)

## Evaluation Result (public tracing)
### Agent Evaluation
- Ecommerce multi-agents
  - Anonymous User: https://smith.langchain.com/public/0aed6c18-7dbb-4b62-8f06-8d5baa5028fd/r
  - Authenticated User: https://smith.langchain.com/public/399bfba0-98ec-4114-90f3-230215825e04/r
- Supervisor Agent Delegation: https://smith.langchain.com/public/cb0f70ab-f012-433d-9e94-af07f11be031/r
- Intent Classifier Agent: https://smith.langchain.com/public/e86e2aed-e919-4cb7-9242-1c955ea38315/r
- Greeting Agent: https://smith.langchain.com/public/d64b5e78-6cb1-40c8-a650-69a1ef43490e/r
- Product Agent: https://smith.langchain.com/public/7127f856-8777-4866-ad5f-cb87d48d5ee5/r
- Cart Agent: https://smith.langchain.com/public/ff54e2bb-44cc-42e9-a4dd-62b704b9f0dc/r
- Order Agent: https://smith.langchain.com/public/0e1a2cc8-8c19-4012-9d10-560e19f0e891/r

### Agent Trajectory Evaluation
- Service Agent: https://smith.langchain.com/public/196c10f1-6d58-4873-a55c-37414cdb5a50/r
- Service Agent w. Interrupt: https://smith.langchain.com/public/7a09616a-d7ab-494f-a22b-818ea5ed591f/r
- Product Agent: https://smith.langchain.com/public/e837c295-bed5-4914-b417-88206741071d/r