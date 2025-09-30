import datasets


def tokenize_and_split_data(training_config, tokenizer):
    def tokenize_function(examples, tokenizer=None, max_length=0):
        if "question" in examples and "answer" in examples:
            text = examples["question"][0] + examples["answer"][0]
        elif "input" in examples and "output" in examples:
            text = examples["input"][0] + examples["output"][0]
        else:
            text = examples["text"][0]

        tokenized_inputs = tokenizer(
            text,
            return_tensors="np",
            padding=True,
        )

        tokenizer.truncation_side = "left"
        tokenized_inputs = tokenizer(
            text, return_tensors="np", truncation=True, max_length=max_length
        )

        return tokenized_inputs

    # Load the dataset
    datasets_config = training_config["datasets"]
    if datasets_config["use_hf"]:
        finetuning_dataset_loaded = datasets.load_dataset(
            datasets_config["path"], split="train"
        )
    else:
        finetuning_dataset_loaded = datasets.load_dataset(
            "json", data_files=datasets_config["path"], split="train"
        )

    # Tokenize the dataset
    tokenized_dataset = finetuning_dataset_loaded.map(
        tokenize_function,
        batched=True,
        batch_size=1,
        drop_last_batch=True,
        fn_kwargs={
            "tokenizer": tokenizer,
            "max_length": training_config["model"]["max_length"],
        },
    )

    # Split the dataset
    split_dataset = tokenized_dataset.train_test_split(
        test_size=0.1, shuffle=True, seed=123
    )

    train_dataset = split_dataset["train"]
    test_dataset = split_dataset["test"]
    return train_dataset, test_dataset
