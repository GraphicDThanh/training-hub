from agents.order_agent.node import create_agent_node as create_order_agent_node
from common.constants import TEAMMATE_MODEL
from eval_common.services import test_eval_data_service

order_agent = create_order_agent_node(TEAMMATE_MODEL)


def target(inputs: dict) -> dict:
    """
    Order Agent Target Evaluation.
    """

    def set_up():
        state = {}
        eval_user = order = None

        if not inputs.get("is_authenticated"):
            return state, eval_user, order

        state, eval_user = test_eval_data_service.init_authenticated_user_data(inputs.get("cart_items"))

        order_action = inputs.get("order_action")
        order = test_eval_data_service.prepare_data_by_order_action(order_action, state)

        state["query_intent"] = "order"
        state["user_id"] = str(eval_user.id)
        return state, eval_user, order

    def tear_down():
        if eval_user:
            test_eval_data_service.delete_user(eval_user)

    state, eval_user, order = set_up()

    # Update messages with order data of user
    messages = inputs["messages"]
    for message in messages:
        if "order_id" in message["content"]:
            new_message = message["content"].replace("order_id", str(order.id))
            message["content"] = new_message

    state["messages"] = messages
    command = order_agent(state)

    tear_down()
    return {"response": command.update["messages"][-1].content}
