import uuid

from agents.cart_agent.node import create_agent_node as create_cart_agent_node
from common.constants import TEAMMATE_MODEL
from eval_common.services import test_eval_data_service
from langgraph.checkpoint.memory import MemorySaver

eval_cart_checkpointer = MemorySaver()
cart_agent = create_cart_agent_node(TEAMMATE_MODEL, eval_cart_checkpointer)


def target(inputs: dict) -> dict:
    """Cart Agent Target Evaluation."""

    def set_up():
        eval_user = None
        state = {}

        if not inputs.get("is_authenticated"):
            return state, eval_user

        state, eval_user = test_eval_data_service.init_authenticated_user_data(
            state,
            inputs.get("cart_items"),
        )

        state["query_intent"] = "cart"

        if inputs.get("product_retrieved_intermediate_step"):
            state["product_retrieved_intermediate_step"] = inputs.get("product_retrieved_intermediate_step")

        if inputs.get("cart_checkout_user_data"):
            state["cart_checkout_user_data"] = inputs.get("cart_checkout_user_data")

        return state, eval_user

    def tear_down():
        if eval_user:
            test_eval_data_service.delete_user(eval_user)

    state, eval_user = set_up()
    config = {
        "configurable": {
            "thread_id": f"service_agent_eval_{uuid.uuid4()!s}",
        },
    }
    state["messages"] = inputs["messages"]
    command = cart_agent(state, config)

    tear_down()
    return {"response": command.update["messages"][-1].content}
