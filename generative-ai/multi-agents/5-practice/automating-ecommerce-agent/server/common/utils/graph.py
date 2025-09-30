from langchain_core.messages import ToolMessage, AIMessage
from langchain_core.runnables import RunnableLambda
from langgraph.prebuilt import ToolNode
from langgraph.types import StateSnapshot
from langgraph.types import Command

def handle_tool_error(state) -> dict:
    error = state.get("error")
    tool_calls = state["messages"][-1].tool_calls
    return {
        "messages": [
            ToolMessage(
                content=f"Error: {repr(error)}\n please fix your mistakes.",
                tool_call_id=tc["id"],
            )
            for tc in tool_calls
        ]
    }


def create_tool_node_with_fallback(tools: list) -> dict:
    return ToolNode(tools).with_fallbacks(
        [RunnableLambda(handle_tool_error)], exception_key="error"
    )


def check_if_call_sensitive_tool(snapshot: StateSnapshot) -> bool:
    """
    Check if the next node is sensitive_tools or subgraph want call sensitive tools.

    Args:
        snapshot (StateSnapshot): _description_

    Returns:
        bool: True if the next node is sensitive_tools or subgraph want call sensitive tools, False otherwise.
    """
    is_sensitive_tool_next = False
    tool_call_data = None
    if not snapshot.next:
        return is_sensitive_tool_next, tool_call_data

    # Check if the next node is sensitive_tools
    if "sensitive_tools" in snapshot.next:
        is_sensitive_tool_next = True
        tool_call_data = snapshot.values["messages"][-1].tool_calls[0]
        return is_sensitive_tool_next, tool_call_data

    # Check if subgraph want call sensitive tools
    tasks = snapshot.tasks
    for task in tasks:
        if task.state and "sensitive_tools" in task.state.next:
            is_sensitive_tool_next = True
            tool_call_data = task.state.values["messages"][-1].tool_calls[0]
            return is_sensitive_tool_next, tool_call_data

    return is_sensitive_tool_next, tool_call_data


def create_state_update(
    tool_message: str, tool_call_id: str, state_additional_data: dict = None
) -> dict:
    """
    Util help create state update.
    This function is used to create a state update for the tool call.
    It takes a message, tool call ID, and optional additional data,
    and returns a dictionary representing the state update.

    Args:
        message (str): tool message
        tool_call_id (str): tool call id
        additional_data (dict, optional): additional data want to update in state exclude "messages". Defaults to None.

    Returns:
        dict: state update
    """
    if not tool_call_id:
        raise ValueError("tool_call_id is required")
    if not tool_message:
        raise ValueError("tool_message is required")

    state_update = {"messages": [ToolMessage(tool_message, tool_call_id=tool_call_id)]}

    if state_additional_data:
        return {
            **state_update,
            **state_additional_data,
        }

    return state_update


def create_graph_image(graph, image_name):
    """
    Create the graph image

    :param graph: the graph
    :param image_name: the image name
    """
    img_data = graph.get_graph(xray=2).draw_mermaid_png()
    with open(image_name, "wb") as f:
        f.write(img_data)
