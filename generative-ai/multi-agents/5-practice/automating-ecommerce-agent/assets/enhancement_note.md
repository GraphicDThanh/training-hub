May 25th, 2025 - Todo next:
- [Performance Enhancement #2]  Optimize state separation by eliminating redundant data in the subgraph and refining use of the supervisor’s state.
  - [x] customer agent
  - [x] product agent
  - [ ] service agent
  - [ ] cart agent
  - [ ] order agent
- [Performance Enhancement #3] Implement conversation summarization and truncate excessively long interactions for improved performance.
- [System Tolerance #1]   Ensure nodes can retry after failures to increase system robustness.
- [System Tolerance #2]  Improve graph state feedback for better error traceability and debugging.
- [Evaluation Enhancement #1] For the evaluation, the score 0/1 is too strict, so I should loosen them a bit.
- Task 3: Update evaluation with trajectory to make sure go correct path
Bug:
- [Bug #1] Prevent agents from entering recursive loops or repeating responses indefinitely.
- [Bug #2] Resolve conflicting state updates—e.g., multiple updates to active_cart.

Nice to have
- [Feature #1] Enable streaming responses from agents for more responsive user interaction.
- [Feature #2] [LangGraph interrupt dynamic] Use LangGraph dynamic interrupt() for a feature that needs user input like when user requests to return order and not provide the reason, add the interrupt() to allow them input the reason into the process.
- [Hallucination Enhancement #1] Add a validation node to reduce AI hallucination and improve response reliability.
- Currently, the multi-agents system uses multiple checkpointer which lead to multiple databases and will not allow to resume whole flow in one shot.
The better solution is to use one checkpointer with a namespace to handle agents' checkpoints.
Note: if you only use one checkpointer without namespace, the breakpoint from sub-agent does not work correctly (the snapshot.next value is () when you have breakpoint when you do checkout cart, for example).
https://blog.langchain.dev/langgraph-v0-2/
(As this current approach still works, this is a nice to have priority)
