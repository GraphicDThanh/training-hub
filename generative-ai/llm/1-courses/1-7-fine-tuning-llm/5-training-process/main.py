import logging
import os

import lamini
import torch

# from utilities import *
from transformers import AutoModelForCausalLM, AutoTokenizer, Trainer, TrainingArguments
from utils.tokenize_and_split_data import tokenize_and_split_data

logger = logging.getLogger(__name__)
global_config = None

lamini.api_url = os.getenv("POWERML__PRODUCTION__URL")
lamini.api_key = os.getenv("POWERML__PRODUCTION__KEY")

# Lamini training model with 3 lines of code
# model = Lamini(model_name="EleutherAI/pythia-410m")
# model.load_data_from_jsonlines("lamini_docs.jsonl", input_key="question", output_key="answer")
# model.train(is_public=True)


print("1. Load the Lamini docs dataset")
# Use local dataset
dataset_name = "training-process/lamini_docs.jsonl"
dataset_path = f"/content/{dataset_name}"
use_hf = False

# Use Hugging Face dataset
# dataset_path = "lamini/lamini_docs"
# use_hf = True

model_name = "EleutherAI/pythia-70m"

training_config = {
    "model": {"pretrained_name": model_name, "max_length": 2048},
    "datasets": {"use_hf": use_hf, "path": dataset_path},
    "verbose": True,
}

tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token
train_dataset, test_dataset = tokenize_and_split_data(training_config, tokenizer)


print("2. Load the base model")
base_model = AutoModelForCausalLM.from_pretrained(model_name)
device_count = torch.cuda.device_count()
if device_count > 0:
    print("Select GPU device")
    device = torch.device("cuda")
else:
    print("Select CPU device")  # --> go here
    device = torch.device("cpu")

base_model.to(device)

print("3. Define function to carry out inference")


def inference(text, model, tokenizer, max_input_tokens=1000, max_output_tokens=100):
    # Tokenize
    input_ids = tokenizer.encode(
        text, return_tensors="pt", truncation=True, max_length=max_input_tokens
    )

    # Generate
    device = model.device
    generated_tokens_with_prompt = model.generate(
        input_ids=input_ids.to(device), max_length=max_output_tokens
    )

    # Decode
    generated_text_with_prompt = tokenizer.batch_decode(
        generated_tokens_with_prompt, skip_special_tokens=True
    )

    # Strip the prompt
    generated_text_answer = generated_text_with_prompt[0][len(text) :]

    return generated_text_answer


print("4. Try the base model")
test_text = test_dataset[0]["question"]
print("Question input (test):", test_text)
print(f"Correct answer from Lamini docs: {test_dataset[0]['answer']}")
print("Model's answer: ")
print(inference(test_text, base_model, tokenizer))

print("5. Setup training")
max_steps = 3
trained_model_name = f"lamini_docs_{max_steps}_steps"
output_dir = f"training-process/{trained_model_name}"

training_args = TrainingArguments(
    # Learning rate
    learning_rate=1.0e-5,
    # Number of training epochs
    num_train_epochs=1,
    # Max steps to train for (each step is a batch of data)
    # Overrides num_train_epochs, if not -1
    max_steps=max_steps,
    # Batch size for training
    per_device_train_batch_size=1,
    # Directory to save model checkpoints
    output_dir=output_dir,
    # Other arguments
    overwrite_output_dir=False,  # Overwrite the content of the output directory
    disable_tqdm=False,  # Disable progress bars
    eval_steps=120,  # Number of update steps between two evaluations
    save_steps=120,  # After # steps model is saved
    warmup_steps=1,  # Number of warmup steps for learning rate scheduler
    per_device_eval_batch_size=1,  # Batch size for evaluation
    eval_strategy="steps",
    logging_strategy="steps",
    logging_steps=1,
    optim="adafactor",
    gradient_accumulation_steps=4,
    gradient_checkpointing=False,
    # Parameters for early stopping
    load_best_model_at_end=True,
    save_total_limit=1,
    metric_for_best_model="eval_loss",
    greater_is_better=False,
)

model_flops = (
    base_model.floating_point_ops(
        {"input_ids": torch.zeros((1, training_config["model"]["max_length"]))}
    )
    * training_args.gradient_accumulation_steps
)

print(base_model)
print("Memory footprint", base_model.get_memory_footprint() / 1e9, "GB")
print("Flops", model_flops / 1e9, "GFLOPs")

trainer = Trainer(
    model=base_model,
    # model_flops=model_flops,
    # total_steps=max_steps,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
)

print("6. Train a few steps")
training_output = trainer.train()
print("training_output:", training_output)


print("7. Save model locally")
save_dir = f"{output_dir}/final"

trainer.save_model(save_dir)
print("Saved model to:", save_dir)

finetuned_slightly_model = AutoModelForCausalLM.from_pretrained(
    save_dir, local_files_only=True
)
finetuned_slightly_model.to(device)


print("8. Run slightly trained model")
test_question = test_dataset[0]["question"]
print("Question input (test):", test_question)

print("Finetuned slightly model's answer: ")
print(inference(test_question, finetuned_slightly_model, tokenizer))
test_answer = test_dataset[0]["answer"]
print("Target answer output (test):", test_answer)

# MODEL FINED TUNE WITH ALL RECORDS
print("9. Run same model trained for two epochs")
finetuned_longer_model = AutoModelForCausalLM.from_pretrained(
    "lamini/lamini_docs_finetuned"
)
tokenizer = AutoTokenizer.from_pretrained("lamini/lamini_docs_finetuned")

finetuned_longer_model.to(device)
print("Finetuned longer model's answer: ")
print(inference(test_question, finetuned_longer_model, tokenizer))

print("10. Run much larger trained model and explore moderation")
# bigger_finetuned_model = BasicModelRunner(model_name_to_id["bigger_model_name"])
# bigger_finetuned_output = bigger_finetuned_model(test_question)
# print("Bigger (2.8B) finetuned model (test): ", bigger_finetuned_output)

count = 0
for i in range(len(train_dataset)):
    if "keep the discussion relevant to Lamini" in train_dataset[i]["answer"]:
        print(i, train_dataset[i]["question"], train_dataset[i]["answer"])
        count += 1
print(count)

print("11. Explore moderation using small model")
# base_tokenizer = AutoTokenizer.from_pretrained("EleutherAI/pythia-70m")
# base_model = AutoModelForCausalLM.from_pretrained("EleutherAI/pythia-70m")
# print(inference("What do you think of Mars?", base_model, base_tokenizer))

print("12. Now try moderation with finetuned small model")
# print(inference("What do you think of Mars?", finetuned_longer_model, tokenizer))

print("13. Finetune a model in 3 lines of code using Lamini")
# model = BasicModelRunner("EleutherAI/pythia-410m")
# model.load_data_from_jsonlines("lamini_docs.jsonl", input_key="question", output_key="answer")
# model.train(is_public=True)

# out = model.evaluate()

# lofd = []
# for e in out['eval_results']:
#     q  = f"{e['input']}"
#     at = f"{e['outputs'][0]['output']}"
#     ab = f"{e['outputs'][1]['output']}"
#     di = {'question': q, 'trained model': at, 'Base Model' : ab}
#     lofd.append(di)
# df = pd.DataFrame.from_dict(lofd)
# style_df = df.style.set_properties(**{'text-align': 'left'})
# style_df = style_df.set_properties(**{"vertical-align": "text-top"})
# style_df


"""
1. Load the Lamini docs dataset
Map: 100%|██████████████████████████████████████████████████████████████████████████████████████████████████████| 1260/1260 [00:00<00:00, 1449.52 examples/s]

2. Load the base model
The `GPTNeoXSdpaAttention` class is deprecated in favor of simply modifying the `config._attn_implementation`attribute of the `GPTNeoXAttention` class! It will be removed in v4.48
Select CPU device

3. Define function to carry out inference

4. Try the base model
Question input (test): Does Lamini support named entity recognition and extraction?
Correct answer from Lamini docs: Yes, Lamini supports named entity recognition and extraction.
Model's answer:
The attention mask and the pad token id were not set. As a consequence, you may observe unexpected behavior. Please pass your input's `attention_mask` to obtain reliable results.
Setting `pad_token_id` to `eos_token_id`:0 for open-end generation.
The attention mask is not set and cannot be inferred from input because pad token is same as eos token. As a consequence, you may observe unexpected behavior. Please pass your input's `attention_mask` to obtain reliable results.


A:

I think you're looking for a way to extract the data from the database.  You can use the following to extract the data from the database:
SELECT * FROM `database` WHERE `id` = 1 AND `name` = 1 AND `name` = 1 AND `name` = 1 AND `name` = 1 AND `name` = 1 AND `name` = 1 AND `name`

5. Setup training
  warnings.warn(
GPTNeoXForCausalLM(
  (gpt_neox): GPTNeoXModel(
    (embed_in): Embedding(50304, 512)
    (emb_dropout): Dropout(p=0.0, inplace=False)
    (layers): ModuleList(
      (0-5): 6 x GPTNeoXLayer(
        (input_layernorm): LayerNorm((512,), eps=1e-05, elementwise_affine=True)
        (post_attention_layernorm): LayerNorm((512,), eps=1e-05, elementwise_affine=True)
        (post_attention_dropout): Dropout(p=0.0, inplace=False)
        (post_mlp_dropout): Dropout(p=0.0, inplace=False)
        (attention): GPTNeoXSdpaAttention(
          (rotary_emb): GPTNeoXRotaryEmbedding()
          (query_key_value): Linear(in_features=512, out_features=1536, bias=True)
          (dense): Linear(in_features=512, out_features=512, bias=True)
          (attention_dropout): Dropout(p=0.0, inplace=False)
        )
        (mlp): GPTNeoXMLP(
          (dense_h_to_4h): Linear(in_features=512, out_features=2048, bias=True)
          (dense_4h_to_h): Linear(in_features=2048, out_features=512, bias=True)
          (act): GELUActivation()
        )
      )
    )
    (final_layer_norm): LayerNorm((512,), eps=1e-05, elementwise_affine=True)
    (rotary_emb): GPTNeoXRotaryEmbedding()
  )
  (embed_out): Linear(in_features=512, out_features=50304, bias=False)
)
Memory footprint 0.306872568 GB
Flops 2195.667812352 GFLOPs

6. Train a few steps
{'loss': 3.2024, 'grad_norm': 43.32761764526367, 'learning_rate': 1e-05, 'epoch': 0.0}
{'loss': 3.5618, 'grad_norm': 53.09012222290039, 'learning_rate': 5e-06, 'epoch': 0.01}
{'loss': 3.6892, 'grad_norm': 53.28873825073242, 'learning_rate': 0.0, 'epoch': 0.01}
{'train_runtime': 4.6413, 'train_samples_per_second': 2.585, 'train_steps_per_second': 0.646, 'train_loss': 3.4844863414764404, 'epoch': 0.01}
100%|██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 3/3 [00:04<00:00,  1.55s/it]
training_output: TrainOutput(global_step=3, training_loss=3.4844863414764404, metrics={'train_runtime': 4.6413, 'train_samples_per_second': 2.585, 'train_steps_per_second': 0.646, 'total_flos': 295096467456.0, 'train_loss': 3.4844863414764404, 'epoch': 0.010582010582010581})
Saved model to: training-process/lamini_docs_3_steps/final

7. Save model locally
Saved model to: training-process/lamini_docs_3_steps/final
8. Run slightly trained model
Question input (test): Does Lamini support named entity recognition and extraction?
Finetuned slightly model's answer:
The attention mask and the pad token id were not set. As a consequence, you may observe unexpected behavior. Please pass your input's `attention_mask` to obtain reliable results.
Setting `pad_token_id` to `eos_token_id`:0 for open-end generation.


A:

The Lamini support is a combination of the following:

The Lamini support is a combination of the following:

The Lamini support is a combination of the following:

The Lamini support is a combination of the following:

The Lamini support is a combination of the following:

The Lamini support is a combination of the following:

Target answer output (test): Yes, Lamini supports named entity recognition and extraction.
8. Run slightly trained model
9. Run same model trained for two epochs
10. Run much larger trained model and explore moderation
11. Explore moderation using small model
12. Now try moderation with finetuned small model
13. Finetune a model in 3 lines of code using Lamini
"""
