from langchain_core.messages import SystemMessage
from langchain_community.tools.tavily_search import TavilySearchResults

from utils.pydantic_models import SearchQuery
from utils.foundation_models import gpt_4o_mini
from ..state import InterviewState
from ..prompts import search_instructions

tavily_search = TavilySearchResults(max_results=3)


def search_web(state: InterviewState):
    """ Retrieve docs from web search """

    # Search query
    structured_llm = gpt_4o_mini.with_structured_output(SearchQuery)
    search_query = structured_llm.invoke(
        [SystemMessage(content=search_instructions)] + state["messages"]
    )

    # Search
    search_docs = tavily_search.invoke(search_query.search_query)

    # Format
    formatted_search_docs = "\n\n---\n\n".join(
        [
            f'<Document href="{doc["url"]}"/>\n{doc["content"]}\n</Document>'
            for doc in search_docs
        ]
    )

    return {"context": [formatted_search_docs]}