import sqlite3

from common.utils import get_path, read_prompt
from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.prebuilt import create_react_agent

from .state import OrderAgentState
from .tools import (
    cancel_order_request,
    get_order_detail,
    get_orders,
    return_order_request,
)

order_checkpointer = SqliteSaver(
    sqlite3.connect(
        get_path("customer_checkpoints.sqlite", "db"), check_same_thread=False
    )
)


def create_order_agent(llm, checkpointer=order_checkpointer):
    if not checkpointer:
        checkpointer = order_checkpointer

    system_prompt = read_prompt("agents/order_agent/prompt.md")
    order_agent = create_react_agent(
        llm,
        tools=[
            get_orders,
            get_order_detail,
            return_order_request,
            cancel_order_request,
        ],
        state_schema=OrderAgentState,
        prompt=system_prompt,
    )
    return order_agent
