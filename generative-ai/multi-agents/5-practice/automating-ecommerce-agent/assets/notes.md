# Automating Ecommerce Agent

## Apr 2nd, 2025
- Ref prompt agent [ecommerce](https://help.kustomer.com/e-commerce-example-BJtDzOxJl)

## Apr 4th, 2025
- [PENDING] Error Recursion Limit when query:
```
Help me create a support ticket with below details:\n- Name: "John Doe"\n- Email: "john.doe@gmail.com"\n- Phone number: "0123456789"\n- Subject: "I have a problem with my order"\n- Description: "I received the wrong item in my order. Help me resolve this issue."
```
error:
```
Recursion limit of 25 reached without hitting a stop condition. You can increase the limit by setting the `recursion_limit` config key.
```
But not know how to return state before reach the limit yet, as ref from this article: https://langchain-ai.github.io/langgraph/how-tos/return-when-recursion-limit-hits/#with-returning-state
--> As this is not blocker yet when agent work correct, I will take a look later.

- [SOLVED] Issue: connect Supabase run on local
    - Use `supabase status` to get the status of the local Supabase instance.
      - Use `API URL` is db url
      - Use `service_role key` is db key

## Apr 9th, 2025
- [PENDING] Streamlit not keep session logged in user when reload. Ask AI said could handle by `st.cache_data` of use lib `streamlit-cookies-manager`.
  - https://docs.streamlit.io/develop/api-reference/caching-and-state/st.cache_data
  - https://github.com/ktosiek/streamlit-cookies-manager
-> Note: As it not blocker, I will take a look later.

- [PENDING] ISSUE: The stream() method is not working as expected
  - case: Query: "Hi" -> It not have AI message in the stream
  - case: Query: "Give me categories list." -> It's work by yield the content of subgraph AIMessageChunk
-> Note: As it not blocker, I will use `.invoke()` to go around first. Streaming data response will handle later.
-> Idea: what if other_agent which always response instead of supervisor?

- [OPEN] The `with_structured_output` not return response as expected
I have:
```python
class Router(TypedDict):
    """Worker to route to next. If no workers needed, route to FINISH."""
    next: Literal["service_agent", "FINISH"]
```
Then use:
```python
response = llm.with_structured_output(Router).invoke(messages)
```
but sometime it return correct:
`{"next": "FINISH"}`
sometime return not correct:
`{"type": "object", "properties": {"next": "FINISH"}}`

--> Idea: recheck the flow, logic of agent and subagent.

## Apr 18th, 2025
- Issue: On chat as anonymous user, then login, all old conversation gone. It should able to continue.
- practice status:
  - done:
    - Anonymous user: service, product retrieval
    - Login user:
      - authentication
      - service, product
      - cart management (add to cart, remove from cart, get cart, clear cart, checkout cart)
  - todo:
    - feature:
      - create shipping address if missing when checkout (opt)
      - create payment method if missing when checkout(opt)
      - confirm order before checkout -> show cart table detail
      - handle payment service (mock) -> update payment status
      - handle return order request
      - handle refund
    - evaluation

### 🔍 Debugging
- Check api docs `http://127.0.0.1:8080/docs`
- PlayGround: `http://localhost:8080/chat/playground/`
    - Test: `{"message": "hello", "thread_id": "3b4de725-586a-4e48-b824-41bdc3c18cf5"}`
- Run local graph: `uv run scripts/graph_local.py`
- Debug with tracer
  This debugger is used to debug python code run in promptfoo for example
  - Add trace in code:
    ```bash
    from remote_pdb import RemotePdb
    RemotePdb('127.0.0.1', 4444).set_trace()
    ```
  - Access the debugger:
    ```bash
    telnet 127.0.0.1 4444
    ```
  - Check port on use: `lsof -t -i:4444`
  - Kill process on port: `kill lsof -t -i:4444`


## Learn more:
- https://docs.python.org/3/library/pathlib.html