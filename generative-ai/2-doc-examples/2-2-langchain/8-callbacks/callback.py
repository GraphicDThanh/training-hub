from typing import Any, Dict, List

from langchain_core.callbacks import BaseCallbackHandler
from langchain_core.messages import BaseMessage
from langchain_core.outputs import LLMResult
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI


class LoggingHandler(BaseCallbackHandler):
    def on_chat_model_start(self, serialized: Dict[str, Any], messages: List[List[BaseMessage]], **kwargs) -> None:
        print("Chat model started")

    def on_llm_end(self, response: LLMResult, **kwargs) -> None:
        print(f"Chat model ended, response: {response}")

    def on_chain_start(self, serialized: Dict[str, Any], inputs: Dict[str, Any], **kwargs) -> None:
        print(f"Chain {serialized.get('name')} started")

    def on_chain_end(self, outputs: Dict[str, Any], **kwargs) -> None:
        print(f"Chain ended, outputs: {outputs}")


def callback_runtime():
    callbacks = [LoggingHandler()]
    llm = ChatOpenAI(model="gpt-4o-mini", callbacks=callbacks)
    prompt = ChatPromptTemplate.from_template("What is 1 + {number}?")
    chain = prompt | llm
    # The callbacks are passed as a config parameter
    response = chain.invoke({"number": 1}, config={"callbacks": callbacks})
    print(response)


def attach_callback_to_runnable():
    callbacks = [LoggingHandler()]
    llm = ChatOpenAI(model="gpt-4o-mini", callbacks=callbacks)
    prompt = ChatPromptTemplate.from_template("What is 1 + {number}?")
    chain = prompt | llm
    # The callbacks are attached to the chain via .with_config
    chain_with_callback = chain.with_config(callbacks)
    response = chain_with_callback.invoke({"number": 1})
    print(response)

def propagate_callbacks_constructor():
    callbacks = [LoggingHandler()]
    # The callbacks are passed as a parameter to the constructor
    llm = ChatOpenAI(model="gpt-4o-mini", callbacks=callbacks)
    prompt = ChatPromptTemplate.from_template("What is 1 + {number}?")
    chain = prompt | llm
    chain.invoke({"number": "2"})

if __name__ == "__main__":
    callback_runtime()
    attach_callback_to_runnable()