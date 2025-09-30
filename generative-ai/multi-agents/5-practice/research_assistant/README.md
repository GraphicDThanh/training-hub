# Research Assistant Practice
## Context:
Research is often laborious work offloaded to analysts. AI-based research and report generation workflows are promising to automate this process.

## Objective:
Our goal is to build a lightweight, multi-agent system around chat models that customizes the research process.

### Source Selection
User can choose the sources for their research (e.g., Google, Wikipedia, etc.)

### Planning
- User will provide a `topic`, system generate a team of AI analysts, each of them focus on one sub-topic.
- `Human-in-the-loop` will be used to refine these sub-topics before research begins.

### LLM Utilization
- Each AI analyst will conduct in-depth interviews with an expert AI using selected sources.
- The interview will be a multi-turn conversation to extract detailed insights.
- These interviews will be captured in a using `sub-graphs` with their internal state.

### Research Process
- Expert will gather information to answer analyst questions in `parallel`. And all interviews will be conducted simultaneously through `map-reduce`.

### Output Format
- The gathered insights from each interview will be synthesized into a final report with out format.

### LangGraph Utilization
- Memory
- Human-in-the-loop
- Controllability

### Document:
- [Graphs Communicate](https://whimsical.com/llm-practice-FXQKsCa4VDeRMqkNnc9J2y)