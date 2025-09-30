# Technical Issue Log
---

## 📅 Date: 2025-03-20
### 📝 Learn: Precision and Recall

### ❓ Description
Both Precision & Recall are classification metrics.
- PRECISION = SIDE
  - How many of the items identified as positive are actually positive?
- RECALL = ALL
  - On all the positive items, how many did we identify?

**Sample**:
An email inbox has 1000 emails. Our spam filter classification model help to identify spam emails.

The model identified 200 emails as spam, out of which 150 were actually spam.
- True Positives (TP) = 150
- Precision = 150 / 200 = 0.75 = 75%
In total, there are 500 spam emails in the inbox.
- Recall = 150 / 500 = 0.3 = 30%

### 🔗 References / Resources
- [Precision & Recall with Example](https://www.youtube.com/watch?v=qWfzIYCvBqo&t=198s)

---

## 📅 Date: 2025-03-18
### 📝 Issue Title: `Invalid parameter: messages with role 'tool' must be a response to a preceding message with 'tool_calls'`

### ❓ Description
Encountered an error while using a zero-shot agent with LangChain and LangGraph that utilizes multiple tools in parallel.

Error message:
```bash
Error: Invalid parameter: messages with role 'tool' must be a response to a preceeding message with 'tool_calls'.

> Error: Invalid parameter: messages with role 'tool' must be a response to a preceeding message with 'tool_calls'.
```
This issue appears in two different cases:
#### 🔍 Case 1: Multiple Tool Calls in Parallel
##### 🔹 Scenario
- The agent can call multiple tools simultaneously.
- Example query: "Compare product A and product B".
- The agent generates two tool calls in parallel:
    - Search product A → ToolMessage_A
    - Search product B → ToolMessage_B
- The resulting message state:
```
[HumanMessage, AIMessage, ToolMessage_A, ToolMessage_B, ...]
```
- The error occurs when ToolMessage_B follows ToolMessage_A, causing invalid on langgraph render.
##### ❌ Issue
- Parallel tool calls result in tool messages being out of sequence.
##### ✅ Solution
- Disable parallel tool calling for now.

#### 🔍 Case 2: Conversation Gets Too Long (Message Limit Exceeded)
##### 🔹 Scenario
- When the conversation history exceeds the message limit, a summarization process trims the message list.
- If the summary logic removes some messages related to tool calls, a similar error occurs.
##### ❌ Issue
- Cutting off essential messages (like AIMessage that precedes a ToolMessage) results in an invalid message sequence.
##### ✅ Solution
- Implement logic to retain messages that are linked to tool calls (e.g., ensuring the AIMessage that initiated a tool call remains).

### 🎯 Final Resolution
- For parallel calls: Ensure tool responses are handled sequentially.
- For long conversations: Maintain message integrity by preserving AI messages linked to tool calls.

### 📚 Lessons Learned
- LangGraph message render requires ToolMessage to directly follow its corresponding AIMessage with tool_calls.
- Parallel tool calls can break the message sequence, leading to malformed messages.
- Conversation trimming must preserve AI-generated tool calls to avoid errors.

### 🚀 Improvements / Best Practices
- Is there any way to handle parallel tool calls without breaking the message sequence?
- Is there built-in logic to handle message truncation instead of manually handle on logic?
- Regularly test with long conversation histories to ensure summarization logic doesn’t break tool call dependencies.

### 🔗 References / Resources
- [LangGraph Issue Discussion](https://github.com/langchain-ai/langgraph/discussions/1398)
- [LangGraph Troubleshooting Guide](https://langchain-ai.github.io/langgraph/troubleshooting/errors/INVALID_CHAT_HISTORY/)

---


# Template
## 📅 Date: YYYY-MM-DD
### 📝 Issue Title:
Short, descriptive title of the issue.

### ❓ Description
A detailed explanation of what happened, including error messages, stack traces, and relevant screenshots if necessary.

### 🔍 Root Cause / Reason
What caused the issue? (e.g., misconfiguration, missing dependencies, incorrect logic, etc.)

### 🛠️ Solution Attempts
#### ✅ Solution 1:
Describe the first attempted solution and whether it worked.

#### ✅ Solution 2 (if applicable):
Describe an alternative approach if the first one didn't work or if there's a better method.

### 🎯 Final Resolution
The solution that ultimately worked, including any commands, code snippets, or configuration changes.

### 📚 Lessons Learned
Key takeaways to prevent similar issues in the future.

### 🚀 Improvements / Best Practices
Optional: Any refactoring, best practices, or performance optimizations that could be applied.

### 🔗 References / Resources
Links to related documentation, forum discussions, Stack Overflow threads, etc.