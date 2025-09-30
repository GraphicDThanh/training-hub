from typing import List

from pydantic import BaseModel, Field
from langchain.utils.openai_functions import convert_pydantic_to_openai_function
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

def pydantic_syntax():
    class User:
        def __init__(self, name: str, age: int, email: str):
            self.name = name
            self.age = age
            self.email = email

    # foo = User(name="Joe", age=32, email="joe@gmail.com")
    # print(foo.name)  # Joe
    # print(foo.age)  # 32

    class pUser(BaseModel):
        name: str
        age: int
        email: str

    # foo_p = pUser(name="Jane", age=32, email="jane@gmail.com")
    # print(foo_p.name)  # Jane
    # print(foo_p.age)  # 32

    # Fail
    # foo_p = pUser(name="Jane", age="bar", email="jane@gmail.com")

    class Class(BaseModel):
        students: List[pUser]

    obj = Class(
        students=[pUser(name="Jane", age=32, email="jane@gmail.com")]
    )
    print(obj)


def pydantic_to_openai_function_definition():
    class WeatherSearch(BaseModel):
        """Call this with an airport code to get the weather at that airport"""
        airport_code: str = Field(description="airport code to get weather for")

    class WeatherSearch1(BaseModel):
        airport_code: str = Field(description="airport code to get weather for")

    class WeatherSearch2(BaseModel):
        """Call this with an airport code to get the weather at that airport"""
        airport_code: str

    # --- Convert Pydantic class to OpenAI function
    weather_function = convert_pydantic_to_openai_function(WeatherSearch)
    # {'name': 'WeatherSearch',
    # 'description': 'Call this with an airport code to get the weather at that airport',
    # 'parameters': {'title': 'WeatherSearch',
    # 'description': 'Call this with an airport code to get the weather at that airport',
    # 'type': 'object',
    # 'properties': {'airport_code': {'title': 'Airport Code',
    #     'description': 'airport code to get weather for',
    #     'type': 'string'}},
    # 'required': ['airport_code']}}

    weather_function = convert_pydantic_to_openai_function(WeatherSearch1)
    # KeyError: 'description'

    # Description in arg is optional
    convert_pydantic_to_openai_function(WeatherSearch2)
    # {'name': 'WeatherSearch2',
    # 'description': 'Call this with an airport code to get the weather at that airport',
    # 'parameters': {'title': 'WeatherSearch2',
    # 'description': 'Call this with an airport code to get the weather at that airport',
    # 'type': 'object',
    # 'properties': {'airport_code': {'title': 'Airport Code', 'type': 'string'}},
    # 'required': ['airport_code']}}
    # --------------------------------------------

    model = ChatOpenAI()
    model.invoke("what is the weather in SF today?", functions=[weather_function])
    # AIMessage(content='', additional_kwargs={'function_call': {'name': 'WeatherSearch', 'arguments': '{"airport_code":"SFO"}'}})

    # Bind
    model_with_function = model.bind(functions=[weather_function])
    model_with_function.invoke("what is the weather in sf?")
    # AIMessage(content='', additional_kwargs={'function_call': {'name': 'WeatherSearch', 'arguments': '{"airport_code":"SFO"}'}})

    # Force to use a function
    model_with_forced_function = model.bind(functions=[weather_function], function_call={"name":"WeatherSearch", "args":{"airport_code":"SFO"}})
    model_with_forced_function.invoke("what is the weather in sf?")
    # AIMessage(content='', additional_kwargs={'function_call': {'name': 'WeatherSearch', 'arguments': '{"airport_code":"SFO"}'}})
    model_with_forced_function.invoke("hi!")
    # AIMessage(content='', additional_kwargs={'function_call': {'name': 'WeatherSearch', 'arguments': '{"airport_code":"JFK"}'}})

    # Using in a chain
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant"),
        ("user", "{input}")
    ])
    chain = prompt | model_with_function
    chain.invoke({"input": "what is the weather in sf?"})
    # AIMessage(content='', additional_kwargs={'function_call': {'name': 'WeatherSearch', 'arguments': '{"airport_code":"SFO"}'}})

    # Using multiple functions
    class ArtistSearch(BaseModel):
        """Call this to get the names of songs by a particular artist"""
        artist_name: str = Field(description="name of artist to look up")
        n: int = Field(description="number of results")

    functions = [
        convert_pydantic_to_openai_function(WeatherSearch),
        convert_pydantic_to_openai_function(ArtistSearch),
    ]
    model_with_functions = model.bind(functions=functions)
    model_with_functions.invoke("what is the weather in sf?")
    # AIMessage(content='', additional_kwargs={'function_call': {'name': 'WeatherSearch', 'arguments': '{"airport_code":"SFO"}'}})
    model_with_functions.invoke("what are three songs by taylor swift?")
    # AIMessage(content='', additional_kwargs={'function_call': {'name': 'ArtistSearch', 'arguments': '{"artist_name":"Taylor Swift","n":3}'}})
    model_with_functions.invoke("hi!")
    # AIMessage(content='Hello! How can I assist you today?')


if __name__ == "__main__":
    # pydantic_syntax()
    pydantic_to_openai_function_definition()