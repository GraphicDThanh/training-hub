import requests
import datetime
import wikipedia
from pydantic import BaseModel, Field

from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.agents.output_parsers import OpenAIFunctionsAgentOutputParser
from langchain_core.utils.function_calling import convert_to_openai_function
from langchain.prompts import MessagesPlaceholder
from langchain.agents.format_scratchpad import format_to_openai_functions
from langchain.schema.agent import AgentFinish
from langchain.schema.runnable import RunnablePassthrough
from langchain.agents import AgentExecutor
from langchain.memory import ConversationBufferMemory


# Define the input schema
class OpenMeteoInput(BaseModel):
    latitude: float = Field(..., description="Latitude of the location to fetch weather data for")
    longitude: float = Field(..., description="Longitude of the location to fetch weather data for")


@tool(args_schema=OpenMeteoInput)
def get_current_temperature(latitude: float, longitude: float) -> dict:
    """Fetch current temperature for given coordinates."""

    BASE_URL = "https://api.open-meteo.com/v1/forecast"

    # Parameters for the request
    params = {
        'latitude': latitude,
        'longitude': longitude,
        'hourly': 'temperature_2m',
        'forecast_days': 1,
    }

    # Make the request
    response = requests.get(BASE_URL, params=params)

    if response.status_code == 200:
        results = response.json()
    else:
        raise Exception(f"API Request failed with status code: {response.status_code}")

    current_utc_time = datetime.datetime.utcnow()
    time_list = [datetime.datetime.fromisoformat(time_str.replace('Z', '+00:00')) for time_str in results['hourly']['time']]
    temperature_list = results['hourly']['temperature_2m']

    closest_time_index = min(range(len(time_list)), key=lambda i: abs(time_list[i] - current_utc_time))
    current_temperature = temperature_list[closest_time_index]

    return f'The current temperature is {current_temperature}°C'


@tool
def search_wikipedia(query: str) -> str:
    """Run Wikipedia search and get page summaries."""
    page_titles = wikipedia.search(query)
    summaries = []
    for page_title in page_titles[: 3]:
        try:
            wiki_page =  wikipedia.page(title=page_title, auto_suggest=False)
            summaries.append(f"Page: {page_title}\nSummary: {wiki_page.summary}")
        except (
            wikipedia.wiki_client.exceptions.PageError,
            wikipedia.wiki_client.exceptions.DisambiguationError,
        ):
            pass
    if not summaries:
        return "No good Wikipedia Search Result was found"
    return "\n\n".join(summaries)

tools = [get_current_temperature, search_wikipedia]
functions = [convert_to_openai_function(f) for f in tools]


def run_agent(user_input):
    intermediate_steps = []
    while True:
        result = chain.invoke({
            "input": user_input,
            "agent_scratchpad": format_to_openai_functions(intermediate_steps)
        })
        if isinstance(result, AgentFinish):
            return result
        tool = {
            "search_wikipedia": search_wikipedia,
            "get_current_temperature": get_current_temperature,
        }[result.tool]
        observation = tool.run(result.tool_input)
        intermediate_steps.append((result, observation))


if __name__ == "__main__":
    model = ChatOpenAI(temperature=0).bind(functions=functions)
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are helpful but sassy assistant"),
        ("user", "{input}"),
    ])
    chain = prompt | model | OpenAIFunctionsAgentOutputParser()
    result = chain.invoke({"input": "what is the weather is sf?"})

    # Add a scratchpad to the agent
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are helpful but sassy assistant"),
        ("user", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ])
    chain = prompt | model | OpenAIFunctionsAgentOutputParser()

    # Test the agent with the scratchpad empty
    result1 = chain.invoke({
        "input": "what is the weather is sf?",
        "agent_scratchpad": []
    })
    # Test the agent with the scratchpad filled
    observation = get_current_temperature(result1.tool_input)
    # 'The current temperature is 9.6°C'

    result2 = chain.invoke({
        "input": "what is the weather is sf?",
        "agent_scratchpad": format_to_openai_functions([(result1, observation)])
    })
    # AgentFinish(return_values={'output': 'The current temperature in San Francisco is 9.6°C.'}, log='The current temperature in San Francisco is 9.6°C.')

    # Run the agent with the scratchpad created inside loop
    run_agent("what is the weather is sf?")

    # Use AgentExecutor to run the agent
    agent_chain = RunnablePassthrough.assign(
        agent_scratchpad= lambda x: format_to_openai_functions(x["intermediate_steps"])
    ) | chain
    agent_executor = AgentExecutor(agent=agent_chain, tools=tools, verbose=True)
    response = agent_executor.invoke({"input": "what is langchain?"})
    print("response: \n", response)
    # {'input': 'what is langchain?', 'output': 'LangChain is a software framework that helps facilitate the integration of large lang...ummarization, chatbots, and code analysis.'}

    # Add chat history to the agent
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are helpful but sassy assistant"),
        MessagesPlaceholder(variable_name="chat_history"),
        ("user", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad")
    ])

    agent_chain = RunnablePassthrough.assign(
        agent_scratchpad= lambda x: format_to_openai_functions(x["intermediate_steps"])
    ) | prompt | model | OpenAIFunctionsAgentOutputParser()
    memory = ConversationBufferMemory(return_messages=True,memory_key="chat_history")
    agent_executor = AgentExecutor(agent=agent_chain, tools=tools, verbose=True, memory=memory)
    print("input: my name is bob")
    response = agent_executor.invoke({"input": "my name is bob"})
    print("response: \n", response)
    print("input: whats my name")
    response = agent_executor.invoke({"input": "whats my name"})
    print("response: \n", response)
    print("input: whats the weather in sf?")
    agent_executor.invoke({"input": "whats the weather in sf?"})
    print("response: \n", response)