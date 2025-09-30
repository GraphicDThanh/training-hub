import json
from typing import AsyncGenerator

from agents.ecommerce_agent.agent import create_ecommerce_agent
from common.types.request import ChatRequest, ToolCallApprovalRequest
from common.utils import build_require_approval_message, check_if_call_sensitive_tool
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse, StreamingResponse
from langchain_core.messages import ToolMessage
from langgraph.types import Command

router = APIRouter(prefix="/chat", tags=[""])


@router.post("/invoke")
async def chat_invoke(request: ChatRequest):
    """Invoke chat"""
    user_id = request.user.id if request.user else "anonymous_user"
    graph = create_ecommerce_agent(request.state.user)
    response = graph.invoke(
        {
            "messages": [("user", request.message)],
            "user_id": user_id,
        },
        {"configurable": {"thread_id": request.thread_id, "user_id": user_id}},
    )
    first_message_content = response["messages"][0].content
    return JSONResponse(
        first_message_content,
        media_type="application/json",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )


########## old code ##########
# add_routes(
#     app,
#     agent_chain,
#     path="/chat",
#     input_type=ChatRequest,
#     output_type="auto",
#     config_keys=("configurable",),
#     enabled_endpoints=("invoke"),
# )
########## old code ##########

# ---------------------- CHAT INVOKE ----------------------


# ---------------------- CHAT STREAMING ----------------------
async def stream_agent_response(
    chat_request: ChatRequest, request: Request
) -> AsyncGenerator[bytes, None]:
    graph = create_ecommerce_agent(user=request.state.user)

    config = {
        "configurable": {
            "thread_id": chat_request.thread_id,
        },
        "recursion_limit": 10,
    }
    response = graph.invoke({"messages": [("user", chat_request.message)]}, config)
    yield json.dumps(response["messages"][-1].content).encode("utf-8")

    # interrupt
    snapshot = graph.get_state(config, subgraphs=True)
    is_sensitive_tool_next, tool_call_data = check_if_call_sensitive_tool(snapshot)
    if is_sensitive_tool_next and tool_call_data:
        yield json.dumps(
            {
                "require_approval": True,
                "message": build_require_approval_message(
                    tool_call_data, snapshot.values
                ),
                "thread_id": chat_request.thread_id,
                "tool_call_data": tool_call_data,
            }
        ).encode("utf-8")

    # TODO: Streaming response for multi-agents
    # Current issue: The stream() method is not working as expected
    # - case: Query: "Hi" -> It not have AI message in the stream
    # - case: Query: "Give me categories list." -> It's work by yield the content of subgraph AIMessageChunk

    # for metadata, msg in graph.stream(
    #     {"messages": messages},
    #     config,
    #     stream_mode="messages",
    #     subgraphs=True
    # ):
    #     print("metadata::: ", metadata)
    #     print("msg::: ", msg)
    #     # if "supervisor_agent" in metadata[0]:
    #     #     continue

    #     if type(msg) is tuple:
    #         for message in msg:
    #             if (
    #                 isinstance(message, AIMessageChunk)
    #                 and message.content
    #             ):
    #                 # print(f"{message.content}|")
    #                 yield json.dumps(message.content).encode("utf-8")
    #                 await asyncio.sleep(0.05)
    #             else:
    #                 # print("NOT AI MESSAGE CHUNK: ", message)
    #                 pass
    #     else:
    #         yield json.dumps(str(msg)).encode("utf-8")
    #         await asyncio.sleep(0.05)


@router.post("/stream")
async def chat_stream(chat_request: ChatRequest, request: Request):
    """Stream chat messages"""
    return StreamingResponse(
        stream_agent_response(chat_request, request),
        media_type="application/json",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )


# ---------------------- CHAT STREAMING ----------------------


# ---------------------- HUMAN IN THE LOOP ----------------------
@router.post("/approve")
async def approve_action(
    tool_approval_request: ToolCallApprovalRequest, request: Request
):
    """Approve tool call"""
    print("Approve tool call!")
    graph = create_ecommerce_agent(user=request.state.user)

    # Continue the graph
    config = {
        "configurable": {
            "thread_id": tool_approval_request.thread_id,
        },
        "recursion_limit": 10,
    }
    graph.invoke(None, config)


@router.post("/reject")
async def reject_action(reject_request: ToolCallApprovalRequest, request: Request):
    """Reject tool call"""
    print("Reject tool call!")

    graph = create_ecommerce_agent(user=request.state.user)

    # Continue graph with reject tool message
    config = {
        "configurable": {
            "thread_id": reject_request.thread_id,
        },
        "recursion_limit": 10,
    }

    # Continue the subgraph with the reject tool message
    state = graph.get_state(config, subgraphs=True)
    subgraph_state = state.tasks[0].state
    current_node_name = subgraph_state.metadata["langgraph_node"]
    graph.invoke(
        Command(
            update={
                "messages": [
                    *subgraph_state.values["messages"],
                    ToolMessage(
                        tool_call_id=reject_request.tool_call_id,
                        content=f"Tool call denied by user. Reasoning: '{reject_request.user_input}'. Continue assisting, accounting for the user's input.",
                    ),
                ]
            },
            goto=current_node_name,
        ),
        subgraph_state.config,
        subgraphs=True,
    )
