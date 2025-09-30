# %%
# Create customer support chatbot eval

import os
import pandas as pd
from openai import OpenAI
import json
import concurrent.futures
from tqdm import tqdm


prompt_create_eval_dataset = """
# Role
You are an expert at creating datasets that can be used to evaluate LLM prompts. You are very intelligent and detail-oriented, and create business critical datasets that can be relied upon for characterizing and improving LLM-based systems.

# Instructions
1. Review the "task_context", "new_input_case" and "example_inputs" to understand the task.
    a) Adhere to the high-level characteristics of the "example_inputs" as closely as possible when generating a new test case, including length, tone, formatting, etc.
    b) The "new_input_case" should be used to motivate creating a new sample that fits these characteristics. This should be directly copied from the "new_input_case" value to the output "new_input_case" key.
3. Think step by step and create a short "rationale" to plan out the test case.
4. Create a "new input"
5. Fill out draft responses for each of the "output_columns", which are correct. If any of the "output_column" values aren't available in the input, use the value "Not Found".

# Context

<task_context>
{{task_context}}
</task_context>

<new_input_case>
{{new_input_case}}
</new_input_case>

<example_inputs>
{{example_inputs}}
</example_inputs>

<output_columns>
{{output_columns}}
</output_columns>

# Output Format
- ONLY VALID JSON, NOT INCLUDE "```" or "```json".
- Keys: ["new_input_case", "rationale", "input"] + output_columns
- Example:
```json
{
  "new_input_case": "{{new_input_case}}",
  "rationale": "your 'rationale' reasoning",
  "input": your 'new input'",
  "user_query": "your 'user_query'",
  "response": "your 'response'"
}
```
"""

# User input params
example_inputs = "Do you offer free shipping?"

task_context = """
- Goal: Customer support for e-commerce.
- User queries must relate to FAQs, products, or services (e.g., ordering, refunds).
"""

hard_cases = [
    "1. Vague and ambiguous query",
    "2. Long and complex query",
    "3. Irrelevant query",
    "4. Offensive or inappropriate query",
    "5. Mixed questions",
]

output_columns = """
- user_query: string, the user's short question or request.
- response: string, concise and informative reply.
"""

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)

def request_new_sample(
    task_context,
    case_i,
    example_inputs,
    output_columns,
    model="gpt-3.5-turbo",
):
    p = (
        prompt_create_eval_dataset.replace("{{task_context}}", task_context)
        .replace("{{new_input_case}}", case_i)
        .replace("{{example_inputs}}", example_inputs)
        .replace("{{output_columns}}", output_columns)
    )

    res = client.chat.completions.create(
        model=model, messages=[{"role": "user", "content": p}]
    )
    content = res.choices[0].message.content

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        print("ERROR: Invalid JSON for case={}".format(case_i))
        print(f"Message: {content}")
        return content


# Create n repeats of each case
case_repeats = 3
sample_cases = [case for case in hard_cases for _ in range(case_repeats)]


# Generate samples in parallel
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
    futures = [
        executor.submit(
            request_new_sample,
            task_context,
            case,
            example_inputs,
            output_columns,
            model="gpt-3.5-turbo",
        )
        for case in sample_cases
    ]
    results = []
    invalid_results = ''
    for future in tqdm(
        concurrent.futures.as_completed(futures),
        total=len(futures),
        desc="Creating sample data",
    ):
        content = future.result()
        if content is str:
            invalid_results += content + '\n'
        else:
            results.append(future.result())

    # Remove none values from bad json
    results = [result for result in results if result is not None]
    print("created {} sample datapoints".format(len(results)))


# save result json to csv
output_dir = "./data"
now = pd.Timestamp.now().strftime("%Y-%m-%d_%H-%M-%S")
filename = f"draft_chatbot_outputs_n={len(results)}_{now}.csv"
os.makedirs(output_dir, exist_ok=True)
print("results", results)

pd.DataFrame(results).sort_values(by="new_input_case").to_csv(
    os.path.join(output_dir, filename), index=False
)

# save invalid json to txt to manually input to dataset
if invalid_results:
    with open(os.path.join(output_dir, f"invalid_results_{now}.txt"), "w") as f:
        f.write(invalid_results)

# %%