import os
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate


if __name__ == "__main__":
    # Model
    llm_model = os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO')
    chat = ChatOpenAI(temperature=0, model=llm_model)
    print(chat)

    # Prompt Template
    template_string = """
    Translate the text that is delimited by triple backticks into a style that is {style}.
    text: ```{text}```
    """
    prompt_template = ChatPromptTemplate.from_template(template_string)
    print("prompt_template prompt: \n", prompt_template.messages[0].prompt)
    print("prompt_template input variables: \n", prompt_template.messages[0].prompt.input_variables)

    # - Customer message
    customer_style = """
    American English in a calm and respectful tone
    """
    customer_email = """
    Arrr, I be fuming that me blender lid flew off and splattered me kitchen walls \
    with smoothie! And to make matters worse, the warranty don't cover the cost of \
    cleaning up me kitchen. I need yer help right now, matey!
    """
    customer_messages = prompt_template.format_messages(
        text=customer_email,
        style=customer_style
    )
    print("type of customer_messages: \n", type(customer_messages))
    print("type of first customer_messages: \n", type(customer_messages[0]))
    print("first customer_messages: \n", customer_messages[0])
    customer_response = chat.invoke(customer_messages)
    print("customer_response: \n", customer_response.content)

    # - Service message
    service_reply = """
    Hey there customer, the warranty does not cover cleaning expenses for your kitchen
    because it's your fault that you misused the blender by forgetting to put the lid on before
    starting the blender. Tough luck! See ya!
    """
    service_style_pirate = """
    a police tone that speaks in English Pirate
    """
    service_messages = prompt_template.format_messages(
        text=service_reply,
        style=service_style_pirate
    )
    service_response = chat.invoke(service_messages)
    print("service_response: \n", service_response.content)

    # - Observation:
    # Strong here when use LangChain is we can reuse the template for different messages