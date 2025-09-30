from typing import Any, Dict, List

from langchain_core.callbacks import BaseCallbackHandler
from langchain_core.messages import BaseMessage
from langchain_core.outputs import LLMResult
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI


class MyCustomCallback(BaseCallbackHandler):
    def on_llm_new_token(self, token: str, **kwargs) -> None:
        print(f"My custom handler: New token: {token}")

prompt = ChatPromptTemplate.from_messages(["Tell me a joke about {animal}"])

# To enable streaming, we pass in `streaming=True` to the model constructor
# Additionally, we pass in the custom callback handler as a list to the callbacks parameter
model = ChatOpenAI(
    model="gpt-4o-mini",
    callbacks=[MyCustomCallback()],
    streaming=True
)
chain = prompt | model
response = chain.invoke({"animal": "elephants"})
print(response)