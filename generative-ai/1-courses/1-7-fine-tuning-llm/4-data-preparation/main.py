from pprint import pprint

import datasets
import pandas as pd
from transformers import AutoTokenizer

print("1. Tokenizing text ")
# auto find the tokenizer for the model
tokenizer = AutoTokenizer.from_pretrained("EleutherAI/pythia-70m")

text = "Hi, how are you?"
encoded_text = tokenizer(text)["input_ids"]
print("encoded_text: ", encoded_text)

decoded_text = tokenizer.decode(encoded_text)
print("Decoded tokens back into text: ", decoded_text)

print("2. Tokenize multiple texts at once")
list_texts = ["Hi, how are you?", "I'm good", "Yes"]
encoded_texts = tokenizer(list_texts)
print("Encoded several texts: ", encoded_texts["input_ids"])

print("3. Padding and truncation")
# Padding is strategy to handle encoded text length of number of you want to present the text
tokenizer.pad_token = tokenizer.eos_token
encoded_texts_longest = tokenizer(list_texts, padding=True)
print("Using padding: ", encoded_texts_longest["input_ids"])

encoded_texts_truncation = tokenizer(list_texts, max_length=3, truncation=True)
print("Using truncation: ", encoded_texts_truncation["input_ids"])

tokenizer.truncation_side = "left"
encoded_texts_truncation_left = tokenizer(list_texts, max_length=3, truncation=True)
print("Using left-side truncation: ", encoded_texts_truncation_left["input_ids"])

encoded_texts_both = tokenizer(list_texts, max_length=3, truncation=True, padding=True)
print("Using both padding and truncation: ", encoded_texts_both["input_ids"])

print("4. Prepare instruction dataset")
filename = "./data-preparation/lamini_docs.jsonl"
instruction_dataset_df = pd.read_json(filename, lines=True)
examples = instruction_dataset_df.to_dict()

if "question" in examples and "answer" in examples:
    text = examples["question"][0] + examples["answer"][0]
elif "instruction" in examples and "response" in examples:
    text = examples["instruction"][0] + examples["response"][0]
elif "input" in examples and "output" in examples:
    text = examples["input"][0] + examples["output"][0]
else:
    text = examples["text"][0]

prompt_template = """### Question:
{question}

### Answer:"""

num_examples = len(examples["question"])
finetuning_dataset = []
for i in range(num_examples):
    question = examples["question"][i]
    answer = examples["answer"][i]
    text_with_prompt_template = prompt_template.format(question=question)
    finetuning_dataset.append({"question": text_with_prompt_template, "answer": answer})


print("One datapoint in the finetuning dataset:")
pprint(finetuning_dataset[0])


print("5. Tokenize a single example")
text = finetuning_dataset[0]["question"] + finetuning_dataset[0]["answer"]
tokenized_inputs = tokenizer(text, return_tensors="np", padding=True)
print("tokenized_inputs input_ids 1:", tokenized_inputs["input_ids"])

max_length = 2048
max_length = min(
    tokenized_inputs["input_ids"].shape[1],
    max_length,
)
print("max_length: ", max_length)

tokenized_inputs = tokenizer(
    text, return_tensors="np", truncation=True, max_length=max_length
)
print("tokenized_inputs input_ids:", tokenized_inputs["input_ids"])

print("6. Tokenize the instruction dataset")


def tokenize_function(examples):
    if "question" in examples and "answer" in examples:
        text = examples["question"][0] + examples["answer"][0]
    elif "input" in examples and "output" in examples:
        text = examples["input"][0] + examples["output"][0]
    else:
        text = examples["text"][0]

    tokenizer.pad_token = tokenizer.eos_token
    tokenized_inputs = tokenizer(
        text,
        return_tensors="np",
        padding=True,
    )

    max_length = min(tokenized_inputs["input_ids"].shape[1], 2048)
    tokenizer.truncation_side = "left"
    tokenized_inputs = tokenizer(
        text, return_tensors="np", truncation=True, max_length=max_length
    )

    return tokenized_inputs


finetuning_dataset_loaded = datasets.load_dataset(
    "json", data_files=filename, split="train"
)

tokenized_dataset = finetuning_dataset_loaded.map(
    tokenize_function, batched=True, batch_size=1, drop_last_batch=True
)

print("tokenized_dataset: ", tokenized_dataset)
tokenized_dataset = tokenized_dataset.add_column(
    "labels", tokenized_dataset["input_ids"]
)

print("7. Prepare test/train splits")
split_dataset = tokenized_dataset.train_test_split(
    test_size=0.1, shuffle=True, seed=123
)
print("split_dataset: ", split_dataset)

print("8. Push to hub")
# This is how to push your own dataset to your Huggingface hub
# !pip install huggingface_hub
# !huggingface-cli login
# split_dataset.push_to_hub(dataset_path_hf)
split_dataset.push_to_hub("thanhnguyendiem/lamini_docs_test")

print("9. Some datasets for you to try")
# finetuning_dataset_path = "lamini/lamini_docs"
# finetuning_dataset = datasets.load_dataset(finetuning_dataset_path)
# print(finetuning_dataset)

# taylor_swift_dataset = "lamini/taylor_swift"
# bts_dataset = "lamini/bts"
# open_llms = "lamini/open_llms"

# dataset_swiftie = datasets.load_dataset(taylor_swift_dataset)
# print(dataset_swiftie["train"][1])

"""
1. Tokenizing text
encoded_text:  [12764, 13, 849, 403, 368, 32]
Decoded tokens back into text:  Hi, how are you?

2. Tokenize multiple texts at once
Encoded several texts:  [[12764, 13, 849, 403, 368, 32], [42, 1353, 1175], [4374]]

3. Padding and truncation
Using padding:  [[12764, 13, 849, 403, 368, 32], [42, 1353, 1175, 0, 0, 0], [4374, 0, 0, 0, 0, 0]]
Using truncation:  [[12764, 13, 849], [42, 1353, 1175], [4374]]
Using left-side truncation:  [[403, 368, 32], [42, 1353, 1175], [4374]]
Using both padding and truncation:  [[403, 368, 32], [42, 1353, 1175], [4374, 0, 0]]

4. Prepare instruction dataset
One datapoint in the finetuning dataset:
{'answer': 'Lamini has documentation on Getting Started, Authentication, '
           'Question Answer Model, Python Library, Batching, Error Handling, '
           'Advanced topics, and class documentation on LLM Engine available '
           'at https://lamini-ai.github.io/.',
 'question': '### Question:\n'
             'What are the different types of documents available in the '
             'repository (e.g., installation guide, API documentation, '
             "developer's guide)?\n"
             '\n'
             '### Answer:'}

5. Tokenize a single example
[[ 4118 19782    27   187  1276   403   253  1027  3510   273  7177  2130
    275   253 18491   313    70    15    72   904 12692  7102    13  8990
  10097    13 13722   434  7102  6177   187   187  4118 37741    27    45
   4988    74   556 10097   327 27669 11075   264    13  5271 23058    13
  19782 37741 10031    13 13814 11397    13   378 16464    13 11759 10535
   1981    13 21798 12989    13   285   966 10097   327 21708    46 10797
   2130   387  5987  1358    77  4988    74    14  2284    15  7280    15
    900 14206]]
max_length:  86
tokenized_inputs input_ids: [[ 4118 19782    27   187  1276   403   253  1027  3510   273  7177  2130
    275   253 18491   313    70    15    72   904 12692  7102    13  8990
  10097    13 13722   434  7102  6177   187   187  4118 37741    27    45
   4988    74   556 10097   327 27669 11075   264    13  5271 23058    13
  19782 37741 10031    13 13814 11397    13   378 16464    13 11759 10535
   1981    13 21798 12989    13   285   966 10097   327 21708    46 10797
   2130   387  5987  1358    77  4988    74    14  2284    15  7280    15
    900 14206]]

6. Tokenize the instruction dataset
tokenized_dataset:  Dataset({
    features: ['question', 'answer', 'input_ids', 'attention_mask'],
    num_rows: 1400
})

7. Prepare test/train splits
split_dataset:  DatasetDict({
    train: Dataset({
        features: ['question', 'answer', 'input_ids', 'attention_mask', 'labels'],
        num_rows: 1260
    })
    test: Dataset({
        features: ['question', 'answer', 'input_ids', 'attention_mask', 'labels'],
        num_rows: 140
    })
})

"""
