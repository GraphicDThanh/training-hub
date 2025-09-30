import os
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate


if __name__ == "__main__":
    # Output parser
    # {
    #     "gift": False,
    #     "delivery_days": 5,
    #     "price_value": "pretty affordable",
    # }
    customer_review = """
    This leaf blower is pretty amazing.  It has four settings:\
    candle blower, gentle breeze, windy city, and tornado. \
    It arrived in two days, just in time for my wife's \
    anniversary present. \
    I think my wife liked it so much she was speechless. \
    So far I've been the only one using it, and I've been \
    using it every other morning to clear the leaves on our lawn. \
    It's slightly more expensive than the other leaf blowers \
    out there, but I think it's worth it for the extra features.
    """

    review_template = """
    For the following text, extract the following information:

    gift: Was the item purchased as a gift for someone else?
    Answer True if yes, False if not or unknown.

    delivery_days: How many days did it take for the product to arrive?
    If this information is not found, output -1.

    price_value: Extract any sentences about the value or price, and output them as a comma separated Python list.

    Format the output as JSON with the following keys:
    gift
    delivery_days
    price_value

    text: {text}
    """
    prompt_template = ChatPromptTemplate.from_template(review_template)
    print("prompt_template prompt: ", prompt_template)

    messages = prompt_template.format_messages(text=customer_review)
    chat = ChatOpenAI(temperature=0, model=os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO'))
    response = chat.invoke(messages)
    print("response: ", response.content)
    print("type of response: ", type(response.content))
    # print("gift: ", response.content.get('gift'))  # error because content is string