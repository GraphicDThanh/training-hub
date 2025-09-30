import sqlite3

from common.utils import get_path, read_prompt
from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.prebuilt import create_react_agent

from .state import ProductAgentState as State
from .tools.retrieve_product_intermediate_step import retrieve_product_intermediate_step
from .tools.search_google_shopping import search_google_shopping
from .tools.sql_tools import (
    check_and_execute_query_tool,
    sql_db_list_tables,
    sql_db_schema,
)

product_checkpointer = SqliteSaver(
    sqlite3.connect(get_path("product_checkpoints.sqlite", "db"), check_same_thread=False)
)


def create_product_agent(llm, checkpointer=product_checkpointer):
    if not checkpointer:
        checkpointer = product_checkpointer

    system_prompt = read_prompt("agents/product_agent/prompt.md")

    tools = [
        check_and_execute_query_tool,
        sql_db_list_tables,
        sql_db_schema,
        search_google_shopping,
        retrieve_product_intermediate_step,
    ]

    product_agent = create_react_agent(
        llm,
        tools=tools,
        state_schema=State,
        prompt=system_prompt,
        checkpointer=checkpointer,
    )

    return product_agent
