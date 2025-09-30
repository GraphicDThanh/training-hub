import getpass
import os
import time
from datasets import load_dataset
from dotenv import load_dotenv, find_dotenv
from langchain_openai import OpenAI, ChatOpenAI, OpenAIEmbeddings
from langchain_core.messages import HumanMessage, SystemMessage
from langchain.prompts import PromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pinecone import Pinecone, ServerlessSpec

# SETUP
# load .env file
load_dotenv(find_dotenv())
# check if required key is set
if "OPENAI_API_KEY" not in os.environ:
    os.environ["OPENAI_API_KEY"] = getpass.getpass("Enter your OpenAI API key: ")

def open_ai():
    # Example with OpenAI text completion
    # https://python.langchain.com/docs/integrations/llms/openai/
    llm = OpenAI(model_name="gpt-3.5-turbo-instruct")
    print(
        llm.invoke("explain large language models in one sentence")
    )
    # Output:
    # Large language models are advanced artificial intelligence systems that are trained on vast amounts of data and have the ability to understand and generate human-like language.

def chat_open_ai():
    # Example with OpenAI chat
    llm_chat = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.3)
    messages = [
        SystemMessage(content="You are an expert data scientist."),
        HumanMessage(content="Write a Python script that trains a neural network on simulated data ")
    ]
    response = llm_chat.invoke(messages)
    print(response)
    # Output:
    # content="Sure! Here's an example Python script that trains a simple neural network on simulated data using the popular deep learning library TensorFlow:\n\n```python\nimport numpy as np\nimport tensorflow as tf\n\n# Generate simulated data\nnp.random.seed(0)\nX = np.random.rand(100, 2)\ny = np.random.randint(0, 2, 100)\n\n# Define the neural network architecture\nmodel = tf.keras.models.Sequential([\n    tf.keras.layers.Dense(64, activation='relu', input_shape=(2,)),\n    tf.keras.layers.Dense(1, activation='sigmoid')\n])\n\n# Compile the model\nmodel.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])\n\n# Train the model\nmodel.fit(X, y, epochs=10, batch_size=32)\n\n# Evaluate the model\nloss, accuracy = model.evaluate(X, y)\nprint(f'Loss: {loss}, Accuracy: {accuracy}')\n```\n\nIn this script:\n1. We generate simulated data with 2 features and binary labels.\n2. We define a simple neural network with one hidden layer and an output layer.\n3. We compile the model with the Adam optimizer and binary cross-entropy loss.\n4. We train the model on the simulated data for 10 epochs.\n5. We evaluate the model on the same data and print the loss and accuracy.\n\nYou can run this script in a Python environment with TensorFlow installed to train a neural network on simulated data." additional_kwargs={'refusal': None} response_metadata={'token_usage': {'completion_tokens': 294, 'prompt_tokens': 31, 'total_tokens': 325, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None} id='run-b48a7465-84bf-42bd-bdb2-ae2cf41624bf-0' usage_metadata={'input_tokens': 31, 'output_tokens': 294, 'total_tokens': 325, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}

def prompt_template():
    template = """
        You are an expert data scientist with an expertise in building deep learning models.
        Explain the content of {concept} in a couple of lines
    """
    llm_chat = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.3)
    prompt = PromptTemplate(
        input_variables=["concept"],
        template=template,
    )
    print(llm_chat.invoke(prompt.format(concept="regularization")))
    # Output:
    # content="
    # Regularization is a technique used in machine learning
    # to prevent overfitting by adding a penalty term to the loss function.
    # This penalty term discourages overly complex models by
    # penalizing large weights or high model complexity,
    # ultimately improving the model's generalization performance on unseen data.
    # "
    # additional_kwargs={'refusal': None} response_metadata={'token_usage': {'completion_tokens': 54, 'prompt_tokens': 37, 'total_tokens': 91, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None} id='run-7b7cbc39-9222-4f8d-b4ea-7d77d514641e-0' usage_metadata={'input_tokens': 37, 'output_tokens': 54, 'total_tokens': 91, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}

def chain():
    llm_chat = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.3)
    template = """
        You are an expert data scientist with an expertise in building deep learning models.
        Explain the content of {concept} in a couple of lines
    """
    prompt = PromptTemplate(
        input_variables=["concept"],
        template=template,
    )
    chain = prompt | llm_chat
    # output = chain.invoke("regularization")
    # print(output)
    # Output
    # content='Regularization is a technique used in machine learning to prevent overfitting by adding a penalty term to the loss function. This penalty term discourages the model from becoming too complex, helping it generalize better to unseen data.' additional_kwargs={'refusal': None} response_metadata={'token_usage': {'completion_tokens': 44, 'prompt_tokens': 37, 'total_tokens': 81, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None} id='run-568f57cd-88a1-4b35-903c-3cf3fea07835-0' usage_metadata={'input_tokens': 37, 'output_tokens': 44, 'total_tokens': 81, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}

    second_prompt = PromptTemplate(
        input_variables=["ml_concept"],
        template="Turn the concept description of {ml_concept} and explain it to me like I'm five with 500 words",
    )
    chain_two = second_prompt | llm_chat
    # output = chain_two.invoke("regularization")
    # print(output)
    # content="
    #   Regularization is like putting a leash on a wild animal.
    #   It helps to control and limit the wildness of the animal
    #   so it doesn't run too far away or cause trouble.
    #   In the same way, regularization helps to control and limit
    #   the complexity of a mathematical model so it doesn't
    #   get too wild and make inaccurate predictions.
    # "
    # additional_kwargs={'refusal': None} response_metadata={'token_usage': {'completion_tokens': 65, 'prompt_tokens': 22, 'total_tokens': 87, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None} id='run-ac5e39f6-28c8-4860-bf0c-528171e8773a-0' usage_metadata={'input_tokens': 22, 'output_tokens': 65, 'total_tokens': 87, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}

    overall_chain = chain | chain_two
    explanation = overall_chain.invoke("regularization")
    print(explanation)
    # content="
    # Regularization is like putting a limit on how complicated
    # a machine learning model can get. This helps the model
    # to not get too carried away and focus on what's important.
    # It's like teaching a robot to not overthink things
    # so it can do its job better and not get confused.
    # "
    # additional_kwargs={'refusal': None} response_metadata={'token_usage': {'completion_tokens': 57, 'prompt_tokens': 288, 'total_tokens': 345, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None} id='run-9f34e4da-3d55-4a62-800e-5bebc8ac7602-0' usage_metadata={'input_tokens': 288, 'output_tokens': 57, 'total_tokens': 345, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}


def embeddings_and_vector_stores():
    # Step 1: Split text into chunks
    explanation = """
    Regularization is like having a teacher who helps you learn but also makes sure you don't learn too much of the wrong things. Imagine you have a big puzzle to solve, and you have a lot of pieces to fit together. If you try to force the pieces to fit perfectly, you might end up making a mess and not solving the puzzle correctly. \n\nIn machine learning, we use a technique called regularization to prevent the computer from trying too hard to fit all the pieces together perfectly. This technique adds a penalty to the computer's learning process, which makes it less likely to make mistakes by focusing too much on small details that might not be important.\n\nThink of it like this: when you're learning something new, you might make mistakes along the way. Regularization helps the computer learn from those mistakes without getting too caught up in them. It's like having a safety net that guides the computer in the right direction, even when things get tricky.\n\nOne way regularization works is by discouraging the computer from creating overly complex models. Just like you wouldn't want to use too many pieces to solve a puzzle, the computer shouldn't use too many complicated rules to make predictions. By penalizing large weights or high model complexity, regularization helps the computer focus on the most important parts of the problem.\n\nAnother important aspect of regularization is improving the computer's ability to predict things it hasn't seen before. Just like you want to be able to solve different puzzles, the computer needs to be able to make accurate predictions on new data. Regularization helps the computer generalize its learning so that it can perform well on unseen information.\n\nOverall, regularization is like a helpful guide that keeps the computer on track during the learning process. It ensures that the computer doesn't get too caught up in small details, focuses on the most important aspects of the problem, and improves its ability to make accurate predictions on new data. By using regularization, we can help the computer learn more effectively and avoid making mistakes that could lead to incorrect conclusions.
    """
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=100,
        chunk_overlap=0,
    )
    texts = text_splitter.create_documents([explanation])
    # print(texts)
    # Output:
    # [
    #   Document(metadata={}, page_content="Regularization is like having a teacher who helps you learn but also makes sure you don't learn"),
    #   Document(metadata={}, page_content='too much of the wrong things. Imagine you have a big puzzle to solve, and you have a lot of pieces'),
    #   Document(metadata={}, page_content='to fit together. If you try to force the pieces to fit perfectly, you might end up making a mess'),
    #   Document(metadata={}, page_content='and not solving the puzzle correctly.'),
    #   Document(metadata={}, page_content='In machine learning, we use a technique called regularization to prevent the computer from trying'),
    #   Document(metadata={}, page_content="too hard to fit all the pieces together perfectly. This technique adds a penalty to the computer's"),
    #   Document(metadata={}, page_content='learning process, which makes it less likely to make mistakes by focusing too much on small details'),
    #   Document(metadata={}, page_content='that might not be important.'),
    #   Document(metadata={}, page_content="Think of it like this: when you're learning something new, you might make mistakes along the way."),
    #   Document(metadata={}, page_content='Regularization helps the computer learn from those mistakes without getting too caught up in them.'),
    #   Document(metadata={}, page_content="It's like having a safety net that guides the computer in the right direction, even when things get"),
    #   Document(metadata={}, page_content='tricky.'),
    #   Document(metadata={}, page_content='One way regularization works is by discouraging the computer from creating overly complex models.'),
    #   Document(metadata={}, page_content="Just like you wouldn't want to use too many pieces to solve a puzzle, the computer shouldn't use"),
    #   Document(metadata={}, page_content='too many complicated rules to make predictions. By penalizing large weights or high model'),
    #   Document(metadata={}, page_content='complexity, regularization helps the computer focus on the most important parts of the problem.'),
    #   Document(metadata={}, page_content="Another important aspect of regularization is improving the computer's ability to predict things it"),
    #   Document(metadata={}, page_content="hasn't seen before. Just like you want to be able to solve different puzzles, the computer needs to"),
    #   Document(metadata={}, page_content='be able to make accurate predictions on new data. Regularization helps the computer generalize its'),
    #   Document(metadata={}, page_content='learning so that it can perform well on unseen information.'),
    #   Document(metadata={}, page_content='Overall, regularization is like a helpful guide that keeps the computer on track during the'),
    #   Document(metadata={}, page_content="learning process. It ensures that the computer doesn't get too caught up in small details, focuses"),
    #   Document(metadata={}, page_content='on the most important aspects of the problem, and improves its ability to make accurate predictions'),
    #   Document(metadata={}, page_content='on new data. By using regularization, we can help the computer learn more effectively and avoid'),
    #   Document(metadata={}, page_content='making mistakes that could lead to incorrect conclusions.')
    # ]

    # print(texts[0].page_content)
    # Regularization is like having a teacher who helps you learn but also makes sure you don't learn

    # Step 2: Embed text using OpenAI
    # - Embed text using OpenAI
    # https://python.langchain.com/docs/integrations/text_embedding/openai/
    embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
    query_result = embeddings.embed_query(texts[0].page_content)
    # print(query_result)
    # Output:
    # [-0.036585669964551926, ..., 0.007846083492040634]

    # Step 3: Store embeddings in Pinecone vector store (not work yet)
    # - Init pinecone index
    pc = Pinecone()
    index_name = 'langchain-quickstart'
    # check if index already exists (it shouldn't if this is your first run)
    if index_name not in pc.list_indexes().names():
        # if does not exist, create index
        pc.create_index(
            index_name,
            dimension=1536,  # dimensionality of text-embed-3-small
            metric='cosine',
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
            deletion_protection="disabled"
        )
        # wait for index to be initialized
        while not pc.describe_index(index_name).status['ready']:
            time.sleep(1)


    # connect to index
    index = pc.Index(index_name)
    time.sleep(1)


    # - Load data
    for text in texts:
        query_result = embeddings.embed_query(text.page_content)
        index.upsert(text.page_content, query_result)

    # Step 4: Query to search for similar text
    query = "Regularization is like having a teacher who helps you learn but also makes sure you don't learn"
    query_result = embeddings.embed_query(query)
    res = index.query(queries=[query_result], top_k=1)
    print(res)

def agents():
    # Code snippet (outdated)
    from langchain.agents.agent_toolkits import create_python_agent
    from langchain.tools.python.tool import PythonREPLTool
    from langchain.python import PythonREPL
    from langchain.llms.openai import OpenAI

    agent_executor = create_python_agent(
        llm=OpenAI(temperature=0, max_tokens=1000),
        tool=PythonREPLTool(),
        verbose=True,
    )
    agent_executor.run("Find the roots (zeros) if the quadratic function 3 * x**2 + 2*x -1")

def main():
    open_ai()
    chat_open_ai()
    prompt_template()
    chain()
    embeddings_and_vector_stores()
    agents()





if __name__ == "__main__":
    main()

