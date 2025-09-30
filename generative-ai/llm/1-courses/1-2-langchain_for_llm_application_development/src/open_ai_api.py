import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
llm_model = os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO')

def get_completion(prompt, model=llm_model):
    messages = [{"role": "user", "content": prompt}]
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    # Chat API: OpenAI
    # 1. test for completion
    # response = get_completion("What is 1+1?")
    # print(response)

    # 2. test for completion with prompt
    customer_email = """
    Arrr, I be fuming that me blender lid flew off and splattered me kitchen walls \
    with smoothie! And to make matters worse, the warranty don't cover the cost of \
    cleaning up me kitchen. I need yer help right now, matey!
    """
    style = """
    American English in a calm and respectful tone
    """
    prompt = f"""
    Translate the text that is delimited by triple backticks into a style that is {style}.
    text: ```{customer_email}```
    """
    print("Prompt: \n", prompt)
    print("Response: \n", get_completion(prompt))
    # response:
    # I am really upset that my blender lid flew off
    # and splattered my kitchen walls with smoothie!
    # And to make matters worse, the warranty doesn't cover the cost of cleaning up my kitchen.
    # I could really use your help right now, friend.
