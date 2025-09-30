import sqlite3

from agents.cart_agent.agent import create_cart_agent
from agents.customer_agent.node import create_agent_node as create_customer_agent_node
from agents.ecommerce_agent.node import create_user_node
from agents.order_agent.node import create_agent_node as create_order_agent_node
from agents.product_agent.node import create_agent_node as create_product_agent_node
from agents.service_agent.agent import create_service_agent
from agents.supervisor_agent.node import create_supervisor_agent_node
from agents.supervisor_agent.state import SupervisorState as State
from common.constants import SUPERVISOR_MODEL, TEAMMATE_MODEL
from common.entities import User
from common.utils import get_path
from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.graph import START, StateGraph
from langgraph.store.memory import InMemoryStore
from common.llms import chat_model


store = InMemoryStore()
ecommerce_checkpointer = SqliteSaver(
    sqlite3.connect(
        get_path("ecommerce_checkpoints.sqlite", "db"), check_same_thread=False
    )
)

# Each Agent will have its own checkpointer (if needed)
product_agent = create_product_agent_node(chat_model.gpt_4_1_mini)
customer_agent = create_customer_agent_node(TEAMMATE_MODEL)
order_agent = create_order_agent_node(TEAMMATE_MODEL)
cart_agent = create_cart_agent(TEAMMATE_MODEL)
service_agent = create_service_agent(TEAMMATE_MODEL)


def create_ecommerce_agent(user: User = None) -> StateGraph:
    builder = StateGraph(State)

    # nodes
    builder.add_node("get_user", create_user_node(user))
    builder.add_node(
        "supervisor_agent",
        create_supervisor_agent_node(SUPERVISOR_MODEL, user),
    )
    # builder.add_node("intent_classifier_agent", intent_classifier_agent)
    # builder.add_node("greeting_agent", greeting_agent)
    builder.add_node("product_agent", product_agent)
    builder.add_node("customer_agent", customer_agent)
    builder.add_node("order_agent", order_agent)

    # TODO: CLEAR WHY THE WORKFLOW NEED TO BE HERE, NOT A NODE INVOKE THE SUBGRAPH
    builder.add_node("service_agent", create_service_agent(TEAMMATE_MODEL))
    builder.add_node("cart_agent", create_cart_agent(TEAMMATE_MODEL))

    # logic
    # only start, dynamic route in agents
    builder.add_edge(START, "get_user")
    builder.add_edge("get_user", "supervisor_agent")

    workflow = builder.compile(
        checkpointer=ecommerce_checkpointer,
        # debug=True,
    )

    # For testing graph visualization
    # from common.utils import create_graph_image
    # create_graph_image(workflow, get_path("graph_.png", "../assets/export/"))

    return workflow
