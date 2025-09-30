from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI


DB_NAME = "travel2.sqlite"
CLAUDE_3_SONNET_MODEL = ChatAnthropic(model="claude-3-sonnet-20240229", temperature=1)
GPT_4o_MINI_MODEL = ChatOpenAI(model="gpt-4o-mini", temperature=1)

CHAT_MODEL = CLAUDE_3_SONNET_MODEL
CHAT_MODEL = GPT_4o_MINI_MODEL