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


def principle_2():
    print("Principle 2: Give the model time to THINK")

if __name__ == "__main__":
    # print("#### Guidelines ####")
    # print("Principle 1: Write clear and specific instructions")
    # print("---------------------------------------------------")
    # from guidelines.principle_1.tactics_1 import principle_1_tastic_1
    # from guidelines.principle_1.tactics_2 import principle_1_tastic_2
    # from guidelines.principle_1.tactics_3 import principle_1_tastic_3
    # from guidelines.principle_1.tactics_4 import principle_1_tastic_4
    # principle_1_tastic_1(get_completion)
    # principle_1_tastic_2(get_completion)
    # principle_1_tastic_3(get_completion)
    # principle_1_tastic_4(get_completion)

    # print("Principle 2: Give the model time to think")
    # print("---------------------------------------------------")
    # from guidelines.principle_2.tactics_1 import principle_2_tastic_1
    # from guidelines.principle_2.tactics_2 import principle_2_tastic_2
    # principle_2_tastic_1(get_completion)
    # principle_2_tastic_2(get_completion)

    # print("Model Limitations: Hallucination")
    # from guidelines.limitations.hallucination import hallucination
    # hallucination(get_completion)

    # print("#### Iterative ####")
    # from iterative.iterative_prompt import iterative_prompt
    # iterative_prompt(get_completion)

    # print("#### Summarizing ####")
    # from summarizing.summarizing import summarize
    # summarize(get_completion)


    # print("#### Inferring ####")
    # from inferring.inferring import inferring, inferring_topic
    # inferring(get_completion)
    # inferring_topic(get_completion)

    # print("#### Transforming ####")
    # from transforming.transforming import transforming
    # transforming(get_completion)

    print("#### Expanding ####")
    from expanding.expanding import expanding
    expanding(get_completion)

    # print("#### Chatbot ####")