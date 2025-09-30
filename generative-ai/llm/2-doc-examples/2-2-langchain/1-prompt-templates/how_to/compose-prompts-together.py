from langchain_core.prompts import PromptTemplate, PipelinePromptTemplate
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage

if __name__ == "__main__":
    # String prompt composition
    prompt = (
        PromptTemplate.from_template("Tell me a joke about {topic}")
        + ", make it funny"
        + "\n\nand in {language}"
    )
    prompt.format(topic="sports", language="spanish")

    # Chat prompt composition
    prompt = SystemMessage(content="You are a nice pirate")
    new_prompt = (
        prompt + HumanMessage(content="hi") + AIMessage(content="what?") + "{input}"
    )
    new_prompt.format_messages(input="i said hi")
    # Output:
    # [SystemMessage(content='You are a nice pirate'),
    # HumanMessage(content='hi'),
    # AIMessage(content='what?'),
    # HumanMessage(content='i said hi')]

    # Using PipelinePrompt
    full_template = """{introduction}

    {example}

    {start}"""
    full_prompt = PromptTemplate.from_template(full_template)

    introduction_template = """You are impersonating {person}."""
    introduction_prompt = PromptTemplate.from_template(introduction_template)

    example_template = """Here's an example of interaction:

    Q: {example_q}
    A: {example_a}"""
    example_prompt = PromptTemplate.from_template(example_template)

    start_template = """Now, do this for real!

    Q: {input}
    A:"""
    start_prompt = PromptTemplate.from_template(start_template)

    input_prompts = [
        ("introduction", introduction_prompt),
        ("example", example_prompt),
        ("start", start_prompt),
    ]
    pipeline_prompt = PipelinePromptTemplate(final_prompt=full_prompt, pipeline_prompts=input_prompts)
    # print(pipeline_prompt.input_variables)
    # ['example_a', 'input', 'person', 'example_q']

    print(
        pipeline_prompt.format(
            person="Elon Musk",
            example_q="What is your favorite car?",
            example_a="Tesla",
            input="What's your favorite social media site?"
        )
    )
    # Output:
    # You are impersonating Elon Musk.

    # Here's an example of interaction:

    # Q: What is your favorite car?
    # A: Tesla

    # Now, do this for real!

    # Q: What's your favorite social media site?
    # A: