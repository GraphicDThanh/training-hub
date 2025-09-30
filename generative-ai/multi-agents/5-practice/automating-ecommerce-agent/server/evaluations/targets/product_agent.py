import uuid

from agentevals.graph_trajectory.utils import extract_langgraph_trajectory_from_thread
from agents.product_agent.agent import create_product_agent
from agents.product_agent.node import create_agent_node as create_product_agent_node
from common.constants import TEAMMATE_MODEL
from eval_common.utils import extract_tool_calls_from_snapshot
from langgraph.checkpoint.memory import MemorySaver

eval_product_checkpointer = MemorySaver()
product_agent = create_product_agent_node(TEAMMATE_MODEL, eval_product_checkpointer)
trajectory_product_agent = create_product_agent(TEAMMATE_MODEL)


def target(inputs: dict) -> dict:
    config = {
        "configurable": {
            "thread_id": f"product_agent_eval_{str(uuid.uuid4())}",
        }
    }
    state = {
        "query_intent": "product",
        "messages": [
            {
                "role": "user",
                "content": inputs["messages"][0]["content"],
            }
        ],
    }
    command = product_agent(state, config)

    return {"response": command.update["messages"][-1].content}


def trajectory_target(inputs: dict) -> dict:
    config = {
        "configurable": {
            "thread_id": f"service_agent_eval_{str(uuid.uuid4())}",
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
    trajectory_product_agent.invoke(state, config)

    extracted_trajectory = extract_langgraph_trajectory_from_thread(trajectory_product_agent, config)
    outputs = extracted_trajectory["outputs"]

    # append the tool calls to the outputs
    outputs["tool_calls"] = extract_tool_calls_from_snapshot(trajectory_product_agent.get_state(config))

    return outputs
