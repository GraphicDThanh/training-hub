import os
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.document_loaders import CSVLoader
from langchain.vectorstores import DocArrayInMemorySearch
from langchain.indexes import VectorstoreIndexCreator
from IPython.display import display, Markdown

_ = load_dotenv(find_dotenv())

if __name__ == "__main__":
    llm_model = os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO')
    outdoor_clothing_catalog_file_path = os.getenv('OUTDOOR_CLOTHING_CATALOG_FILE_PATH')
    loader = CSVLoader(file_path=outdoor_clothing_catalog_file_path)

    # Example 1: Load document to vector store and ask question
    # DOES NOT WORK DUE TO DEPRECATED FROM 2.0
    # https://github.com/langchain-ai/langchain/issues/22063
    # https://python.langchain.com/v0.2/docs/versions/v0_2/deprecations/#breaking-changes
    index = VectorstoreIndexCreator(
        vectorstore_cls=DocArrayInMemorySearch
    ).from_loaders([loader])

    query = "Please list all your shirts with sun protection \
in a table in markdown and summarize each one."
    response = index.query(query)
    display(Markdown(response))
    # https://learn.deeplearning.ai/courses/langchain/lesson/5/question-and-answer

    # Example 2: Embeddings document and ask question
    docs = loader.load()
    print(docs[0])

    embeddings = OpenAIEmbeddings()
    embed = embeddings.embed_query("Hi my name is Harrison")
    print(len(embed))
    print(embed[:5])
    db = DocArrayInMemorySearch.from_documents(
        docs,
        embeddings
    )
    query = "Please suggest a shirt with sunblocking"
    docs = db.similarity_search(query)
    print(docs[0])
    retriever = db.as_retriever()
    llm = ChatOpenAI(temperature=0, model=llm_model)
    qdocs = "".join([docs[i].page_content for i in range(len(docs))])
    response = llm.call_as_llm(f"{qdocs} Question: Please list all your \
    shirts with sun protection in a table in markdown and summarize each one.")
    display(Markdown(response))
    qa_stuff = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        verbose=True
    )
    query = "Please list all your shirts with sun protection in a table \
    in markdown and summarize each one."
    response = qa_stuff.run(query)
    display(Markdown(response))
    response = index.query(query, llm=llm)

    index = VectorstoreIndexCreator(
        vectorstore_cls=DocArrayInMemorySearch,
        embedding=embeddings,
    ).from_loaders([loader])
    



