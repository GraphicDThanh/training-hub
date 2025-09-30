# TASK: Generate promptfoo config for chatbot evaluation
# %%
import pandas as pd
import yaml
from openai import OpenAI

client = OpenAI()

df = pd.read_csv("evals/data/reviewed_chatbot_outputs_n=12_2024-12-06_16-55-04.csv.csv")

print(f"loaded {len(df)} rows")

# Get eval dataset ready to use with promptfoo
tests = []

for idx, row in df.iterrows():
    tests.append({
        "description": "Test RAG chatbot with user query",
        "vars": {
            "user_query": row["user_query"],
            "case": row["new_input_case"],
            "expected_response": row["response"]
        },
        "assert": [
            # Deterministic asserts

            # Similarity (embeddings) asserts
            {
                "type": "similar",
                "value": "{{response}}",
                "threshold": 0.5
            }

            # Model-grade asserts
        ]
    })

prompts = '{{user_query}}'

providers = ["file://src/rag/retrieve_v1.py"]
# providers = ["openai:gpt-3.5-turbo"]


# defaultTest:
#   vars:
#     system_message: file://../src/prompts/system_message.md
promptfoo_config = {
    "providers": providers,
    "prompts": prompts,
    "tests": tests
}


output_yaml_path = "promptfoo_eval_chatbot.yaml"

with open(output_yaml_path, "w") as f:
    yaml.dump(promptfoo_config, f)

print(f"Saved promptfoo config to {output_yaml_path}")

# %%