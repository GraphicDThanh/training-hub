import os
from dotenv import load_dotenv, find_dotenv
import warnings
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

_ = load_dotenv(find_dotenv())
warnings.filterwarnings("ignore")
llm_model = os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO')

if __name__ == "__main__":
    llm = ChatOpenAI(temperature=0, model=llm_model)
    memory = ConversationBufferMemory()
    conversation = ConversationChain(llm=llm, memory=memory, verbose=True)
    response = conversation.predict(input="Hi, my name is Andrew.")
    print(response)
    response = conversation.predict(input="What is 1+1?")
    print(response)
    response = conversation.predict(input="What is my name?")
    print(response)
    print(memory.buffer)
    history = memory.load_memory_variables({})
    print(history)

    # New memory ------------------------------------------
    memory = ConversationBufferMemory()
    memory.save_context({"input": "Hi"}, {"output": "What's up"})
    print(memory.buffer)
    history = memory.load_memory_variables({})
    print(history)
    memory.save_context(
        {"input": "Not much, just hanging"}, {"output": "Cool"}
    )
    history = memory.load_memory_variables({})
    print(history)
