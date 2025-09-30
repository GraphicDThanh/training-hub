from agents.supervisor_agent.node import create_supervisor_agent_node
from common.constants import SUPERVISOR_MODEL
from eval_common.services import test_eval_data_service
from langgraph.graph import END


def target(inputs: dict) -> dict:
    """
    Supervisor Agent Target.
    """

    def set_up():
        eval_user = None

        if inputs.get("is_authenticated"):
            # Authenticated user
            eval_user = test_eval_data_service.get_or_create_user()

            state = {
                "messages": inputs["messages"],
                "user": eval_user,
            }
            supervisor_node = create_supervisor_agent_node(SUPERVISOR_MODEL, eval_user)

        else:
            # Anonymous
            supervisor_node = create_supervisor_agent_node(SUPERVISOR_MODEL)
            state = {
                "messages": inputs["messages"],
            }

        return supervisor_node, state, eval_user

    def tear_down():
        if eval_user:
            test_eval_data_service.delete_user(eval_user)

    supervisor_node, state, eval_user = set_up()

    command = supervisor_node(state)
    tear_down()

    return {"response": command.update["messages"][-1].content}


def delegate_target(inputs: dict) -> dict:
    """
    Supervisor multi steps delegation.
    Simulate supervisor + teammate delegation until FINISH, dynamic mocking agent response from example data.
    """

    def set_up():
        eval_user = None

        if inputs.get("is_authenticated"):
            # Authenticated user
            eval_user = test_eval_data_service.get_or_create_user()

            state = {
                "messages": inputs["messages"],
                "user": eval_user,
            }
            supervisor_node = create_supervisor_agent_node(SUPERVISOR_MODEL, eval_user)

        else:
            # Anonymous
            supervisor_node = create_supervisor_agent_node(SUPERVISOR_MODEL)
            state = {
                "messages": inputs["messages"],
            }

        return supervisor_node, state, eval_user

    def tear_down():
        if eval_user:
            test_eval_data_service.delete_user(eval_user)

    supervisor_node, state, eval_user = set_up()
    delegation_chain = ["__start__"]
    mock_responses = inputs.get("mock_agent_responses", {})

    while True:
        # Ask supervisor what to do next
        command = supervisor_node(state)
        delegation_chain.append(command.goto)

        if command.goto == END:
            # Supervisor decided to end the conversation
            break

        state["messages"].append(
            {
                "role": "ai",
                "name": command.goto,
                "content": mock_responses.get(
                    command.goto, "No mock response provided."
                ),
            }
        )

    tear_down()
    return {"delegation_chain": delegation_chain}
