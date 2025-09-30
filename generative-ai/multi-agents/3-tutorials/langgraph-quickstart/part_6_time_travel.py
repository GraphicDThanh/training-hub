from typing import Annotated
from typing_extensions import TypedDict

from langgraph.graph import StateGraph
from langgraph.graph.message import add_messages
from langchain_anthropic import ChatAnthropic
from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver

memory = MemorySaver()
#######################################################################
# INIT AGENT
class State(TypedDict):
    messages: Annotated[list, add_messages]

graph_builder = StateGraph(State)

tool = TavilySearchResults(max_results=2)
tools = [tool]
llm = ChatAnthropic(model="claude-3-5-sonnet-20240620")
llm_with_tools = llm.bind_tools(tools)

def chatbot(state: State):
    return {"messages": [llm_with_tools.invoke(state["messages"])]}

graph_builder.add_node("chatbot", chatbot)

tool_node = ToolNode(tools=[tool])
graph_builder.add_node("tools", tool_node)

graph_builder.add_conditional_edges(
    "chatbot",
    tools_condition
)

graph_builder.add_edge("tools", "chatbot")
graph_builder.set_entry_point("chatbot")
graph = graph_builder.compile(checkpointer=memory)


#######################################################################
# USE AGENT
def stream_graph_updates(user_input: str):
    config = {"configurable": {"thread_id": "2"}}

    for event in graph.stream(
        {"messages": [{"role": "user", "content": user_input}]},
        config,
        stream_mode="values"
    ):
        event["messages"][-1].pretty_print()


def use_chatbot():
    while True:
        try:
            user_input = input("User: ")
            if user_input.lower() in ["quit", "exit", "q"]:
                print("Goodbye!")
                break

            stream_graph_updates(user_input)

            # Replay the conversation up to a specific state
            to_replay = None
            config = {"configurable": {"thread_id": "2"}}
            for state in graph.get_state_history(config):
                print("Num Messages: ", len(state.values["messages"]), "Next: ", state.next)
                print("-" * 80)
                if len(state.values["messages"]) == 6:
                    # We are somewhat arbitrarily selecting a specific state based on the number of chat messages in the state.
                    to_replay = state
                    print("to_replay.next::", to_replay.next)
                    print("to_replay.config::", to_replay.config)



            if to_replay:
                print("TIME TRAVEL from 6 messages:::")
                # The `checkpoint_id` in the `to_replay.config` corresponds to a state we've persisted to our checkpointer.
                for event in graph.stream(None, to_replay.config, stream_mode="values"):
                    if "messages" in event:
                        event["messages"][-1].pretty_print()


        except:
            # fallback if input() is not available
            user_input = "What do you know about LangGraph?"
            print("User: " + user_input)
            stream_graph_updates(user_input)
            break


if __name__ == "__main__":
    use_chatbot()


"""
User: I'm learning LangGraph. Could you do some research on it for me?
================================ Human Message =================================

I'm learning LangGraph. Could you do some research on it for me?
================================== Ai Message ==================================

[{'citations': None, 'text': "Certainly! I'd be happy to research LangGraph for you. To get the most up-to-date and comprehensive information, I'll use the Tavily search engine to look this up. Let me do that for you now.", 'type': 'text'}, {'id': 'toolu_01JykK1F26nnt3k1BHwVBX5C', 'input': {'query': 'LangGraph framework for language models'}, 'name': 'tavily_search_results_json', 'type': 'tool_use'}]
Tool Calls:
  tavily_search_results_json (toolu_01JykK1F26nnt3k1BHwVBX5C)
 Call ID: toolu_01JykK1F26nnt3k1BHwVBX5C
  Args:
    query: LangGraph framework for language models
================================= Tool Message =================================
Name: tavily_search_results_json

[{"url": "https://arxiv.org/abs/2412.03801", "content": "arXiv:2412.03801 Agent AI with LangGraph: A Modular Framework for Enhancing Machine Translation Using Large Language Models This paper explores the transformative role of Agent AI and LangGraph in advancing the automation and effectiveness of machine translation (MT). These agents leverage the powerful semantic capabilities of large language models (LLMs), such as GPT-4o, to ensure accurate, contextually relevant translations while maintaining modularity, scalability, and context retention. With flexibility, open-source community support, and seamless integration with LLMs, LangGraph empowers agents to deliver high-quality translations. By highlighting modular design and automated workflows, this paper sets the stage for further innovations in intelligent machine translation services. Subjects:   Computation and Language (cs.CL); Artificial Intelligence (cs.AI) Cite as:    arXiv:2412.03801 [cs.CL] (or arXiv:2412.03801v1 [cs.CL] for this version)"}, {"url": "https://langchain-ai.github.io/langgraph/", "content": "LangGraph is a library for building stateful, multi-actor applications with LLMs, used to create agent and multi-agent workflows."}]
================================== Ai Message ==================================

Thank you for your interest in LangGraph. Based on the search results, I can provide you with some information about this framework. LangGraph is a library designed for building advanced applications using large language models (LLMs). Here are the key points about LangGraph:

1. Purpose:
   - LangGraph is used for creating stateful, multi-actor applications with LLMs.
   - It's particularly useful for developing agent and multi-agent workflows.

2. Functionality:
   - The framework allows for the creation of modular and scalable AI agents.
   - It leverages the semantic capabilities of large language models like GPT-4.

3. Applications:
   - One significant application of LangGraph is in enhancing machine translation.
   - It helps in ensuring accurate and contextually relevant translations.

4. Key Features:
   - Modularity: LangGraph emphasizes a modular design, which allows for flexible and customizable AI agent creation.
   - Scalability: The framework is designed to handle complex, multi-agent systems.
   - Context Retention: It maintains context throughout the processing, which is crucial for tasks like translation.
   - Integration: LangGraph seamlessly integrates with various LLMs.

5. Community and Support:
   - It has open-source community support, which can be beneficial for developers learning and using the framework.

6. Research:
   - There's ongoing research about LangGraph, as evidenced by the recent arXiv paper (arXiv:2412.03801) discussing its application in machine translation.

7. Potential:
   - The framework sets the stage for further innovations in intelligent machine translation services and potentially other LLM-based applications.

If you're learning LangGraph, you might want to start by exploring its basic functionalities in creating simple agents, then gradually move to more complex multi-agent systems. The official documentation at https://langchain-ai.github.io/langgraph/ would be a good resource to begin with.

Is there any specific aspect of LangGraph you're particularly interested in or would like more information about?
Num Messages:  4 Next:  ()
--------------------------------------------------------------------------------
Num Messages:  3 Next:  ('chatbot',)
--------------------------------------------------------------------------------
Num Messages:  2 Next:  ('tools',)
--------------------------------------------------------------------------------
Num Messages:  1 Next:  ('chatbot',)
--------------------------------------------------------------------------------
Num Messages:  0 Next:  ('__start__',)
--------------------------------------------------------------------------------


User: Ya that's helpful. Maybe I'll build an autonomous agent with it!
================================ Human Message =================================

Ya that's helpful. Maybe I'll build an autonomous agent with it!
================================== Ai Message ==================================

[{'citations': None, 'text': "That's an exciting idea! Building an autonomous agent with LangGraph is indeed a great way to explore the framework's capabilities and learn more about AI agent development. Let me provide some additional insights and suggestions to help you get started with this project.", 'type': 'text'}, {'id': 'toolu_01BE2ocNXwQg4kxA1qkThiYL', 'input': {'query': 'building autonomous agents with LangGraph examples and tutorials'}, 'name': 'tavily_search_results_json', 'type': 'tool_use'}]
Tool Calls:
  tavily_search_results_json (toolu_01BE2ocNXwQg4kxA1qkThiYL)
 Call ID: toolu_01BE2ocNXwQg4kxA1qkThiYL
  Args:
    query: building autonomous agents with LangGraph examples and tutorials
================================= Tool Message =================================
Name: tavily_search_results_json

[{"url": "https://www.coursera.org/learn/packt-building-autonomous-ai-agents-with-langgraph-oyjym", "content": "Building Autonomous AI Agents with LangGraph | Coursera Unlock the potential of autonomous AI agents with LangGraph in this comprehensive course. Designed for developers and AI enthusiasts, you’ll learn to build intelligent, adaptive agents capable of processing complex queries, maintaining state, and integrating human feedback for enhanced decision-making. The course culminates with a capstone project where you’ll develop an AI financial report writer agent, showcasing your mastery of LangGraph. Building our First AI Agent - Project Setup (OpenAI API)•3 minutes Build our First AI Agent - Creating the Agent Class and Prompt•10 minutes How LangGraph Helps to Build AI Agents•2 minutes In this module, we will bring together everything you’ve learned to build a financial report writer AI agent as the capstone project."}, {"url": "https://www.youtube.com/watch?v=assrhPxNdSk", "content": "In this tutorial, we'll break down the fundamentals of building AI agents using LangGraph! Whether you're new to AI development or looking"}]
================================== Ai Message ==================================

Building an autonomous agent with LangGraph is an excellent way to dive deeper into the framework and gain practical experience. Based on the latest information, here are some suggestions and resources to help you get started:

1. Understanding the Basics:
   - Start by familiarizing yourself with the core concepts of LangGraph, particularly how it handles state management and multi-agent interactions.
   - The official LangGraph documentation (https://langchain-ai.github.io/langgraph/) is a great starting point.

2. Tutorial Resources:
   - There's a YouTube tutorial available that breaks down the fundamentals of building AI agents using LangGraph. This could be a great visual resource to get you started.

3. Structured Learning:
   - Coursera offers a comprehensive course titled "Building Autonomous AI Agents with LangGraph". This course covers:
     - Processing complex queries
     - Maintaining state
     - Integrating human feedback for enhanced decision-making
     - A capstone project involving the development of an AI financial report writer agent

4. Project Ideas:
   - As you're considering building an autonomous agent, you might want to start with a specific task or domain. Some ideas include:
     - A personal assistant agent that can handle various tasks
     - An information retrieval and summarization agent
     - A problem-solving agent in a specific domain (e.g., coding, math, or logistics)

5. Key Components to Focus On:
   - State Management: Understand how LangGraph handles state across interactions
   - Decision Making: Implement logic for your agent to make decisions based on input and current state
   - Integration with APIs: Learn how to connect your agent with external data sources or services
   - Human-in-the-loop: Incorporate mechanisms for human feedback or intervention if needed

6. Best Practices:
   - Start Small: Begin with a simple agent and gradually add complexity
   - Modular Design: Use LangGraph's modular approach to create reusable components
   - Testing: Implement thorough testing to ensure your agent behaves as expected in various scenarios

7. Community and Support:
   - Engage with the LangGraph community. Look for forums, GitHub discussions, or social media groups where you can ask questions and share your progress.

8. Ethical Considerations:
   - As you build your autonomous agent, consider the ethical implications of its actions and decisions. Implement safeguards and ensure responsible AI practices.

Remember, building an autonomous agent is an iterative process. Start with a basic implementation and continuously refine and expand its capabilities as you become more comfortable with LangGraph.

Do you have a specific type of autonomous agent in mind, or would you like suggestions for a beginner-friendly project to start with?


Num Messages:  8 Next:  ()
--------------------------------------------------------------------------------
Num Messages:  7 Next:  ('chatbot',)
--------------------------------------------------------------------------------
Num Messages:  6 Next:  ('tools',)
--------------------------------------------------------------------------------
to_replay.next:: ('tools',)
to_replay.config:: {'configurable': {'thread_id': '2', 'checkpoint_ns': '', 'checkpoint_id': '1efe47aa-80a2-67c6-8006-73bb226c3590'}}
Num Messages:  5 Next:  ('chatbot',)
--------------------------------------------------------------------------------
Num Messages:  4 Next:  ('__start__',)
--------------------------------------------------------------------------------
Num Messages:  4 Next:  ()
--------------------------------------------------------------------------------
Num Messages:  3 Next:  ('chatbot',)
--------------------------------------------------------------------------------
Num Messages:  2 Next:  ('tools',)
--------------------------------------------------------------------------------
Num Messages:  1 Next:  ('chatbot',)
--------------------------------------------------------------------------------
Num Messages:  0 Next:  ('__start__',)
--------------------------------------------------------------------------------


TIME TRAVEL from 6 messages:::
================================== Ai Message ==================================

[{'citations': None, 'text': "That's an exciting idea! Building an autonomous agent with LangGraph is indeed a great way to explore the framework's capabilities and learn more about AI agent development. Let me provide some additional insights and suggestions to help you get started with this project.", 'type': 'text'}, {'id': 'toolu_01BE2ocNXwQg4kxA1qkThiYL', 'input': {'query': 'building autonomous agents with LangGraph examples and tutorials'}, 'name': 'tavily_search_results_json', 'type': 'tool_use'}]
Tool Calls:
  tavily_search_results_json (toolu_01BE2ocNXwQg4kxA1qkThiYL)
 Call ID: toolu_01BE2ocNXwQg4kxA1qkThiYL
  Args:
    query: building autonomous agents with LangGraph examples and tutorials
================================= Tool Message =================================
Name: tavily_search_results_json

[{"url": "https://www.coursera.org/learn/packt-building-autonomous-ai-agents-with-langgraph-oyjym", "content": "Building Autonomous AI Agents with LangGraph | Coursera Unlock the potential of autonomous AI agents with LangGraph in this comprehensive course. Designed for developers and AI enthusiasts, you’ll learn to build intelligent, adaptive agents capable of processing complex queries, maintaining state, and integrating human feedback for enhanced decision-making. The course culminates with a capstone project where you’ll develop an AI financial report writer agent, showcasing your mastery of LangGraph. Building our First AI Agent - Project Setup (OpenAI API)•3 minutes Build our First AI Agent - Creating the Agent Class and Prompt•10 minutes How LangGraph Helps to Build AI Agents•2 minutes In this module, we will bring together everything you’ve learned to build a financial report writer AI agent as the capstone project."}, {"url": "https://www.youtube.com/watch?v=assrhPxNdSk", "content": "In this tutorial, we'll break down the fundamentals of building AI agents using LangGraph! Whether you're new to AI development or looking"}]
================================== Ai Message ==================================

Building an autonomous agent with LangGraph is an excellent project idea! It will give you hands-on experience with the framework and deepen your understanding of AI agent development. Based on the additional information I've found, here are some suggestions and resources to help you get started:

1. Understanding the Basics:
   - Start by familiarizing yourself with the core concepts of LangGraph, such as how it helps in building AI agents and maintaining state.
   - The official LangGraph documentation (https://langchain-ai.github.io/langgraph/) is a great starting point.

2. Tutorial Resources:
   - There's a YouTube tutorial available that breaks down the fundamentals of building AI agents using LangGraph. This could be a great visual resource to complement your learning.

3. Structured Learning:
   - Coursera offers a comprehensive course titled "Building Autonomous AI Agents with LangGraph". While it's not free, it could be a valuable resource if you're looking for a structured learning path.
   - The course covers:
     - Building intelligent, adaptive agents
     - Processing complex queries
     - Maintaining state
     - Integrating human feedback for enhanced decision-making

4. Practical Project Ideas:
   - The Coursera course culminates in a capstone project where you develop an AI financial report writer agent. This could be a great project idea to aim for as you learn.
   - Other potential projects could include:
     - A chatbot that maintains context over long conversations
     - An AI research assistant that can gather and summarize information from multiple sources
     - A task planning and execution agent for personal productivity

5. Step-by-Step Approach:
   - Start with setting up your project and environment.
   - Create a basic agent class and define its prompt.
   - Gradually add more complex functionalities like state management and decision-making processes.

6. Key Concepts to Focus On:
   - Understanding how LangGraph helps in building AI agents
   - Creating the agent class and defining prompts
   - Implementing state management
   - Integrating with Large Language Models (LLMs)
   - Handling complex queries and maintaining context

7. Community and Support:
   - Look for LangGraph communities or forums where you can ask questions and share your progress.
   - GitHub repositories and issues can also be great sources of information and troubleshooting tips.

Remember, building an autonomous agent is an iterative process. Start with a simple concept and gradually increase the complexity as you become more comfortable with LangGraph.

As you embark on this project, do you have a specific type of autonomous agent in mind? Or would you like suggestions for a beginner-friendly agent project to start with?
"""