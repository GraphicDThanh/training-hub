from main_graph.graph import graph as main_graph
from utils.file import write_to_markdown

# Inputs
max_analysts = 3
topic = "The benefits of being a public speaker in the local tech community."
thread = {"configurable": {"thread_id": "1"}}

# Run the graph until the first interruption
for event in main_graph.stream(
    {"topic": topic, "max_analysts": max_analysts}, thread, stream_mode="values"
):
    analysts = event.get("analysts", "")
    if analysts:
        print("First analysts list:")
        print("-" * 100)
        for analyst in analysts:
            print(f"Name: {analyst.name}")
            print(f"Affiliation: {analyst.affiliation}")
            print(f"Role: {analyst.role}")
            print(f"Description: {analyst.description}")
            print("-" * 50)

# We now update the state as if we are the human_feedback node
main_graph.update_state(
    thread,
    {"human_analyst_feedback": "Add in the CEO of gen ai native startup"},
    as_node="human_feedback",
)

# Check
print("Second analysts list:")
print("-" * 100)
for event in main_graph.stream(None, thread, stream_mode="values"):
    analysts = event.get("analysts", "")
    if analysts:
        for analyst in analysts:
            print(f"Name: {analyst.name}")
            print(f"Affiliation: {analyst.affiliation}")
            print(f"Role: {analyst.role}")
            print(f"Description: {analyst.description}")
            print("-" * 50)

# Confirm we are happy
main_graph.update_state(
    thread, {"human_analyst_feedback": None}, as_node="human_feedback"
)

# Continue
for event in main_graph.stream(None, thread, stream_mode="updates"):
    print("--Node--")
    node_name = next(iter(event.keys()))
    print(node_name)

final_state = main_graph.get_state(thread)
report = final_state.values.get('final_report')

write_to_markdown("../output/speaker_benefit.md", report)