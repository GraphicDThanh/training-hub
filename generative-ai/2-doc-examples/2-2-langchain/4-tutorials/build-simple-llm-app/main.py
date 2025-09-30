from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate


load_dotenv()
model = ChatOpenAI(model="gpt-4o-mini")


def main():
    system_template = "Translate the following from English to {language}"
    prompt_template = ChatPromptTemplate.from_messages(
        [("system", system_template), ("user", "{text}")]
    )
    result = prompt_template.invoke({"language": "French", "text": "Hello, how are you?"})
    # print(result)
    # messages=[SystemMessage(content='Translate the following from English to French', additional_kwargs={}, response_metadata={}), HumanMessage(content='Hello, how are you?', additional_kwargs={}, response_metadata={})]
    # print(result.to_string())
    # System: Translate the following from English to French
    # Human: Hello, how are you?

    # Chain together components with LCEL
    chain = prompt_template | model
    response = chain.invoke({"language": "French", "text": "Hello, how are you?"})
    print(response.content)
    # Bonjour, comment ça va ?


if __name__ == "__main__":
    main()
