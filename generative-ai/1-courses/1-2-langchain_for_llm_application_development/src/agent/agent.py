import os
from dotenv import load_dotenv, find_dotenv

# import langchain
from langchain.agents.agent_toolkits import create_python_agent
from langchain.agents import load_tools, initialize_agent
from langchain.agents import AgentType
from langchain.tools.python.tool import PythonREPLTool
from langchain.python import PythonREPL
from langchain_openai import ChatOpenAI

_ = load_dotenv(find_dotenv())

if __name__ == "__main__":
    llm_model = os.getenv("OPENAI_LLM_MODEL_GPT_35_TURBO")
    llm = ChatOpenAI(temperature=0, model=llm_model)

    tools = load_tools(["llm-math", "wikidata"], llm=llm)
    agent = initialize_agent(
        tools,
        llm,
        agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION,
        handle_parsing_errors=True,
        verbose=True,  # print out steps
    )

    agent("What is the 25% of 300?")

    question = "Tom M. Mitchell is an American computer scientist \
    and the Founders University Professor at Carnegie Mellon University (CMU)\
    what book did he write?"
    result = agent(question)

    # Python Agent
    agent = create_python_agent(llm, tool=PythonREPLTool(), verbose=True)

    customer_list = [
        ["Harrison", "Chase"],
        ["Lang", "Chain"],
        ["Dolly", "Too"],
        ["Elle", "Elem"],
        ["Geoff", "Fusion"],
        ["Trance", "Former"],
        ["Jen", "Ayai"],
    ]
    agent.run(
        f"""Sort these customers by \
    last name and then first name \
    and print the output: {customer_list}"""
    )

    import langchain

    langchain.debug = True
    agent.run(
        f"""Sort these customers by \
    last name and then first name \
    and print the output: {customer_list}"""
    )
    langchain.debug = False

    # Define your own tool
    from langchain.agents import tool
    from datetime import date

    @tool
    def time(text: str) -> str:
        """Returns todays date, use this for any \
        questions related to knowing todays date. \
        The input should always be an empty string, \
        and this function will always return todays \
        date - any date mathmatics should occur \
        outside this function."""
        return str(date.today())

    agent = initialize_agent(
        tools + [time],
        llm,
        agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION,
        handle_parsing_errors=True,
        verbose=True,
    )

    try:
        result = agent("whats the date today?")
    except:
        print("exception on external access")