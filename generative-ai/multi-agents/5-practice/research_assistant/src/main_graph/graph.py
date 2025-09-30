from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver

from sub_graphs.generate_analysts.nodes.create_analysts import create_analysts
from sub_graphs.generate_analysts.nodes.human_feedback import human_feedback
from sub_graphs.conduct_interview.graph import interview_builder
from .state import ResearchGraphState
from .nodes.write_report import write_report
from .nodes.initiate_all_interviewers import initiate_all_interviews
from .nodes.write_introduction import write_introduction
from .nodes.write_conclusion import write_conclusion
from .nodes.finalize_report import finalize_report

# Graph
builder = StateGraph(ResearchGraphState)
builder.add_node("create_analysts", create_analysts)
builder.add_node("human_feedback", human_feedback)
builder.add_node("conduct_interview", interview_builder.compile())
builder.add_node("write_report", write_report)
builder.add_node("write_introduction", write_introduction)
builder.add_node("write_conclusion", write_conclusion)
builder.add_node("finalize_report", finalize_report)

# Flow
builder.add_edge(START, "create_analysts")
builder.add_edge("create_analysts", "human_feedback")
builder.add_conditional_edges("human_feedback", initiate_all_interviews, ["create_analysts", "conduct_interview"])
builder.add_edge("conduct_interview", "write_report")
builder.add_edge("conduct_interview", "write_introduction")
builder.add_edge("conduct_interview", "write_conclusion")
builder.add_edge(["write_conclusion", "write_report", "write_introduction"], "finalize_report")
builder.add_edge("finalize_report", END)

# Compile
memory = MemorySaver()
graph = builder.compile(interrupt_before=["human_feedback"], checkpointer=memory)


