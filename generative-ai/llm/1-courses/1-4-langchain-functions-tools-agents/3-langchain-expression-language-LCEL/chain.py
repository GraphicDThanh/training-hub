import json

from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
from langchain.schema.runnable import RunnableMap
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.llms import OpenAI
from langchain_community.vectorstores import DocArrayInMemorySearch
from langchain_openai.chat_models import ChatOpenAI


def simple_chain():
    # Simple Chain
    prompt = ChatPromptTemplate.from_template(
        "tell me a short joke about {topic}"
    )
    model = ChatOpenAI()
    output_parser = StrOutputParser()
    chain = prompt | model | output_parser
    chain.invoke({"topic": "chicken"})
    # 'Why did the chicken join a band? Because it had the drumsticks!'

def more_complex_chain():
    model = ChatOpenAI()
    output_parser = StrOutputParser()
    vectorstore = DocArrayInMemorySearch.from_texts(
        ["harrison worked at kensho", "bears like to eat honey"],
        embedding=OpenAIEmbeddings()
    )
    retriever = vectorstore.as_retriever()
    
    # --- test the retriever ---
    retriever.invoke("where did harrison work?")
    # [Document(metadata={}, page_content='harrison worked at kensho'), Document(metadata={}, page_content='bears like to eat honey')]
    # retriever.invoke("what do bears like to eat?")
    # [Document(metadata={}, page_content='bears like to eat honey'), Document(metadata={}, page_content='harrison worked at kensho')]
    # --- test the retriever ---
    
    template = """Answer the question based only on the following context:
    {context}

    Question: {question}
    """
    
    prompt = ChatPromptTemplate.from_template(template)
    chain = RunnableMap({
        "context": lambda x: retriever.invoke(x["question"]),
        "question": lambda x: x["question"]
    }) | prompt | model | output_parser

    response = chain.invoke({"question": "where did harrison work?"})
    print(response) # 'Harrison worked at Kensho.'

    # runnable map
    inputs = RunnableMap({
        "context": lambda x: retriever.invoke(x["question"]),
        "question": lambda x: x["question"]
    })
    docs = inputs.invoke({"question": "where did harrison work?"})
    print(docs)
    # {'context': [
        # Document(metadata={}, page_content='harrison worked at kensho'), 
        # Document(metadata={}, page_content='bears like to eat honey')
    # ], 
    # 'question': 'where did harrison work?'
    # }
    
def bind_tools():
    functions = [
        {
            "name": "weather_search",
            "description": "Search for the weather in an airport location",
            "parameters": {
                "type": "object",
                "properties": {
                    "airport_code": {
                        "type": "string",
                        "description": "The airport code for the location"
                    }
                },
                "required": ["airport_code"]
            }
        }
    ]
    
    prompt = ChatPromptTemplate.from_messages([
        ("human", "{input}")
    ])
    model = ChatOpenAI(temperature=0).bind(functions=functions)
    runnable = prompt | model
    response = runnable.invoke({"input": "What is the weather in sf?"})
    print(response)
    # AIMessage(
    #     content='', 
    #     additional_kwargs={
    #         'function_call': {
    #             'arguments': '{"airport_code":"SFO"}', 'name': 'weather_search'
    #         }, 
    #         'refusal': None
    #     }, 
    #     response_metadata={
    #         'token_usage': {
    #             'completion_tokens': 16, 'prompt_tokens': 64, 'total_tokens': 80, 
    #             'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 
    #             'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}
    #         }, 
    #         'model_name': 'gpt-3.5-turbo-0125', 
    #         'system_fingerprint': None, 
    #         'finish_reason': 'function_call', 
    #         'logprobs': None
    #     }, 
    #     id='run-111345af-c8bb-4652-b2cf-ee4e5a40f2da-0', 
    #     usage_metadata={
    #         'input_tokens': 64, 'output_tokens': 16, 'total_tokens': 80, 
    #         'input_token_details': {'audio': 0, 'cache_read': 0}, 
    #         'output_token_details': {'audio': 0, 'reasoning': 0}
    #     }
    # )
    
    functions.append(
        {
            "name": "sports_search",
            "description": "Search for news of recent sport events",
            "parameters": {
                "type": "object",
                "properties": {
                    "team_name": {
                        "type": "string",
                        "description": "The sports team to search for"
                    },
                },
                "required": ["team_name"]
            }
        }
    )
    model = ChatOpenAI(temperature=0).bind(functions=functions)
    runnable = prompt | model
    response = runnable.invoke({"input": "how did the patriots do yesterday?"})
    print(response)
    
def fallbacks():
    simple_model = OpenAI(temperature=0, max_tokens=1000, model="gpt-3.5-turbo-instruct")
    simple_chain = simple_model | json.loads
    challenge = "write three poems in a json blob, where each poem is a json blob of a title, author, and first line"
    response_1 = simple_model.invoke(challenge)
    print(response_1)
    # '\n\n{\n    "title": "Autumn Leaves",\n    "author": "Emily Dickinson",\n    "first_line": "The leaves are falling, one by one"\n}\n\n{\n    "title": "The Ocean\'s Song",\n    "author": "Pablo Neruda",\n    "first_line": "I hear the ocean\'s song, a symphony of waves"\n}\n\n{\n    "title": "A Winter\'s Night",\n    "author": "Robert Frost",\n    "first_line": "The snow falls softly, covering the ground"\n}'
    
    model = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
    chain = model | StrOutputParser() | json.loads
    response_2 = chain.invoke(challenge)
    print(response_2)
    # {'poem1': {'title': 'The Night Sky', 'author': 'Emily Dickinson', 'firstLine': 'The night is starry and the stars are blue.'}, 'poem2': {'title': 'Autumn Leaves', 'author': 'Robert Frost', 'firstLine': "My sorrow, when she's here with me, thinks these dark days of autumn rain are beautiful as days can be."}, 'poem3': {'title': 'Hope is the Thing with Feathers', 'author': 'Emily Dickinson', 'firstLine': 'Hope is the thing with feathers that perches in the soul.'}}
    
    # retry until go valid response
    final_chain = simple_chain.with_fallbacks([chain])
    response_3 = final_chain.invoke(challenge)
    print(response_3)
    
    # {'poem1': {'title': 'The Rose', 'author': 'Emily Dickinson', 'firstLine': 'A rose by any other name would smell as sweet'}, 'poem2': {'title': 'The Road Not Taken', 'author': 'Robert Frost', 'firstLine': 'Two roads diverged in a yellow wood'}, 'poem3': {'title': 'Hope is the Thing with Feathers', 'author': 'Emily Dickinson', 'firstLine': 'Hope is the thing with feathers that perches in the soul'}}
    
async def interface():
    prompt = ChatPromptTemplate.from_template(
        "Tell me a short joke about {topic}"
    )
    model = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
    output_parser = StrOutputParser()
    chain = prompt | model | output_parser
    chain.batch([
        {"topic": "chicken"},
        {"topic": "cow"},
        {"topic": "dog"}
    ])
    for t in chain.stream({"topic": "chicken"}):
        print(t)
        
    response = await chain.ainvoke({"topic": "bears"})
    print(response)


if __name__ == "__main__":
    # bind_tools()
    # fallbacks()
    import asyncio
    asyncio.run(interface())