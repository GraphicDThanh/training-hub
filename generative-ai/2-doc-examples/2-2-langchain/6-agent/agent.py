from langchain import hub
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader
from langchain.tools.retriever import create_retriever_tool
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory


def tool_search():
    search = TavilySearchResults(max_results=2)
    return search


def tool_retriever():
    loader = WebBaseLoader("https://docs.smith.langchain.com/overview")
    docs = loader.load()
    documents = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200).split_documents(docs)
    vector = FAISS.from_documents(documents, OpenAIEmbeddings())
    retriever = vector.as_retriever()
    retriever_tool = create_retriever_tool(
        retriever,
        "langsmith_search",
        "Search for information about LangSmith. For any question about LangSmith, you must use this tool."
    )
    return retriever_tool

def get_tools():
    return [tool_search(), tool_retriever()]

def test():
    # Search
    search = tool_search()
    results = search.invoke("What is the weather in SF?")
    print(results)
    # [{'url': 'https://www.weatherapi.com/', 'content': "{'location': {'name': 'San Francisco', 'region': 'California', 'country': ...gust_mph': 18.9, 'gust_kph': 30.5}}"}, {'url': 'https://forecast.weather.gov/MapClick.php?lat=37.7800771&lon=-122.4201615', 'content': 'SAN FRANCISCO DOWNTOWN (SFOC1) Lat: 37.77056°NLon: 122.42694°WElev: 150.0ft. NA. 52°F...mber 16, 01:00pm ... 12am PST Dec 12, 2024'}]

    # Retriever
    loader = WebBaseLoader("https://docs.smith.langchain.com/overview")
    docs = loader.load()
    documents = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200).split_documents(docs)
    vector = FAISS.from_documents(documents, OpenAIEmbeddings())
    retriever = vector.as_retriever()
    result = retriever.invoke("how to upload a dataset")[0]
    print(result)
    # Document(page_content='Run the evaluationexperiment_results = client.evaluate(    dummy_app, # Your AI system goes here    data=dataset, # The data to predict and grade over    evaluators=[exact_match], # The evaluators to score the results    experiment_prefix="sample-experiment", # The name of the experiment    metadata={"version": "1.0.0", "revision_id": "beta"}, # Metadata about the experiment    max_concurrency=4,  # Add concurrency.)# Analyze the results via the UI or programmatically# If you have 'pandas' installed you can view the results as a# pandas DataFrame by uncommenting below:# experiment_results.to_pandas()import { Client } from "langsmith";import { EvaluationResult, evaluate } from "langsmith/evaluation";const client = new Client();// Define dataset: these are your test casesconst datasetName = "Sample Dataset";const dataset = await client.createDataset(datasetName, {  description: "A sample dataset in LangSmith.",});await client.createExamples({  inputs: [    { postfix: "to LangSmith" },' metadata={'source': 'https://docs.smith.langchain.com/overview', 'title': 'Get started with LangSmith | 🦜️🛠️ LangSmith', 'description': 'LangSmith is a platform for building production-grade LLM applications.', 'language': 'en'})

    # Model
    tools = get_tools()
    model = ChatOpenAI(model="gpt-4o-mini")
    # response = model.invoke([HumanMessage(content="hi!")])
    # print(response.content) # Hello! How can I assist you today?

    # Model with tools
    model_with_tools = model.bind_tools(tools)
    response = model_with_tools.invoke([HumanMessage(content="hi!")])
    print(f"ContentString: {response.content}")
    print(f"ToolCalls: {response.tool_calls}")
    # ContentString: Hello! How can I assist you today?
    # ToolCalls: []


def init_agent():
    tools = get_tools()
    model = ChatOpenAI(model="gpt-4o-mini")
    prompt = hub.pull("hwchase17/openai-functions-agent")
    agent = create_tool_calling_agent(model, tools, prompt)
    agent_executor = AgentExecutor(agent=agent, tools=tools)
    # agent_executor.invoke({"input": "hi!"})
    # {'input': 'hi!', 'output': 'Hello! How can I assist you today?'}
    # agent_executor.invoke({"input": "how can langsmith help with testing?"})
    # {'input': 'how can langsmith help with testing?', 'output': 'LangSmith can significantly assist with testing in the following ways:\n\n1. **Trace LL... ship updates quickly and with confidence.'}
    # agent_executor.invoke({"input": "what is the weather in SF?"})
    return agent_executor

def agent_with_memory_manually():
    agent_executor = init_agent()
    result = agent_executor.invoke({"input": "hi! my name is bob", "chat_history": []})
    print(result)
    # {'input': 'hi! my name is bob', 'chat_history': [], 'output': 'Hello Bob! How can I assist you today?'}

    result2 = agent_executor.invoke({
        "input": "how can langsmith help with testing?",
        "chat_history": [
            HumanMessage(content="hi! my name is bob"),
            AIMessage(content="Hello! How can I assist you today?")
        ]
    })
    print(result2)
    # {'input': 'how can langsmith help with testing?', 'chat_history': [HumanMessage(content='hi! my name is bob', additional_kwargs={}, response_metadata={}), AIMessage(content='Hello! How can I assist you today?', additional_kwargs={}, response_metadata={})], 'output': "LangSmith can significantly aid in testing by providing tools and features that allow for better monitoring and evaluation of your applications. Here are some key ways it can help:\n\n1. **Trace LLM Applications**: LangSmith allows you to gain visibility into calls made to large language models (LLMs) and other components of your application's logic. This traceability helps in understanding how different parts of your application interact.\n\n2. **Evaluate Performance**: You can compare results across various models, prompts, and architectures to identify which configurations yield the best performance. This evaluation process is essential for optimizing your application.\n\n3. **Improve Prompts**: LangSmith provides tools to quickly refine and test prompts, helping you achieve more accurate and reliable results from your LLMs.\n\n4. **Seamless Integration**: If you are using frameworks like LangChain or LangGraph, LangSmith integrates easily without requiring extra instrumentation.\n\nOverall, LangSmith equips developers with the necessary insights and tools to ensure that their LLM applications are robust, reliable, and performant."}



def agent_with_memory_auto():
    def get_session_history(session_id: str) -> BaseChatMessageHistory:
        if session_id not in store:
            store[session_id] = ChatMessageHistory()
        return store[session_id]

    store = {}
    agent_executor = init_agent()
    agent_with_chat_history = RunnableWithMessageHistory(
        agent_executor,
        get_session_history,
        input_messages_key="input",
        history_messages_key="chat_history",
    )
    result = agent_with_chat_history.invoke(
        {"input": "hi! I'm Thanh"},
        config={"configurable": {"session_id": "foo123"}}
    )
    print(result)
    # {'input': "hi! I'm Thanh", 'chat_history': [], 'output': 'Hello Thanh! How can I assist you today?'}

    result2 = agent_with_chat_history.invoke(
        {"input": "what's my name?"},
        config={"configurable": {"session_id": "foo123"}},
    )
    print(result2)
    # {'input': "what's my name?", 'chat_history': [HumanMessage(content="hi! I'm Thanh", additional_kwargs={}, response_metadata={}), AIMessage(content='Hello Thanh! How can I assist you today?', additional_kwargs={}, response_metadata={})], 'output': 'Your name is Thanh. How can I help you today, Thanh?'}


if __name__ == "__main__":
    # init_agent()
    # agent_with_memory_manually()
    agent_with_memory_auto()
