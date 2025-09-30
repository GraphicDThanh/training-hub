import os
import openai
import json

from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

openai.api_key = os.getenv("OPENAI_API_KEY")

# Example dummy function hard coded to return the same weather
# In production, this could be your backend API or an external API
def get_current_weather(location, unit="fahrenheit"):
    """Get the current weather in a given location"""
    weather_info = {
        "location": location,
        "temperature": "72",
        "unit": unit,
        "forecast": ["sunny", "windy"],
    }
    return json.dumps(weather_info)


# define a function
functions = [
    {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and state, e.g. San Francisco, CA",
                },
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
            },
            "required": ["location"],
        },
    }
]

messages = [
    {
        "role": "user",
        "content": "What's the weather like in Boston?"
    }
]

messages_not_call = [
    {
        "role": "user",
        "content": "hi"
    }
]

def main():
    response = openai.chat.completions.create(
        # OpenAI Updates: As of June 2024, we are now using the GPT-3.5-Turbo model
        model="gpt-3.5-turbo",
        messages=messages,
        functions=functions
    )
    # print(response)
    # print(response.choices[0].message)
    # print(response.choices[0].message.function_call)
    # print(response.choices[0].message.function_call.arguments)
    # args = json.loads(response.choices[0].message.function_call.arguments)
    # # {'location': 'Boston', 'unit': 'celsius'}
    # get_current_weather(**args)
    # # '{"location": "Boston", "temperature": "72", "unit": "celsius", "forecast": ["sunny", "windy"]}'

    # Not use function decide by model
    # response = openai.chat.completions.create(
    #     model="gpt-3.5-turbo",
    #     messages=messages_not_call,
    #     functions=functions
    # )
    # print(response.choices[0].message.function_call) # None

    # # Force call function
    # response = openai.chat.completions.create(
    #     model="gpt-3.5-turbo",
    #     messages=messages_not_call,
    #     functions=functions,
    #     function_call={"name": "get_current_weather"}
    # )
    # # function_call:
    # # auto: decide by model
    # # none: not call function
    # # "": call function
    # print(response.choices[0].message.function_call.arguments)
    # # Hallucination: '{"location":"San Francisco, CA"}'

    # Usage
    # print("completion_tokens:", response.usage.completion_tokens)
    # print("prompt_tokens:", response.usage.prompt_tokens)
    # print("total_tokens:", response.usage.total_tokens)

    # Append message:
    messages.append(response.choices[0].message)
    # print(response.choices[0].message.function_call.arguments)
    arguments = json.loads(response.choices[0].message.function_call.arguments)
    observation = get_current_weather(**arguments)

    messages.append({
        "role": "function",
        "name": "get_current_weather",
        "content": observation
    })

    response = openai.chat.completions.create(
        # OpenAI Updates: As of June 2024, we are now using the GPT-3.5-Turbo model
        model="gpt-3.5-turbo",
        messages=messages,
        functions=functions
    )
    print(response.choices[0].message)
    # content: The current weather in Boston is 72°C and it is sunny and windy.

if __name__ == "__main__":
    main()
