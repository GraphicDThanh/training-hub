from agents.cart_agent.node import create_agent_node as create_cart_agent_node
from agents.customer_agent.node import create_agent_node as create_customer_agent_node
from agents.order_agent.node import create_agent_node as create_order_agent_node
from agents.product_agent.node import create_agent_node as create_product_agent_node
from agents.service_agent.node import create_agent_node as create_service_agent_node
from common.constants import TEAMMATE_MODEL
from common.llms import chat_model

service_agent = create_service_agent_node(TEAMMATE_MODEL)
# need more ability to reasoning then use better
product_agent = create_product_agent_node(chat_model.gpt_4_1_mini)
customer_agent = create_customer_agent_node(TEAMMATE_MODEL)
cart_agent = create_cart_agent_node(TEAMMATE_MODEL)
order_agent = create_order_agent_node(TEAMMATE_MODEL)


TEAMMATE_AGENTS = {
    "service": service_agent,
    "product": product_agent,
    "customer": customer_agent,
    "cart": cart_agent,
    "order": order_agent,
}


def get_teammate_agent(agent_name: str):
    """Get the agent subgraph by name."""
    if agent_name not in TEAMMATE_AGENTS:
        raise ValueError(f"Agent {agent_name} not found.")

    return TEAMMATE_AGENTS[agent_name]
