import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
_ = load_dotenv(find_dotenv())

def get_completion(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = client.chat.completions.create(model=model,
    messages=messages,
    temperature=0)
    return response.choices[0].message.content

