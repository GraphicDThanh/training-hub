import os
from dotenv import load_dotenv, find_dotenv
import warnings

_ = load_dotenv(find_dotenv())
warnings.filterwarnings("ignore")

llm_model = os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO')

from langchain.memory import ConversationTokenBufferMemory
from langchain_openai import ChatOpenAI


if __name__ == "__main__":
    llm = ChatOpenAI(temperature=0, model=llm_model)
    memory = ConversationTokenBufferMemory(llm=llm, max_token_limit=50)
    memory.save_context({"input": "AI is what?!"}, {"output": "Amazing!"})
    memory.save_context({"input": "Backpropagation is what?"}, {"output": "Beautiful!"})
    memory.save_context({"input": "Chatbots are what?"}, {"output": "Charming!"})
    history = memory.load_memory_variables({})
    print(history)

