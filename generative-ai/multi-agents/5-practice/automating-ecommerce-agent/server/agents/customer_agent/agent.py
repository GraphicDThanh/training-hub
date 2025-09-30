import sqlite3

from common.utils import get_path, read_prompt
from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.prebuilt import create_react_agent

from .state import CustomerAgentState
from .tools.get_profile import get_profile
from .tools.retrieve_cart_checkout_user_data import retrieve_cart_checkout_user_data

customer_checkpointer = SqliteSaver(
    sqlite3.connect(
        get_path("customer_checkpoints.sqlite", "db"), check_same_thread=False
    )
)


def create_customer_agent(llm, checkpointer=customer_checkpointer):
    """
    Creates a customer agent with specified language model and checkpointing functionality.

    This function initializes a reactive agent that handles customer-related operations using
    provided tools for profile management and cart/checkout data retrieval.

    Parameters:
        llm: Language model instance to be used by the agent
        checkpointer (optional):
            Checkpointing function to track agent state.
            Defaults to customer_checkpointer

    Returns:
        An initialized customer agent instance configured with the specified tools and system prompt

    Example:
        agent = create_customer_agent(llm_instance)
    """
    if not checkpointer:
        checkpointer = customer_checkpointer

    system_prompt = read_prompt("agents/customer_agent/prompt.md")
    customer_agent = create_react_agent(
        llm,
        tools=[get_profile, retrieve_cart_checkout_user_data],
        state_schema=CustomerAgentState,
        prompt=system_prompt,
        checkpointer=checkpointer,
    )
    return customer_agent
