import bs4
from dotenv import load_dotenv
from langchain import hub
from langchain_chroma import Chroma
from langchain_community.document_loaders import WebBaseLoader
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

load_dotenv()
llm = ChatOpenAI(model="gpt-4o-mini")


def main():
    # Load, chunk and index the contents of the blog.
    bs4_strainer = bs4.SoupStrainer(class_="page__content")
    loader = WebBaseLoader(
        web_paths=("https://beautyoncode.com/django/django%20rest%20framework%20(drf)/relation-fields-in-drf-serializer/",),
        bs_kwargs=dict(parse_only=bs4_strainer),
    )
    docs = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, add_start_index=True)
    splits = text_splitter.split_documents(docs)
    vector_store = Chroma.from_documents(documents=splits, embedding=OpenAIEmbeddings())

    # Retrieve and generate using the relevant snippets of the blog.
    retriever = vector_store.as_retriever()
    prompt = hub.pull("rlm/rag-prompt")

    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    output = rag_chain.invoke("Is DRF auto optimize the queryset?")
    print("output", output)
    # Task Decomposition is a technique where complex tasks are broken down into smaller, manageable steps to enhance understanding and performance. This process often involves prompting models to "think step by step" or using task-specific instructions, allowing for clearer organization and execution of tasks. It can be further extended by methods like the Tree of Thoughts, which explores multiple reasoning possibilities at each step.

def main_2():
    # Load, chunk and index the contents of the blog.
    bs4_strainer = bs4.SoupStrainer(class_="page__content")
    loader = WebBaseLoader(
        web_paths=("https://beautyoncode.com/django/django%20rest%20framework%20(drf)/relation-fields-in-drf-serializer/",),
        bs_kwargs=dict(parse_only=bs4_strainer),
    )
    docs = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, add_start_index=True)
    splits = text_splitter.split_documents(docs)
    vector_store = Chroma.from_documents(documents=splits, embedding=OpenAIEmbeddings())

    # Retrieve and generate using the relevant snippets of the blog.
    retriever = vector_store.as_retriever()
    system_prompt = (
        "You are an assistant for question-answering tasks. "
        "Use the following pieces of retrieved context to answer "
        "the question. If you don't know the answer, say that you "
        "don't know. Use three sentences maximum and keep the "
        "answer concise."
        "\n\n"
        "{context}"
    )
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{input}"),
    ])
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)

    response = rag_chain.invoke({"input": "Is DRF auto optimize the queryset?"})
    print(response["answer"])

if __name__ == "__main__":
    # main()
    main_2()
