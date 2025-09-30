import uuid

from agentevals.graph_trajectory.utils import extract_langgraph_trajectory_from_thread
from agents.service_agent.node import create_agent_node as create_service_agent_node
from common.constants import TEAMMATE_MODEL
from eval_common.utils import extract_tool_calls_from_snapshot

service_agent = create_service_agent_node(TEAMMATE_MODEL)


def trajectory_target(inputs: dict) -> dict:
    config = {
        "configurable": {
            "thread_id": f"service_agent_eval_{str(uuid.uuid4())}",
        }
    }
    state = {"messages": inputs["inputs"]["messages"]}
    service_agent.invoke(state, config)
    extracted_trajectory = extract_langgraph_trajectory_from_thread(
        service_agent, config
    )
    outputs = extracted_trajectory["outputs"]
    # append the tool calls to the outputs
    outputs["tool_calls"] = extract_tool_calls_from_snapshot(
        service_agent.get_state(config)
    )
    return outputs


def trajectory_target_with_interrupt(inputs: dict) -> dict:
    config = {
        "configurable": {
            "thread_id": f"service_agent_with_interrupt_eval_{str(uuid.uuid4())}",
            "user_id": "user_1",
        }
    }
    state = {
        "messages": [
            {
                "role": "user",
                "content": inputs["inputs"]["messages"][0]["content"],
            }
        ]
    }

    # Run the graph
    response = service_agent.invoke(state, config)

    # Continue interrupted graph with human action
    human_action = inputs["human_action"]
    if human_action == "approve":
        service_agent.invoke(None, config)
    elif human_action == "reject":
        service_agent.invoke(
            {
                "messages": [
                    {
                        "role": "tool",
                        "content": "Tool call denied by user.",
                        "tool_call_id": response["messages"][-1].tool_calls[0]["id"],
                    }
                ]
            },
            config,
        )
    else:
        raise ValueError(
            f"Invalid human action: {human_action}. Should be 'approve' or 'reject'."
        )

    extracted_trajectory = extract_langgraph_trajectory_from_thread(
        service_agent, config
    )
    outputs = extracted_trajectory["outputs"]
    # append the tool calls to the outputs
    outputs["tool_calls"] = extract_tool_calls_from_snapshot(
        service_agent.get_state(config)
    )

    return outputs
