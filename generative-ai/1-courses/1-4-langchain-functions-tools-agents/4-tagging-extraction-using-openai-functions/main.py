from typing import Optional, List
from pydantic import BaseModel, Field

from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers.openai_functions import JsonOutputFunctionsParser, JsonKeyOutputFunctionsParser
from langchain.document_loaders import WebBaseLoader
from langchain.utils.openai_functions import convert_pydantic_to_openai_function


def tagging():
    class Tagging(BaseModel):
        """Tag the piece of text with particular info."""
        sentiment: str = Field(description="sentiment of text, should be `pos`, `neg`, or `neutral`")
        language: str = Field(description="Language of the text")

    convert_pydantic_to_openai_function(Tagging)
    # {'name': 'Tagging',
    #  'description': 'Tag the piece of text with particular info.',
    #  'parameters': {'title': 'Tagging',
    #   'description': 'Tag the piece of text with particular info.',
    #   'type': 'object',
    #   'properties': {'sentiment': {'title': 'Sentiment',
    #     'description': 'sentiment of text, should be `pos`, `neg`, or `neutral`',
    #     'type': 'string'},
    #    'language': {'title': 'Language',
    #     'description': 'language of text (should be ISO 639-1 code)',
    #     'type': 'string'}},
    #   'required': ['sentiment', 'language']}}

    # default model is `gpt-3.5-turbo-0125`
    model = ChatOpenAI(temperature=0, model="gpt-4o-mini")
    tagging_function = [convert_pydantic_to_openai_function(Tagging)]

    prompt = ChatPromptTemplate.from_messages([
        ("system", "Think carefully, and then tag the text as instructed"),
        ("user", "{input}")
    ])

    model_with_functions = model.bind(
        functions=tagging_function,
        function_call={"name": "Tagging"}
    )
    tagging_chain = prompt | model_with_functions
    # pos = tagging_chain.invoke({"input": "I am feeling happy today."})
    # print(pos)
    # AIMessage(content='', additional_kwargs={'function_call': {'arguments': '{"sentiment":"pos","language":"en"}', 'name': 'Tagging'}, 'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 10, 'prompt_tokens': 99, 'total_tokens': 109, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_bba3c8e70b', 'finish_reason': 'stop', 'logprobs': None}, id='run-b460a8b6-ef18-46a7-a2c2-6a58abe69339-0', usage_metadata={'input_tokens': 99, 'output_tokens': 10, 'total_tokens': 109, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})

    # neg = tagging_chain.invoke({"input": "non mi piace questo cibo"})
    # print(neg)
    # AIMessage(content='', additional_kwargs={'function_call': {'arguments': '{"sentiment":"neg","language":"it"}', 'name': 'Tagging'}, 'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 10, 'prompt_tokens': 99, 'total_tokens': 109, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_bba3c8e70b', 'finish_reason': 'stop', 'logprobs': None}, id='run-c8e42358-cb2e-459c-bae7-00ff903173c7-0', usage_metadata={'input_tokens': 99, 'output_tokens': 10, 'total_tokens': 109, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})

    tagging_chain = prompt | model_with_functions | JsonOutputFunctionsParser()
    r3 = tagging_chain.invoke({"input": "non mi piace questo cibo"})
    print(r3)
    # {'sentiment': 'neg', 'language': 'it'}

def extraction():
    class Person(BaseModel):
        """Information about a person."""
        name: str = Field(description="person's name")
        age: Optional[int] = Field(description="person's age")

    class Information(BaseModel):
        """Information to extract."""
        people: List[Person] = Field(description="List of info about people")

    convert_pydantic_to_openai_function(Information)
    # {'name': 'Information',
    # 'description': 'Information to extract.',
    # 'parameters': {'title': 'Information',
    # 'description': 'Information to extract.',
    # 'type': 'object',
    # 'properties': {'people': {'title': 'People',
    #     'description': 'List of info about people',
    #     'type': 'array',
    #     'items': {'title': 'Person',
    #     'description': 'Information about a person.',
    #     'type': 'object',
    #     'properties': {'name': {'title': 'Name',
    #     'description': "person's name",
    #     'type': 'string'},
    #     'age': {'title': 'Age',
    #     'description': "person's age",
    #     'type': 'integer'}},
    #     'required': ['name']}}},
    # 'required': ['people']}}

    extraction_functions = [convert_pydantic_to_openai_function(Information)]

    model = ChatOpenAI(temperature=0, model="gpt-4o-mini")
    extraction_model = model.bind(functions=extraction_functions, function_call={"name": "Information"})

    # r1 = extraction_model.invoke("Joe is 30, his mom is Martha")
    # print(r1)
    # AIMessage(content='', additional_kwargs={'function_call': {'arguments': '{"people":[{"name":"Joe","age":30},{"name":"Martha","age":null}]}', 'name': 'Information'}, 'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 22, 'prompt_tokens': 89, 'total_tokens': 111, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_bba3c8e70b', 'finish_reason': 'stop', 'logprobs': None}, id='run-e3657180-644b-443f-be54-a6f94632dad5-0', usage_metadata={'input_tokens': 89, 'output_tokens': 22, 'total_tokens': 111, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})

    prompt = ChatPromptTemplate.from_messages([
        ("system", "Extract the relevant information, if not explicitly provided do not guess. Extract partial info"),
        ("human", "{input}")
    ])
    # extraction_chain = prompt | extraction_model
    # r2 = extraction_chain.invoke({"input": "Joe is 30, his mom is Martha"})
    # print(r2)
    # AIMessage(content='', additional_kwargs={'function_call': {'arguments': '{"people":[{"name":"Joe","age":30},{"name":"Martha","age":null}]}', 'name': 'Information'}, 'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 22, 'prompt_tokens': 106, 'total_tokens': 128, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_bba3c8e70b', 'finish_reason': 'stop', 'logprobs': None}, id='run-36b69b1d-8ea6-49c7-8706-966813fd449b-0', usage_metadata={'input_tokens': 106, 'output_tokens': 22, 'total_tokens': 128, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})

    # extraction_chain = prompt | extraction_model | JsonOutputFunctionsParser()
    # r3 = extraction_chain.invoke({"input": "Joe is 30, his mom is Martha"})
    # print(r3)
    # {'people': [{'name': 'Joe', 'age': 30}, {'name': 'Martha', 'age': None}]}


    extraction_chain = prompt | extraction_model | JsonKeyOutputFunctionsParser(key_name="people")
    r4 = extraction_chain.invoke({"input": "Joe is 30, his mom is Martha"})
    print(r4)
    # [{'name': 'Joe', 'age': 30}, {'name': 'Martha', 'age': None}]


def combine_example():
    class Overview(BaseModel):
        """Overview of a section of text."""
        summary: str = Field(description="Provide a concise summary of the content.")
        language: str = Field(description="Provide the language that the content is written in.")
        keywords: str = Field(description="Provide keywords related to the content.")


    loader = WebBaseLoader("https://lilianweng.github.io/posts/2023-06-23-agent/")
    documents = loader.load()
    doc = documents[0]
    page_content = doc.page_content[:10000]

    overview_tagging_function = [
        convert_pydantic_to_openai_function(Overview)
    ]

    prompt = ChatPromptTemplate.from_messages([
        ("system", "Extract the relevant information, if not explicitly provided do not guess. Extract partial info"),
        ("human", "{input}")
    ])

    model = ChatOpenAI(temperature=0, model="gpt-4o-mini")
    tagging_model = model.bind(
        functions=overview_tagging_function,
        function_call={"name":"Overview"}
    )
    tagging_chain = prompt | tagging_model | JsonOutputFunctionsParser()

    # r1 = tagging_chain.invoke({"input": page_content})
    # print(r1)
    # {'summary': 'The article discusses the development of LLM (large language model) powered autonomou...of-concept demos like AutoGPT and BabyAGI.', 'language': 'English', 'keywords': 'LLM, autonomous agents, planning, memory, tool use, task decomposition, self-reflection, case studies, challenges'}

    class Paper(BaseModel):
        """Information about papers mentioned."""
        title: str
        author: Optional[str]


    class Info(BaseModel):
        """Information to extract"""
        papers: List[Paper]

    from langchain.output_parsers.openai_functions import JsonKeyOutputFunctionsParser
    paper_extraction_function = [
        convert_pydantic_to_openai_function(Info)
    ]
    extraction_model = model.bind(
        functions=paper_extraction_function,
        function_call={"name":"Info"}
    )
    extraction_chain = prompt | extraction_model | JsonKeyOutputFunctionsParser(key_name="papers")

    # r2 = extraction_chain.invoke({"input": page_content})
    # print(r2)
    # [{'title': 'Chain of Thought', 'author': 'Wei et al. 2022'}, {'title': 'Tree of Thoughts', 'author': 'Yao et al. 2023'}, {'title': 'LLM+P', 'author': 'Liu et al. 2023'}, {'title': 'ReAct', 'author': 'Yao et al. 2023'}, {'title': 'Reflexion', 'author': 'Shinn & Labash 2023'}, {'title': 'Chain of Hindsight', 'author': 'Liu et al. 2023'}, {'title': 'Algorithm Distillation', 'author': 'Laskin et al. 2023'}, {'title': 'RL^2', 'author': 'Duan et al. 2017'}]

    r3 = extraction_chain.invoke({"input": "hi"})
    print(r3)
    # [{'title': 'hi', 'author': None}]

    from langchain.text_splitter import RecursiveCharacterTextSplitter
    text_splitter = RecursiveCharacterTextSplitter(chunk_overlap=0)
    splits = text_splitter.split_text(doc.page_content)

    def flatten(matrix):
        flat_list = []
        for row in matrix:
            flat_list += row
        return flat_list


    from langchain.schema.runnable import RunnableLambda
    prep = RunnableLambda(
        lambda x: [{"input": doc} for doc in text_splitter.split_text(x)]
    )
    prep.invoke("hi")
    chain = prep | extraction_chain.map() | flatten
    r4 = chain.invoke(doc.page_content)
    print(r4)
    # {'title': 'LLM Powered Autonomous Agents', 'author': 'Lilian Weng'}
    # {'title': 'Chain of thought', 'author': 'Wei et al. 2022'}
    # {'title': 'Tree of Thoughts', 'author': 'Yao et al. 2023'}
    # {'title': 'LLM+P', 'author': 'Liu et al. 2023'}
    # {'title': 'ReAct', 'author': 'Yao et al. 2023'}
    # {'title': 'Reflexion', 'author': 'Shinn & Labash 2023'}
    # {'title': 'Reflexion framework', 'author': 'Shinn & Labash'}
    # {'title': 'Chain of Hindsight (CoH)', 'author': 'Liu et al. 2023'}
    # {'title': 'Algorithm Distillation (AD)', 'author': 'Laskin et al. 2023'}
    # {'title': 'Algorithm Distillation', 'author': 'Laskin et al. 2023'}
    # {'title': 'RL^2', 'author': 'Duan et al. 2017'}
    # {'title': 'Maximum Inner Product Search (MIPS)', 'author': None}
    # {'title': 'Comparison of MIPS algorithms', 'author': 'Google Blog, 2020'}
    # {'title': 'MRKL: Modular Reasoning, Knowledge and Language', 'author': 'Karpas et al. 2022'}
    # {'title': 'Tool Augmented Language Models', 'author': 'Parisi et al. 2022'}
    # {'title': 'Toolformer', 'author': 'Schick et al. 2023'}
    # {'title': 'HuggingGPT', 'author': 'Shen et al. 2023'}
    # {'title': 'API-Bank', 'author': 'Li et al. 2023'}
    # {'title': 'ChemCrow', 'author': 'Bran et al. 2023'}
    # {'title': 'Boiko et al. (2023)', 'author': None}
    # {'title': 'Generative Agents Simulation', 'author': 'Park et al. (2023)'}
    # {'title': 'The generative agent architecture', 'author': 'Park et al. 2023'}
    # {'title': 'GPT-Engineer: A Framework for Building Code Repositories from Natural Language', 'author': None}
    # {'title': 'Super Mario Game Development in Python', 'author': 'John Doe'}
    # {'title': 'Design Patterns: Elements of Reusable Object-Oriented Software', 'author': 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides'}
    # {'title': 'Clean Code: A Handbook of Agile Software Craftsmanship', 'author': 'Robert C. Martin'}
    # {'title': 'Refactoring: Improving the Design of Existing Code', 'author': 'Martin Fowler'}
    # {'title': 'Conversatin samples', 'author': None}
    # {'title': 'Challenges in Building LLM-Centered Agents', 'author': None}
    # {'title': 'LLM-powered Autonomous Agents', 'author': 'Weng, Lilian'}
    # {'title': 'Chain of thought prompting elicits reasoning in large language models', 'author': 'Wei et al.'}
    # {'title': 'Tree of Thoughts: Dliberate Problem Solving with Large Language Models', 'author': 'Yao et al.'}
    # {'title': 'Chain of Hindsight Aligns Language Models with Feedback', 'author': 'Liu et al.'}
    # {'title': 'LLM+P: Empowering Large Language Models with Optimal Planning Proficiency', 'author': 'Liu et al.'}
    # {'title': 'ReAct: Synergizing reasoning and acting in language models', 'author': 'Yao et al.'}
    # {'title': 'Reflexion: an autonomous agent with dynamic memory and self-reflection', 'author': 'Shinn & Labash'}
    # {'title': 'In-context Reinforcement Learning with Algorithm Distillation', 'author': 'Laskin et al.'}
    # {'title': 'MRKL Systems A modular, neuro-symbolic architecture that combines large language mode...l knowledge sources and discrete reasoning', 'author': 'Karpas et al.'}
    # {'title': 'Webgpt: Browser-assisted question-answering with human feedback', 'author': 'Nakano et al.'}
    # {'title': 'TALM: Tool Augmented Language Models', 'author': None}
    # {'title': 'Toolformer: Language Models Can Teach Themselves to Use Tools', 'author': 'Schick et al.'}
    # {'title': 'API-Bank: A Benchmark for Tool-Augmented LLMs', 'author': 'Li et al.'}
    # {'title': 'HuggingGPT: Solving AI Tasks with ChatGPT and its Friends in HuggingFace', 'author': 'Shen et al.'}
    # {'title': 'ChemCrow: Augmenting large-language models with chemistry tools', 'author': 'Bran et al.'}
    # {'title': 'Emergent autonomous scientific research capabilities of large language models', 'author': 'Boiko et al.'}
    # {'title': 'Generative Agents: Interactive Simulacra of Human Behavior', 'author': 'Joon Sung Park et al.'}
    # {'title': 'Prompt Engineering', 'author': None}


if __name__ == "__main__":
    # tagging()
    # extraction()
    combine_example()
