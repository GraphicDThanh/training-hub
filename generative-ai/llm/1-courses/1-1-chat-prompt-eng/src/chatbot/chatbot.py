import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
_ = load_dotenv(find_dotenv())

def get_completion_from_messages(messages, model="gpt-3.5-turbo", temperature=1):
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature
    )
    # print(response.choices[0].message)
    return response.choices[0].message.content

def basic_examples():
    # Example 1:
    messages = [
        {
            "role": "system",
            "content": "You are an assistance..."
        },
        {
            "role": "user",
            "content": "tell me a joke"
        },
        {
            "role": "assistant",
            "content": "why did the chicken cross the road?"
        },
        {
            "role": "user",
            "content": "I don\'t know"
        },
    ]
    # response = get_completion_from_messages(messages, temperature=1.5)
    # print(response)
    # response:
    # To get to the baaaathroom!

    # Example 2:
    messages = [
        {
            "role": "system",
            "content": "You are friendly chatbot."
        },
        {
            "role": "user",
            "content": "Hi, my name is Thanh"
        }
    ]
    # response = get_completion_from_messages(messages, temperature=1)
    # print(response)
    # response:
    # Hello Thanh! It's nice to meet you. How are you doing today?

    # Example 3: info not in context
    messages = [
        {
            "role": "system",
            "content": "You are friendly chatbot."
        },
        {
            "role": "user",
            "content": "Yes, can you remind me, What is my name?"
        }
    ]
    # response = get_completion_from_messages(messages, temperature=1)
    # print(response)
    # response:
    # I'm sorry, but I don't have access to your personal information
    # such as your name. If you'd like,
    # you can go ahead and tell me your name!

    # Example 4: info in context able to response
    # Example 3:
    messages = [
        {
            "role": "system",
            "content": "You are friendly chatbot."
        },
        {
            "role": "user",
            "content": "Hi, my name is Thanh"
        },
        {
            "role": "assistant",
            "content": "Hello Thanh! It's nice to meet you. How are you doing today?"
        },
        {
            "role": "user",
            "content": "Very well, thanks for asking. Can you remind me, What is my name?"
        },
        {
            "role": "user",
            "content": "Yes, can you remind me, What is my name?"
        }
    ]
    response = get_completion_from_messages(messages, temperature=1)
    print(response)
    # response:
    # Your name is Thanh.

### ORDER BOT EXAMPLE ###
# pn is a GUI library
def collect_messages(_):
    prompt = input()
    context.append({'role':'user', 'content':f"{prompt}"})
    response = get_completion_from_messages(context)
    context.append({'role':'assistant', 'content':f"{response}"})
    panels.append(
        pn.Row('User:', pn.pane.Markdown(prompt, width=600)))
    panels.append(
        pn.Row('Assistant:', pn.pane.Markdown(response, width=600, style={'background-color': '#F6F6F6'})))

    return pn.Column(*panels)

def order_bot():
    """
    Order bot example
    """
    import panel as pn  # GUI
    pn.extension()

    panels = [] # collect display

    context = [ {'role':'system', 'content':"""
    You are OrderBot, an automated service to collect orders for a pizza restaurant. \
    You first greet the customer, then collects the order, \
    and then asks if it's a pickup or delivery. \
    You wait to collect the entire order, then summarize it and check for a final \
    time if the customer wants to add anything else. \
    If it's a delivery, you ask for an address. \
    Finally you collect the payment.\
    Make sure to clarify all options, extras and sizes to uniquely \
    identify the item from the menu.\
    You respond in a short, very conversational friendly style. \
    The menu includes \
    pepperoni pizza  12.95, 10.00, 7.00 \
    cheese pizza   10.95, 9.25, 6.50 \
    eggplant pizza   11.95, 9.75, 6.75 \
    fries 4.50, 3.50 \
    greek salad 7.25 \
    Toppings: \
    extra cheese 2.00, \
    mushrooms 1.50 \
    sausage 3.00 \
    canadian bacon 3.50 \
    AI sauce 1.50 \
    peppers 1.00 \
    Drinks: \
    coke 3.00, 2.00, 1.00 \
    sprite 3.00, 2.00, 1.00 \
    bottled water 5.00 \
    """} ]  # accumulate messages


    inp = pn.widgets.TextInput(value="Hi", placeholder='Enter text here…')
    button_conversation = pn.widgets.Button(name="Chat!")

    interactive_conversation = pn.bind(collect_messages, button_conversation)

    dashboard = pn.Column(
        inp,
        pn.Row(button_conversation),
        pn.panel(interactive_conversation, loading_indicator=True, height=300),
    )

    dashboard


    # ---
    # chatbot
    messages =  context.copy()
    messages.append(
    {
        'role':'system',
        'content':'create a json summary of the previous food order. Itemize the price for each item\
    The fields should be 1) pizza, include size 2) list of toppings 3) list of drinks, include size   4) list of sides include size  5)total price '},
    )
    #The fields should be 1) pizza, price 2) list of toppings 3) list of drinks, include size include price  4) list of sides include size include price, 5)total price '},

    response = get_completion_from_messages(messages, temperature=0)
    print(response)

if __name__ == "__main__":
    basic_examples()