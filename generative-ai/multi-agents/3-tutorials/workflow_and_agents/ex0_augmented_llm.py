from langchain_anthropic import ChatAnthropic
from pydantic import BaseModel, Field


def augmented_structured_llm():
    class SearchQuery(BaseModel):
        search_query: str = Field(None, description="Query that is optimized web search.")
        justification: str = Field(
            None, description="Why this query is relevant to the user's request."
        )

    # Augment the LLM with schema for structured output
    llm = ChatAnthropic(model="claude-3-5-sonnet-latest")
    structured_llm = llm.with_structured_output(SearchQuery)

    # Invoke the augmented LLM
    output = structured_llm.invoke("How does Calcium CT score relate to high cholesterol?")
    print("output:::", output)


def augmented_tools_llm():
    # Define a tool
    def multiply(a: int, b: int) -> int:
        return a * b

    llm = ChatAnthropic(model="claude-3-5-sonnet-latest")
    # Augment the LLM with tools
    llm_with_tools = llm.bind_tools([multiply])
    # Invoke the LLM with input that triggers the tool call
    msg = llm_with_tools.invoke("What is 2 times 3?")
    # Get the tool call
    print("tool call:", msg.tool_calls)


def main():
    augmented_structured_llm()
    augmented_tools_llm()


if __name__ == "__main__":
    main()
