from typing import Literal, Optional

from pydantic import BaseModel


class SupervisorResponse(BaseModel):
    """
    Model for the response from the supervisor agent.
    This model is used to define the structure of the response
    that the supervisor agent will return after processing the input.
    """

    delegate: Literal[
        "service_agent",
        "product_agent",
        "customer_agent",
        "cart_agent",
        "order_agent",
        "FINISH",
    ]
    query_intent: Literal[
        "greeting", "service", "product", "cart", "order", "customer", "unknown"
    ]

    reply_greeting: Optional[str] = None
    reply_unknown: Optional[str] = None


def create_supervisor_agent(llm):
    return llm.with_structured_output(SupervisorResponse)
