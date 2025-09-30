import os
import asyncio
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableLambda, chain
from langchain_community.vectorstores import FAISS
from langchain_core.tools import tool


_ = load_dotenv(find_dotenv())
gpt_4o_mini_model_name = os.getenv('GPT_4o_MINI')
model = ChatOpenAI(model_name=gpt_4o_mini_model_name, temperature=0)

def use_stream_llm_and_chat_model():
    chunks = []
    for chunk in model.stream("what color is the sky?"):
        chunks.append(chunk)
        print(chunk.content, end="|", flush=True)

    # |The| color| of| the| sky| can| vary| depending| on| several| factors|,| including| the| time| of| day|,| weather| conditions|,| and| atmospheric| particles|.| During| a| clear| day|,| the| sky| typically| appears| blue| due| to| the| scattering| of| sunlight| by| the| Earth's| atmosphere|.| This| phenomenon| is| known| as| Ray|leigh| scattering|.| At| sunrise| and| sunset|,| the| sky| can| display| a| range| of| colors|,| including| orange|,| pink|,| and| red|,| due| to| the| angle| of| the| sun| and| the| increased| distance| the| light| travels| through| the| atmosphere|.| On| cloudy| or| over|cast| days|,| the| sky| may| appear| gray|.| Additionally|,| pollution|,| dust|,| and| other| particles| can| also| affect| the| sky|'s| color|.||

    # print()
    # print("chunk 0: ", chunks[0])
    # print("type chunk 0: ", type(chunks[0]))
    # print("additive chunks: ", chunks[0] + chunks[1] + chunks[2])
    # print("type additive chunks: ", type(chunks[0] + chunks[1] + chunks[2]))
    # chunk 0:  content='' additional_kwargs={} response_metadata={} id='run-b8e4f172-196a-461b-b794-9ec1b51eb7f1'
    # type chunk 0:  <class 'langchain_core.messages.ai.AIMessageChunk'>
    # additive chunks:  content='The color' additional_kwargs={} response_metadata={} id='run-b8e4f172-196a-461b-b794-9ec1b51eb7f1'
    # type additive chunks:  <class 'langchain_core.messages.ai.AIMessageChunk'>

async def use_stream_chain():
    prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")
    parser = StrOutputParser()
    chain = prompt | model | parser

    async for chunk in chain.astream({"topic": "parrot"}):
        print(chunk, end="|", flush=True)

    # |Why| did| the| par|rot| wear| a| rain|coat|?

    # |Because| it| wanted| to| be| a| poly|-|umbre|lla|!||%


async def use_stream_input():
    chain = (
        model | JsonOutputParser()
    )

    async for text in chain.astream(
        "output a list of the countries france, spain and japan and their populations in JSON format. "
        'Use a dict with an outer key of "countries" which contains a list of countries. '
        "Each country should have the key `name` and `population`"
    ):
        print(text, flush=True)

    # {}
    # {'countries': []}
    # {'countries': [{}]}
    # {'countries': [{'name': ''}]}
    # {'countries': [{'name': 'France'}]}
    # {'countries': [{'name': 'France', 'population': 652}]}
    # {'countries': [{'name': 'France', 'population': 652735}]}
    # {'countries': [{'name': 'France', 'population': 65273511}]}
    # {'countries': [{'name': 'France', 'population': 65273511}, {}]}
    # {'countries': [{'name': 'France', 'population': 65273511}, {'name': ''}]}
    # {'countries': [{'name': 'France', 'population': 65273511}, {'name': 'Spain'}]}
    # {'countries': [{'name': 'France', 'population': 65273511}, {'name': 'Spain', 'population': 467}]}
    # {'countries': [{'name': 'France', 'population': 65273511}, {'name': 'Spain', 'population': 467547}]}
    # {'countries': [{'name': 'France', 'population': 65273511}, {'name': 'Spain', 'population': 46754778}]}
    # {'countries': [{'name': 'France', 'population': 65273511}, {'name': 'Spain', 'population': 46754778}, {}]}
    # {'countries': [{'name': 'France', 'population': 65273511}, {'name': 'Spain', 'population': 46754778}, {'name': ''}]}
    # {'countries': [{'name': 'France', 'population': 65273511}, {'name': 'Spain', 'population': 46754778}, {'name': 'Japan'}]}
    # {'countries': [{'name': 'France', 'population': 65273511}, {'name': 'Spain', 'population': 46754778}, {'name': 'Japan', 'population': 126}]}
    # {'countries': [{'name': 'France', 'population': 65273511}, {'name': 'Spain', 'population': 46754778}, {'name': 'Japan', 'population': 126476}]}
    # {'countries': [{'name': 'France', 'population': 65273511}, {'name': 'Spain', 'population': 46754778}, {'name': 'Japan', 'population': 126476461}]}


async def use_stream_input_break_stream():
    def _extract_country_names(inputs):
        """A function that does not operates on input streams and breaks streaming."""
        if not isinstance(inputs, dict):
            return ""

        if "countries" not in inputs:
            return ""

        countries = inputs["countries"]

        if not isinstance(countries, list):
            return ""

        country_names = [
            country.get("name") for country in countries if isinstance(country, dict)
        ]
        return country_names

    chain = (
        model | JsonOutputParser() | _extract_country_names
    )

    async for text in chain.astream(
        "output a list of the countries france, spain and japan and their populations in JSON format. "
        'Use a dict with an outer key of "countries" which contains a list of countries. '
        "Each country should have the key `name` and `population`"
    ):
        print(text, end="|", flush=True)

    # Stream break, output:
    # ['France', 'Spain', 'Japan']|



async def use_stream_input_break_stream_fix_with_generator():
    async def _extract_country_names_streaming(input_stream):
        """A function that does not operates on input streams and breaks streaming."""
        country_names_so_far = set()

        async for input in input_stream:
            if not isinstance(input, dict):
                continue

            if "countries" not in input:
                continue

            countries = input["countries"]

            if not isinstance(countries, list):
                continue

            for country in countries:
                name = country.get("name")

                if not name:
                    continue

                if name not in country_names_so_far:
                    yield name
                    country_names_so_far.add(name)


    chain = (
        model | JsonOutputParser() | _extract_country_names_streaming
    )

    async for text in chain.astream(
        "output a list of the countries france, spain and japan and their populations in JSON format. "
        'Use a dict with an outer key of "countries" which contains a list of countries. '
        "Each country should have the key `name` and `population`"
    ):
        print(text, end="|", flush=True)

    # Output:
    # France|Spain|Japan|

def use_stream_non_stream_component():
    template = """Answer the question based only on the following context:
{context}
Question: {question}
"""
    prompt = ChatPromptTemplate.from_template(template)
    vectorstore = FAISS.from_texts(
        ["harrison worked at kensho", "harrison likes spicy food"],
        embedding=OpenAIEmbeddings()
    )
    retriever = vectorstore.as_retriever()

    chunks = [chunk for chunk in retriever.stream("Where did Harrison work?")]
    print(chunks)
    # [[Document(metadata={}, page_content='harrison worked at kensho'), Document(metadata={}, page_content='harrison likes spicy food')]]

def use_stream_non_stream_component_fix_by_chain():
    template = """Answer the question based only on the following context:
{context}
Question: {question}
"""
    prompt = ChatPromptTemplate.from_template(template)
    vectorstore = FAISS.from_texts(
        ["harrison worked at kensho", "harrison likes spicy food"],
        embedding=OpenAIEmbeddings()
    )
    retriever = vectorstore.as_retriever()
    retrieval_chain = (
        {
            "context": retriever.with_config(run_name="Docs"),
            "question": RunnablePassthrough()
        }
        | prompt
        | model
        | StrOutputParser()
    )
    for chunk in retrieval_chain.stream("Where did Harrison work? " "Write 3 made up sentences about this places."):
        print(chunk, end="|", flush=True)

    # |H|arrison| worked| at| Kens|ho|.|

    # |1|.| Kens|ho| is| known| for| its| innovative| approach| to| data| analysis|,| where| employees| often| collaborate| on| cutting|-edge| projects| that| push| the| boundaries| of| technology|.|
    # |2|.| The| office| at| Kens|ho| features| an| open| layout| with| vibrant| colors| and| plenty| of| greenery|,| creating| an| inspiring| environment| for| creativity| and| teamwork|.|
    # |3|.| Every| Friday|,| the| team| at| Kens|ho| enjoys| a| "|Sp|icy| Food| Day|,"| where| employees| bring| in| their| favorite| spicy| dishes| to| share| and| celebrate| their| love| for| bold| flavors|.||

async def use_stream_event_chat_model():
    events = []
    async for event in model.astream_events("hello", version="v2"):
        events.append(event)

    # Events: 13
    # - on_chat_model_start
    # - on_chat_model_stream (n)
    # - on_chat_model_end

    # Event: print(events[0])
    # {
    #     "event": "on_chat_model_start",
    #     "data": {
    #         "input": "hello"
    #     },
    #     "name": "ChatOpenAI",
    #     "tags": [],
    #     "run_id": "86fd4b13-9878-44a6-9612-a42e2d8a9b4d",
    #     "metadata": {
    #         "ls_provider": "openai",
    #         "ls_model_name": "gpt-4o-mini",
    #         "ls_model_type": "chat",
    #         "ls_temperature": 0.0
    #     },
    #     "parent_ids": []
    # }


async def use_stream_event_chain():
    chain = model | JsonOutputParser()

    events = [
        event
        async for event in chain.astream_events("output a list of the countries france, spain and japan and their populations in JSON format. "
        'Use a dict with an outer key of "countries" which contains a list of countries. '
        "Each country should have the key `name` and `population`", version="v2")
    ]

    # Events: 148
    # - on_chain_start
    # - on_chat_model_start
    # - on_chat_model_stream
    # - on_parser_start
    # - on_chat_model_stream (n)
    # - on_parser_stream
    # - on_chain_stream
    # - ...
    # - on_chat_model_stream (n)
    # - on_parser_stream
    # - on_chain_stream
    # - on_chat_model_end
    # - on_parser_end
    # - on_chain_end

async def use_stream_event_chain_extract():
    num_events = 0
    chain = model | JsonOutputParser()
    async for event in chain.astream_events(
        "output a list of the countries france, spain and japan and their populations in JSON format. "
    'Use a dict with an outer key of "countries" which contains a list of countries. '
    "Each country should have the key `name` and `population`",
        version="v2"
    ):
        kind = event["event"]
        if kind == "on_chat_model_stream":
            print(
                f"Chat model chunk: {repr(event['data']['chunk'].content)}",
                flush=True
            )

        if kind == "on_parser_stream":
            print(
                f"Parser chunk: {repr(event['data']['chunk'])}",
                flush=True
            )

        num_events += 1
        if num_events > 30:
            # Truncate the output
            print("...")
            break

        # Output:
        # Chat model chunk: ''
        # Chat model chunk: 'Here'
        # Chat model chunk: ' is'
        # Chat model chunk: ' the'
        # Chat model chunk: ' requested'
        # Chat model chunk: ' data'
        # Chat model chunk: ' in'
        # Chat model chunk: ' JSON'
        # Chat model chunk: ' format'
        # Chat model chunk: ':\n\n'
        # Chat model chunk: '```'
        # Chat model chunk: 'json'
        # Chat model chunk: '\n'
        # Chat model chunk: '{\n'
        # Parser chunk: {}
        # Chat model chunk: ' '
        # Chat model chunk: ' "'
        # Chat model chunk: 'countries'
        # Chat model chunk: '":'
        # Chat model chunk: ' [\n'
        # Parser chunk: {'countries': []}
        # Chat model chunk: '   '
        # Chat model chunk: ' {\n'
        # Parser chunk: {'countries': [{}]}
        # Chat model chunk: '     '

async def use_stream_event_filtering_events():
    # Filter By Name
    chai_by_name = model.with_config({"run_name": "model"}) | JsonOutputParser().with_config(
        {"run_name": "my_parser"})

    # max_events = 0
    # async for event in chai_by_name.astream_events(
    #     "output a list of the countries france, spain and japan and their populations in JSON format. "
    #     'Use a dict with an outer key of "countries" which contains a list of countries. '
    #     "Each country should have the key `name` and `population`",
    #     version="v2",
    #     include_names=["my_parser"],
    # ):
    #     print(event)
    #     max_events += 1
    #     if max_events > 10:
    #         # Truncate the output
    #         print("...")
    #         break

    # Output:
    # {'event': 'on_parser_start', 'data': {'input': 'output a list of the countries france, spain and japan and their populations in JSON format. Use a dict with an outer key of "countries" which contains a list of countries. Each country should have the key `name` and `population`'}, 'name': 'my_parser', 'tags': ['seq:step:2'], 'run_id': '7901a374-a3a3-4ec5-b9f5-86256eafe6f1', 'metadata': {}, 'parent_ids': ['718bc2c8-686d-4dea-b166-d12aac8cf0a1']}
    # {'event': 'on_parser_stream', 'run_id': '7901a374-a3a3-4ec5-b9f5-86256eafe6f1', 'name': 'my_parser', 'tags': ['seq:step:2'], 'metadata': {}, 'data': {'chunk': {}}, 'parent_ids': ['718bc2c8-686d-4dea-b166-d12aac8cf0a1']}
    # {'event': 'on_parser_stream', 'run_id': '7901a374-a3a3-4ec5-b9f5-86256eafe6f1', 'name': 'my_parser', 'tags': ['seq:step:2'], 'metadata': {}, 'data': {'chunk': {'countries': []}}, 'parent_ids': ['718bc2c8-686d-4dea-b166-d12aac8cf0a1']}
    # {'event': 'on_parser_stream', 'run_id': '7901a374-a3a3-4ec5-b9f5-86256eafe6f1', 'name': 'my_parser', 'tags': ['seq:step:2'], 'metadata': {}, 'data': {'chunk': {'countries': [{}]}}, 'parent_ids': ['718bc2c8-686d-4dea-b166-d12aac8cf0a1']}
    # {'event': 'on_parser_stream', 'run_id': '7901a374-a3a3-4ec5-b9f5-86256eafe6f1', 'name': 'my_parser', 'tags': ['seq:step:2'], 'metadata': {}, 'data': {'chunk': {'countries': [{'name': ''}]}}, 'parent_ids': ['718bc2c8-686d-4dea-b166-d12aac8cf0a1']}
    # {'event': 'on_parser_stream', 'run_id': '7901a374-a3a3-4ec5-b9f5-86256eafe6f1', 'name': 'my_parser', 'tags': ['seq:step:2'], 'metadata': {}, 'data': {'chunk': {'countries': [{'name': 'France'}]}}, 'parent_ids': ['718bc2c8-686d-4dea-b166-d12aac8cf0a1']}
    # {'event': 'on_parser_stream', 'run_id': '7901a374-a3a3-4ec5-b9f5-86256eafe6f1', 'name': 'my_parser', 'tags': ['seq:step:2'], 'metadata': {}, 'data': {'chunk': {'countries': [{'name': 'France', 'population': 652}]}}, 'parent_ids': ['718bc2c8-686d-4dea-b166-d12aac8cf0a1']}
    # {'event': 'on_parser_stream', 'run_id': '7901a374-a3a3-4ec5-b9f5-86256eafe6f1', 'name': 'my_parser', 'tags': ['seq:step:2'], 'metadata': {}, 'data': {'chunk': {'countries': [{'name': 'France', 'population': 652735}]}}, 'parent_ids': ['718bc2c8-686d-4dea-b166-d12aac8cf0a1']}
    # {'event': 'on_parser_stream', 'run_id': '7901a374-a3a3-4ec5-b9f5-86256eafe6f1', 'name': 'my_parser', 'tags': ['seq:step:2'], 'metadata': {}, 'data': {'chunk': {'countries': [{'name': 'France', 'population': 65273511}]}}, 'parent_ids': ['718bc2c8-686d-4dea-b166-d12aac8cf0a1']}
    # {'event': 'on_parser_stream', 'run_id': '7901a374-a3a3-4ec5-b9f5-86256eafe6f1', 'name': 'my_parser', 'tags': ['seq:step:2'], 'metadata': {}, 'data': {'chunk': {'countries': [{'name': 'France', 'population': 65273511}, {}]}}, 'parent_ids': ['718bc2c8-686d-4dea-b166-d12aac8cf0a1']}
    # {'event': 'on_parser_stream', 'run_id': '7901a374-a3a3-4ec5-b9f5-86256eafe6f1', 'name': 'my_parser', 'tags': ['seq:step:2'], 'metadata': {}, 'data': {'chunk': {'countries': [{'name': 'France', 'population': 65273511}, {'name': ''}]}}, 'parent_ids': ['718bc2c8-686d-4dea-b166-d12aac8cf0a1']}
    # ...

    # Filter By Type
    # chain_by_type = model.with_config({"run_name": "model"}) | JsonOutputParser().with_config(
    #     {"run_name": "my_parser"}
    # )

    # max_events = 0
    # async for event in chain_by_type.astream_events(
    #     'output a list of the countries france, spain and japan and their populations in JSON format. Use a dict with an outer key of "countries" which contains a list of countries. Each country should have the key `name` and `population`',
    #     version="v2",
    #     include_types=["chat_model"],
    # ):
    #     print(event)
    #     max_events += 1
    #     if max_events > 10:
    #         # Truncate the output
    #         print("...")
    #         break

    # Output:
    # {'event': 'on_chat_model_start', 'data': {'input': 'output a list of the countries france, spain and japan and their populations in JSON format. Use a dict with an outer key of "countries" which contains a list of countries. Each country should have the key `name` and `population`'}, 'name': 'model', 'tags': ['seq:step:1'], 'run_id': '2c549e5a-91ce-4ad8-b7c3-9551377fd7f5', 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['2ec99513-4789-465e-9e53-3adf7ed96769']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content='', additional_kwargs={}, response_metadata={}, id='run-2c549e5a-91ce-4ad8-b7c3-9551377fd7f5')}, 'run_id': '2c549e5a-91ce-4ad8-b7c3-9551377fd7f5', 'name': 'model', 'tags': ['seq:step:1'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['2ec99513-4789-465e-9e53-3adf7ed96769']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content='Here', additional_kwargs={}, response_metadata={}, id='run-2c549e5a-91ce-4ad8-b7c3-9551377fd7f5')}, 'run_id': '2c549e5a-91ce-4ad8-b7c3-9551377fd7f5', 'name': 'model', 'tags': ['seq:step:1'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['2ec99513-4789-465e-9e53-3adf7ed96769']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' is', additional_kwargs={}, response_metadata={}, id='run-2c549e5a-91ce-4ad8-b7c3-9551377fd7f5')}, 'run_id': '2c549e5a-91ce-4ad8-b7c3-9551377fd7f5', 'name': 'model', 'tags': ['seq:step:1'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['2ec99513-4789-465e-9e53-3adf7ed96769']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' the', additional_kwargs={}, response_metadata={}, id='run-2c549e5a-91ce-4ad8-b7c3-9551377fd7f5')}, 'run_id': '2c549e5a-91ce-4ad8-b7c3-9551377fd7f5', 'name': 'model', 'tags': ['seq:step:1'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['2ec99513-4789-465e-9e53-3adf7ed96769']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' requested', additional_kwargs={}, response_metadata={}, id='run-2c549e5a-91ce-4ad8-b7c3-9551377fd7f5')}, 'run_id': '2c549e5a-91ce-4ad8-b7c3-9551377fd7f5', 'name': 'model', 'tags': ['seq:step:1'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['2ec99513-4789-465e-9e53-3adf7ed96769']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' data', additional_kwargs={}, response_metadata={}, id='run-2c549e5a-91ce-4ad8-b7c3-9551377fd7f5')}, 'run_id': '2c549e5a-91ce-4ad8-b7c3-9551377fd7f5', 'name': 'model', 'tags': ['seq:step:1'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['2ec99513-4789-465e-9e53-3adf7ed96769']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' in', additional_kwargs={}, response_metadata={}, id='run-2c549e5a-91ce-4ad8-b7c3-9551377fd7f5')}, 'run_id': '2c549e5a-91ce-4ad8-b7c3-9551377fd7f5', 'name': 'model', 'tags': ['seq:step:1'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['2ec99513-4789-465e-9e53-3adf7ed96769']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' JSON', additional_kwargs={}, response_metadata={}, id='run-2c549e5a-91ce-4ad8-b7c3-9551377fd7f5')}, 'run_id': '2c549e5a-91ce-4ad8-b7c3-9551377fd7f5', 'name': 'model', 'tags': ['seq:step:1'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['2ec99513-4789-465e-9e53-3adf7ed96769']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' format', additional_kwargs={}, response_metadata={}, id='run-2c549e5a-91ce-4ad8-b7c3-9551377fd7f5')}, 'run_id': '2c549e5a-91ce-4ad8-b7c3-9551377fd7f5', 'name': 'model', 'tags': ['seq:step:1'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['2ec99513-4789-465e-9e53-3adf7ed96769']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=':\n\n', additional_kwargs={}, response_metadata={}, id='run-2c549e5a-91ce-4ad8-b7c3-9551377fd7f5')}, 'run_id': '2c549e5a-91ce-4ad8-b7c3-9551377fd7f5', 'name': 'model', 'tags': ['seq:step:1'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['2ec99513-4789-465e-9e53-3adf7ed96769']}
    # ...

    # Filter by tags
    chain = (model | JsonOutputParser()).with_config({"tags": ["my_chain"]})
    max_events = 0
    async for event in chain.astream_events(
        'output a list of the countries france, spain and japan and their populations in JSON format. Use a dict with an outer key of "countries" which contains a list of countries. Each country should have the key `name` and `population`',
        version="v2",
        include_tags=["my_chain"],
    ):
        print(event)
        max_events += 1
        if max_events > 10:
            # Truncate the output
            print("...")
            break

    # Output:
    # {'event': 'on_chain_start', 'data': {'input': 'output a list of the countries france, spain and japan and their populations in JSON format. Use a dict with an outer key of "countries" which contains a list of countries. Each country should have the key `name` and `population`'}, 'name': 'RunnableSequence', 'tags': ['my_chain'], 'run_id': '75060b32-e570-41f3-aee7-0f0938737f6b', 'metadata': {}, 'parent_ids': []}
    # {'event': 'on_chat_model_start', 'data': {'input': {'messages': [[HumanMessage(content='output a list of the countries france, spain and japan and their populations in JSON format. Use a dict with an outer key of "countries" which contains a list of countries. Each country should have the key `name` and `population`', additional_kwargs={}, response_metadata={})]]}}, 'name': 'ChatOpenAI', 'tags': ['seq:step:1', 'my_chain'], 'run_id': '8d4033e2-3fcd-46a7-aaf4-6b3789650107', 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['75060b32-e570-41f3-aee7-0f0938737f6b']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content='', additional_kwargs={}, response_metadata={}, id='run-8d4033e2-3fcd-46a7-aaf4-6b3789650107')}, 'run_id': '8d4033e2-3fcd-46a7-aaf4-6b3789650107', 'name': 'ChatOpenAI', 'tags': ['seq:step:1', 'my_chain'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['75060b32-e570-41f3-aee7-0f0938737f6b']}
    # {'event': 'on_parser_start', 'data': {}, 'name': 'JsonOutputParser', 'tags': ['seq:step:2', 'my_chain'], 'run_id': 'c5e925e0-7437-40c1-965d-f93f55e5a261', 'metadata': {}, 'parent_ids': ['75060b32-e570-41f3-aee7-0f0938737f6b']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content='Here', additional_kwargs={}, response_metadata={}, id='run-8d4033e2-3fcd-46a7-aaf4-6b3789650107')}, 'run_id': '8d4033e2-3fcd-46a7-aaf4-6b3789650107', 'name': 'ChatOpenAI', 'tags': ['seq:step:1', 'my_chain'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['75060b32-e570-41f3-aee7-0f0938737f6b']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' is', additional_kwargs={}, response_metadata={}, id='run-8d4033e2-3fcd-46a7-aaf4-6b3789650107')}, 'run_id': '8d4033e2-3fcd-46a7-aaf4-6b3789650107', 'name': 'ChatOpenAI', 'tags': ['seq:step:1', 'my_chain'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['75060b32-e570-41f3-aee7-0f0938737f6b']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' the', additional_kwargs={}, response_metadata={}, id='run-8d4033e2-3fcd-46a7-aaf4-6b3789650107')}, 'run_id': '8d4033e2-3fcd-46a7-aaf4-6b3789650107', 'name': 'ChatOpenAI', 'tags': ['seq:step:1', 'my_chain'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['75060b32-e570-41f3-aee7-0f0938737f6b']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' requested', additional_kwargs={}, response_metadata={}, id='run-8d4033e2-3fcd-46a7-aaf4-6b3789650107')}, 'run_id': '8d4033e2-3fcd-46a7-aaf4-6b3789650107', 'name': 'ChatOpenAI', 'tags': ['seq:step:1', 'my_chain'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['75060b32-e570-41f3-aee7-0f0938737f6b']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' data', additional_kwargs={}, response_metadata={}, id='run-8d4033e2-3fcd-46a7-aaf4-6b3789650107')}, 'run_id': '8d4033e2-3fcd-46a7-aaf4-6b3789650107', 'name': 'ChatOpenAI', 'tags': ['seq:step:1', 'my_chain'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['75060b32-e570-41f3-aee7-0f0938737f6b']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' in', additional_kwargs={}, response_metadata={}, id='run-8d4033e2-3fcd-46a7-aaf4-6b3789650107')}, 'run_id': '8d4033e2-3fcd-46a7-aaf4-6b3789650107', 'name': 'ChatOpenAI', 'tags': ['seq:step:1', 'my_chain'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['75060b32-e570-41f3-aee7-0f0938737f6b']}
    # {'event': 'on_chat_model_stream', 'data': {'chunk': AIMessageChunk(content=' JSON', additional_kwargs={}, response_metadata={}, id='run-8d4033e2-3fcd-46a7-aaf4-6b3789650107')}, 'run_id': '8d4033e2-3fcd-46a7-aaf4-6b3789650107', 'name': 'ChatOpenAI', 'tags': ['seq:step:1', 'my_chain'], 'metadata': {'ls_provider': 'openai', 'ls_model_name': 'gpt-4o-mini', 'ls_model_type': 'chat', 'ls_temperature': 0.0}, 'parent_ids': ['75060b32-e570-41f3-aee7-0f0938737f6b']}
    # ...

async def use_stream_event_non_streaming_components():
    def _extract_country_names(inputs):
        """A function that does not operates on input streams and breaks streaming."""
        if not isinstance(inputs, dict):
            return ""

        if "countries" not in inputs:
            return ""

        countries = inputs["countries"]

        if not isinstance(countries, list):
            return ""

        country_names = [
            country.get("name") for country in countries if isinstance(country, dict)
        ]
        return country_names

    chain = (
        model | JsonOutputParser() | _extract_country_names
    )

    # async for chunk in chain.astream(
    #     "output a list of the countries france, spain and japan and their populations in JSON format. "
    #     'Use a dict with an outer key of "countries" which contains a list of countries. '
    #     "Each country should have the key `name` and `population`",
    # ):
    #     print(chunk, flush=True)

    # Output: not streaming
    # ['France', 'Spain', 'Japan']

    number_events = 0
    async for event in chain.astream_events(
        "output a list of the countries france, spain and japan and their populations in JSON format. "
        'Use a dict with an outer key of "countries" which contains a list of countries. '
        "Each country should have the key `name` and `population`",
        version="v2"
    ):
        kind = event["event"]
        if kind == "on_chat_model_stream":
            print(
                f"Chat model chunk: {repr(event['data']['chunk'].content)}",
                flush=True
            )

        if kind == "on_parser_stream":
            print(
                f"Parser chunk: {repr(event['data']['chunk'])}",
                flush=True
            )

        number_events += 1

        if number_events > 30:
            # Truncate the output
            print("...")
            break

    # Output:
    # Chat model chunk: ''
    # Chat model chunk: 'Here'
    # Chat model chunk: ' is'
    # Chat model chunk: ' the'
    # Chat model chunk: ' requested'
    # Chat model chunk: ' data'
    # Chat model chunk: ' in'
    # Chat model chunk: ' JSON'
    # Chat model chunk: ' format'
    # Chat model chunk: ':\n\n'
    # Chat model chunk: '```'
    # Chat model chunk: 'json'
    # Chat model chunk: '\n'
    # Chat model chunk: '{\n'
    # Parser chunk: {}
    # Chat model chunk: ' '
    # Chat model chunk: ' "'
    # Chat model chunk: 'countries'
    # Chat model chunk: '":'
    # Chat model chunk: ' [\n'
    # Parser chunk: {'countries': []}
    # Chat model chunk: '   '
    # Chat model chunk: ' {\n'
    # Parser chunk: {'countries': [{}]}
    # Chat model chunk: '     '
    # Chat model chunk: ' "'
    # Chat model chunk: 'name'
    # ...

def reverse_word(word: str):
        return word[::-1]

reverse_word = RunnableLambda(reverse_word)

async def use_stream_event_bad_propagating_callbacks():
    @tool
    def bad_tool(word: str):
        """Custom tool that doesn't propagate callbacks."""
        return reverse_word.invoke(word)


    async for event in bad_tool.astream_events("hello", version="v2"):
        print(event)

    # Output:
    # {'event': 'on_tool_start', 'data': {'input': 'hello'}, 'name': 'bad_tool', 'tags': [], 'run_id': '44147162-6cd1-4abd-ad5a-90ee1c399aa1', 'metadata': {}, 'parent_ids': []}
    # {'event': 'on_chain_start', 'data': {'input': 'hello'}, 'name': 'reverse_word', 'tags': [], 'run_id': '10df3def-e04d-48d4-9516-da60c0301611', 'metadata': {}, 'parent_ids': ['44147162-6cd1-4abd-ad5a-90ee1c399aa1']}
    # {'event': 'on_chain_end', 'data': {'output': 'olleh', 'input': 'hello'}, 'run_id': '10df3def-e04d-48d4-9516-da60c0301611', 'name': 'reverse_word', 'tags': [], 'metadata': {}, 'parent_ids': ['44147162-6cd1-4abd-ad5a-90ee1c399aa1']}
    # {'event': 'on_tool_end', 'data': {'output': 'olleh'}, 'run_id': '44147162-6cd1-4abd-ad5a-90ee1c399aa1', 'name': 'bad_tool', 'tags': [], 'metadata': {}, 'parent_ids': []}

async def use_stream_event_good_propagating_callbacks():
    @tool
    def good_tool(word: str, callbacks):
        """A tool that correctly propagates callbacks."""
        return reverse_word.invoke(word, {"callback": callbacks})

    async for event in good_tool.astream_events("hello", version="v2"):
        print(event)

    # Output:
    # {'event': 'on_tool_start', 'data': {'input': 'hello'}, 'name': 'good_tool', 'tags': [], 'run_id': '0585142b-9dba-4417-8d02-bad730a4bd23', 'metadata': {}, 'parent_ids': []}
    # {'event': 'on_chain_start', 'data': {'input': 'hello'}, 'name': 'reverse_word', 'tags': [], 'run_id': '631edb77-490d-42fb-acf8-56f633e95bc2', 'metadata': {}, 'parent_ids': ['0585142b-9dba-4417-8d02-bad730a4bd23']}
    # {'event': 'on_chain_end', 'data': {'output': 'olleh', 'input': 'hello'}, 'run_id': '631edb77-490d-42fb-acf8-56f633e95bc2', 'name': 'reverse_word', 'tags': [], 'metadata': {}, 'parent_ids': ['0585142b-9dba-4417-8d02-bad730a4bd23']}
    # {'event': 'on_tool_end', 'data': {'output': 'olleh'}, 'run_id': '0585142b-9dba-4417-8d02-bad730a4bd23', 'name': 'good_tool', 'tags': [], 'metadata': {}, 'parent_ids': []}

async def reverse_and_double(word: str):
    return await reverse_word.ainvoke(word) * 2

reverse_and_double = RunnableLambda(reverse_and_double)

async def use_stream_event_propagation_callback_runnable_lambda():
    await reverse_and_double.ainvoke("1234")

    async for event in reverse_and_double.astream_events("1234", version="v2"):
        print(event)

    # Output:
    # {'event': 'on_chain_start', 'data': {'input': '1234'}, 'name': 'reverse_and_double', 'tags': [], 'run_id': '7ab5840f-f71a-4115-be48-1e0f7184d7e6', 'metadata': {}, 'parent_ids': []}
    # {'event': 'on_chain_start', 'data': {'input': '1234'}, 'name': 'reverse_word', 'tags': [], 'run_id': '35a40aed-a3c5-4b69-8b10-b0a35300f53c', 'metadata': {}, 'parent_ids': ['7ab5840f-f71a-4115-be48-1e0f7184d7e6']}
    # {'event': 'on_chain_end', 'data': {'output': '4321', 'input': '1234'}, 'run_id': '35a40aed-a3c5-4b69-8b10-b0a35300f53c', 'name': 'reverse_word', 'tags': [], 'metadata': {}, 'parent_ids': ['7ab5840f-f71a-4115-be48-1e0f7184d7e6']}
    # {'event': 'on_chain_stream', 'run_id': '7ab5840f-f71a-4115-be48-1e0f7184d7e6', 'name': 'reverse_and_double', 'tags': [], 'metadata': {}, 'data': {'chunk': '43214321'}, 'parent_ids': []}
    # {'event': 'on_chain_end', 'data': {'output': '43214321'}, 'run_id': '7ab5840f-f71a-4115-be48-1e0f7184d7e6', 'name': 'reverse_and_double', 'tags': [], 'metadata': {}, 'parent_ids': []}

@chain
async def reverse_and_double2(word: str):
    return await reverse_word.ainvoke(word) * 2

async def use_stream_event_propagation_callback_chain_decorator():
    await reverse_and_double2.ainvoke("1234")

    async for event in reverse_and_double.astream_events("1234", version="v2"):
        print(event)

if __name__ == "__main__":
    # Using stream
    use_stream_llm_and_chat_model()
    asyncio.run(use_stream_chain())
    asyncio.run(use_stream_input())
    asyncio.run(use_stream_input_break_stream())
    asyncio.run(use_stream_input_break_stream_fix_with_generator())

    use_stream_non_stream_component()
    use_stream_non_stream_component_fix_by_chain()

    # Using stream events
    asyncio.run(use_stream_event_chat_model())
    asyncio.run(use_stream_event_chain())
    asyncio.run(use_stream_event_chain_extract())
    asyncio.run(use_stream_event_filtering_events())
    asyncio.run(use_stream_event_non_streaming_components())
    asyncio.run(use_stream_event_bad_propagating_callbacks())
    asyncio.run(use_stream_event_good_propagating_callbacks())
    asyncio.run(use_stream_event_propagation_callback_runnable_lambda())
    asyncio.run(use_stream_event_propagation_callback_chain_decorator())