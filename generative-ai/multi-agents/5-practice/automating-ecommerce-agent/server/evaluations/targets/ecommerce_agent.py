import uuid

from agents.ecommerce_agent.agent import create_ecommerce_agent
from eval_common.services import test_eval_data_service


def target(inputs: dict) -> dict:
    """
    Ecommerce multi-agents evaluation.
    """

    def set_up():
        state = {}
        eval_user = order = None

        if not inputs.get("is_authenticated"):
            return state, eval_user, order

        state, eval_user = test_eval_data_service.init_authenticated_user_data(
            inputs.get("cart_items")
        )

        order_action = inputs.get("order_action")
        order = test_eval_data_service.prepare_data_by_order_action(order_action, state)
        return state, eval_user, order

    def tear_down():
        if eval_user:
            test_eval_data_service.delete_user(eval_user)

    state, eval_user, order = set_up()
    graph = create_ecommerce_agent(user=eval_user)
    config = {
        "configurable": {
            "thread_id": uuid.uuid4(),
        },
        "recursion_limit": 10,
    }

    messages = inputs["messages"]
    for message in messages:
        if "order_id" in message["content"]:
            new_message = message["content"].replace("order_id", str(order.id))
            message["content"] = new_message

    state["messages"] = messages
    response = graph.invoke(state, config)

    tear_down()
    return {"response": response["messages"][-1].content}
