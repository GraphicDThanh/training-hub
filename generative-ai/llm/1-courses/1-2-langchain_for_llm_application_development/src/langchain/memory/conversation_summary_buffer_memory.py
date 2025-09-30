import os
from dotenv import load_dotenv, find_dotenv
import warnings

_ = load_dotenv(find_dotenv())
warnings.filterwarnings("ignore")

llm_model = os.getenv('OPENAI_LLM_MODEL_GPT_35_TURBO')

from langchain.memory import ConversationSummaryBufferMemory
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain


if __name__ == "__main__":
    schedule = "There is a meeting at 8am with your product team. \
    You will need your powerpoint presentation prepared. \
    9am-12pm have time to work on your LangChain \
    project which will go quickly because Langchain is such a powerful tool. \
    At Noon, lunch at the italian resturant with a customer who is driving \
    from over an hour away to meet you to understand the latest in AI. \
    Be sure to bring your laptop to show the latest LLM demo."


    llm = ChatOpenAI(temperature=0, model=llm_model)
    memory = ConversationSummaryBufferMemory(llm=llm, max_token_limit=100)
    memory.save_context({"input": "Hello"}, {"output": "What's up"})
    memory.save_context({"input": "Not much, just hanging"}, {"output": "Cool!"})
    memory.save_context({"input": "What is on the schedule today?"}, {"output": f"{schedule}"})
    history = memory.load_memory_variables({})
    print(history)

    conversation = ConversationChain(llm=llm, memory=memory, verbose=True)
    conversation.predict(input="What would be a good demo to show?")
    history = memory.load_memory_variables({})
    print(history)
