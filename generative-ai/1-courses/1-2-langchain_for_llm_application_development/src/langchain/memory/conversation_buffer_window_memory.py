import os
from dotenv import load_dotenv, find_dotenv
import warnings

_ = load_dotenv(find_dotenv())
warnings.filterwarnings("ignore")

llm_model = os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO')

from langchain.memory import ConversationBufferWindowMemory
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain


if __name__ == "__main__":
    # Example 1
    # memory = ConversationBufferWindowMemory(k=1)
    # memory.save_context({"input": "Hi"}, {"output": "What's up"})
    # memory.save_context(
    #     {"input": "Not much, just hanging"}, {"output": "Cool"}
    # )
    # history = memory.load_memory_variables({})
    # print(history)

    # Example 2
    memory = ConversationBufferWindowMemory(k=1)
    llm_model = os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO')
    llm = ChatOpenAI(temperature=0, model=llm_model)
    conversation = ConversationChain(llm=llm, memory=memory, verbose=False)
    response = conversation.predict(input="Hi, my name is Andrew.")
    print(response)
    response = conversation.predict(input="What is 1+1?")
    print(response)
    response = conversation.predict(input="What is my name?")
    print(response)
    # I'm sorry, I do not have access to personal information such as your name. Is there anything else you would like to ask?

