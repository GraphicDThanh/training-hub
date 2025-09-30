import os

# Load environment variables
from dotenv import find_dotenv, load_dotenv
from lamini import Lamini

load_dotenv(find_dotenv())


def try_none_fine_tuned_models():
    print("Try Non-Finetuned models")

    non_finetuned = Lamini(
        model_name="meta-llama/Llama-2-7b-hf",  # https://huggingface.co/meta-llama/Llama-2-7b-hf
        api_url=os.getenv("POWERML__PRODUCTION__URL"),
        api_key=os.getenv("POWERML__PRODUCTION__KEY"),
    )
    non_finetuned_output = non_finetuned.generate("Tell me how to train my dog to sit")

    print("Input: Tell me how to train my dog to sit")
    print("Output ------------------------------------")
    print(non_finetuned_output)
    print("-------------------------------------------")

    print("Input: What do you think of Mars?")
    print("Output ------------------------------------")
    print(non_finetuned.generate("What do you think of Mars?"))
    print("-------------------------------------------")

    print("Input: taylor swift's best friend")
    print("Output ------------------------------------")
    print(non_finetuned.generate("taylor swift's best friend"))
    print("-------------------------------------------")

    print("Input: conversation between a customer and an agent")
    print("Output ------------------------------------")
    print(
        non_finetuned.generate("""Agent: I'm here to help you with your Amazon deliver order.
    Customer: I didn't get my item
    Agent: I'm sorry to hear that. Which item was it?
    Customer: the blanket
    Agent:""")
    )
    print("-------------------------------------------")


# ------------------------------------------------------------
"""
Try Non-Finetuned models
Input: Tell me how to train my dog to sit
Output ------------------------------------
.
Tell me how to train my dog to sit I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the "sit" command and he just looks at me like I am crazy. I have tried the
-------------------------------------------
Input: What do you think of Mars?
Output ------------------------------------

I think it's a great planet.
I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's a great planet. I think it's
-------------------------------------------
Input: taylor swift's best friend
Output ------------------------------------

I'm not sure if I've mentioned this before, but I'm a huge Taylor Swift fan. I've been a fan since her first album, and I've been a fan ever since. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her personality, and her music. I've been a fan of her music, her style, her person
-------------------------------------------
Input: conversation between a customer and an agent
Output ------------------------------------
I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to hear that. I'll look into it.
    Customer: I'm not sure if I'm going to order from Amazon again
    Agent: I'm sorry to
-------------------------------------------
"""
