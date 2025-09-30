from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper
from langchain_openai import ChatOpenAI
from langchain.agents import initialize_agent, AgentType
from langchain_core.tools import BaseToolkit
from pydantic import BaseModel, Field


def example_wikipedia():
    api_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=1000)
    tool = WikipediaQueryRun(api_wrapper=api_wrapper)
    result = tool.invoke({"query": "langchain"})
    print(result)
    ###
    # Page: LangChain
    # Summary: LangChain is a software framework that helps facilitate the integration of large language models (LLMs) into applications. As a language model integration framework, LangChain's use-cases largely overlap with those of language models in general, including document analysis and summarization, chatbots, and code analysis.

    # tool.name  # 'wikipedia'
    # tool.description  # 'A wrapper around Wikipedia. Useful for when you need to answer general questions about people, places, companies, facts, historical events, or other subjects. Input should be a search query.'
    # tool.args # {'query': {'description': 'query to look up on wikipedia', 'title': 'Query', 'type': 'string'}}
    # tool.return_direct # False
    ###


def example_customize_default_tool():


    class WikiInputs(BaseModel):
        """Inputs to the wikipedia tool."""

        query: str = Field(
            description="query to look up on wikipedia, should be 3 or less words",
        )

    api_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=1000)
    tool = WikipediaQueryRun(
        name="wiki-tool",
        description="look up things in Wikipedia",
        args_schema=WikiInputs,
        api_wrapper=api_wrapper,
        return_direct=True
    )
    result = tool.run("langchain")
    print(result)
    ###

    # Page: LangChain
    # Summary: LangChain is a software framework that helps facilitate the integration of large language models (LLMs) into applications. As a language model integration framework, LangChain's use-cases largely overlap with those of language models in general, including document analysis and summarization, chatbots, and code analysis.

    # tool.name  # 'wiki-tool'
    # tool.description  # 'look up things in Wikipedia'
    # tool.args # {'query': {'description': 'query to look up on wikipedia, should be 3 or less words', 'title': 'Query', 'type': 'string'}}
    # tool.return_direct # True

    ###

def example_custom_toolkit():
    class ExampleToolkit(BaseToolkit):
        def get_tools(self):
            return [self.wikipedia_tool()]

        def wikipedia_tool(self):
            api_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=1000)
            return WikipediaQueryRun(api_wrapper=api_wrapper)

    toolkit = ExampleToolkit()
    tools = toolkit.get_tools()
    # Define the agent
    llm = ChatOpenAI(temperature=0)  # Use OpenAI's ChatGPT model
    agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION)
    response = agent.invoke("What is LangChain?")
    print(response)
    # LangChain is a software framework that facilitates the integration of large language models into applications.

if __name__ == "__main__":
    # example_wikipedia()
    # example_customize_default_tool()
    example_custom_toolkit()