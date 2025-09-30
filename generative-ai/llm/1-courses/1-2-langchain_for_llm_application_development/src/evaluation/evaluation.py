import os
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.document_loaders import CSVLoader
from langchain.vectorstores import DocArrayInMemorySearch
from langchain.indexes import VectorstoreIndexCreator
from langchain.evaluation.qa import QAGenerateChain

_ = load_dotenv(find_dotenv())

if __name__ == "__main__":
    llm_model = os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO')
    outdoor_clothing_catalog_file_path = os.getenv('OUTDOOR_CLOTHING_CATALOG_FILE_PATH')
    loader = CSVLoader(file_path=outdoor_clothing_catalog_file_path)
    data = loader.load()
    print(data[0])

    index = VectorstoreIndexCreator(
        vectorstore_cls=DocArrayInMemorySearch
    ).from_loaders([loader])

    llm = ChatOpenAI(temperature=0, model=llm_model)
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=index.vectorstore.as_retriever(),
        verbose=True,
        chain_type_kwargs={"document_separator": "<<<<>>>>"}
    )

    examples = [
        {
            "query": "Do the Cozy Comfort Pullover Set\
            have side pockets?",
            "answer": "Yes"
        },
        {
            "query": "What collection is the Ultra-Lofty \
            850 Stretch Down Hooded Jacket from?",
            "answer": "The DownTek collection"
        }
    ]

    # add examples
    example_gen_chain = QAGenerateChain.from_llm(ChatOpenAI())
    new_examples = example_gen_chain.apply_and_parse(
        [{"doc": t} for t in data[:5]],
    )
    examples += new_examples

    # Evaluate
    qa.run(examples[0]["query"])

    # turn on debug
    # import langchain
    # langchain.DEBUG = True

    predictions = qa.apply(examples)

    from langchain.evaluation.qa import QAEvaluator
    llm = ChatOpenAI(temperature=0, model=llm_model)
    eval_chain = QAEvaluator.from_llm(llm)

    graded_output = eval_chain.evaluate(examples, predictions)

    for i, eg in enumerate(examples):
        print(f"Example {i}")
        print(f"Query: {eg['query']}")
        print(f"Answer: {eg['answer']}")
        print(f"Prediction: {predictions[i]}")
        print(f"Grade: {graded_output[i]}")
        print("\n")







