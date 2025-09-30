from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain_chroma import Chroma
from langchain_core.example_selectors import SemanticSimilarityExampleSelector
from langchain_openai import OpenAIEmbeddings


if __name__ == "__main__":
    examples = [
        {
            "question": "Who lived longer, Muhammad Ali or Alan Turing?",
            "answer": """
Are follow up questions needed here: Yes.
Follow up: How old was Muhammad Ali when he died?
Intermediate answer: Muhammad Ali was 74 years old when he died.
Follow up: How old was Alan Turing when he died?
Intermediate answer: Alan Turing was 41 years old when he died.
So the final answer is: Muhammad Ali
""",
        },
        {
            "question": "When was the founder of craigslist born?",
            "answer": """
Are follow up questions needed here: Yes.
Follow up: Who was the founder of craigslist?
Intermediate answer: Craigslist was founded by Craig Newmark.
Follow up: When was Craig Newmark born?
Intermediate answer: Craig Newmark was born on December 6, 1952.
So the final answer is: December 6, 1952
""",
        },
        {
            "question": "Who was the maternal grandfather of George Washington?",
            "answer": """
Are follow up questions needed here: Yes.
Follow up: Who was the mother of George Washington?
Intermediate answer: The mother of George Washington was Mary Ball Washington.
Follow up: Who was the father of Mary Ball Washington?
Intermediate answer: The father of Mary Ball Washington was Joseph Ball.
So the final answer is: Joseph Ball
""",
        },
        {
            "question": "Are both the directors of Jaws and Casino Royale from the same country?",
            "answer": """
Are follow up questions needed here: Yes.
Follow up: Who is the director of Jaws?
Intermediate Answer: The director of Jaws is Steven Spielberg.
Follow up: Where is Steven Spielberg from?
Intermediate Answer: The United States.
Follow up: Who is the director of Casino Royale?
Intermediate Answer: The director of Casino Royale is Martin Campbell.
Follow up: Where is Martin Campbell from?
Intermediate Answer: New Zealand.
So the final answer is: No
""",
        },
    ]

    # With few shot prompt template
    # - Create example prompt
    example_prompt = PromptTemplate.from_template("Question: {question}\n{answer}")
    print(example_prompt.invoke(examples[0]).to_string())
    # - Create few shot prompt
    prompt = FewShotPromptTemplate(
        examples=examples,
        example_prompt=example_prompt,
        suffix="Question: {input}",
        input_variables=["input"],
    )
    print(prompt.invoke({"input": "Who was the father of Mary Ball Washington?"}).to_string())
    # Output:
    # Question: Who lived longer, Muhammad Ali or Alan Turing?

    # Are follow up questions needed here: Yes.
    # Follow up: How old was Muhammad Ali when he died?
    # Intermediate answer: Muhammad Ali was 74 years old when he died.
    # Follow up: How old was Alan Turing when he died?
    # Intermediate answer: Alan Turing was 41 years old when he died.
    # So the final answer is: Muhammad Ali

    # Question: Who lived longer, Muhammad Ali or Alan Turing?

    # Are follow up questions needed here: Yes.
    # Follow up: How old was Muhammad Ali when he died?
    # Intermediate answer: Muhammad Ali was 74 years old when he died.
    # Follow up: How old was Alan Turing when he died?
    # Intermediate answer: Alan Turing was 41 years old when he died.
    # So the final answer is: Muhammad Ali

    # Question: When was the founder of craigslist born?

    # Are follow up questions needed here: Yes.
    # Follow up: Who was the founder of craigslist?
    # Intermediate answer: Craigslist was founded by Craig Newmark.
    # Follow up: When was Craig Newmark born?
    # Intermediate answer: Craig Newmark was born on December 6, 1952.
    # So the final answer is: December 6, 1952

    # Question: Who was the maternal grandfather of George Washington?

    # Are follow up questions needed here: Yes.
    # Follow up: Who was the mother of George Washington?
    # Intermediate answer: The mother of George Washington was Mary Ball Washington.
    # Follow up: Who was the father of Mary Ball Washington?
    # Intermediate answer: The father of Mary Ball Washington was Joseph Ball.
    # So the final answer is: Joseph Ball

    # Question: Are both the directors of Jaws and Casino Royale from the same country?

    # Are follow up questions needed here: Yes.
    # Follow up: Who is the director of Jaws?
    # Intermediate Answer: The director of Jaws is Steven Spielberg.
    # Follow up: Where is Steven Spielberg from?
    # Intermediate Answer: The United States.
    # Follow up: Who is the director of Casino Royale?
    # Intermediate Answer: The director of Casino Royale is Martin Campbell.
    # Follow up: Where is Martin Campbell from?
    # Intermediate Answer: New Zealand.
    # So the final answer is: No

    # Question: Who was the father of Mary Ball Washington?

    # --------------------------------------------------------------------------------------
    # Example use selector
    example_selector = SemanticSimilarityExampleSelector.from_examples(
        # This is the list of examples available to select from.
        examples,
        # This is the embedding class used to produce embeddings which are used to measure similarity.
        OpenAIEmbeddings(),
        # This is the VectorStore class that is used to store the embedding and do similarity search over.
        Chroma,
        # This is the number of examples to produce
        k=1
    )

    # Select the most similar example to the input.
    question = "Who was the father of Mary Ball Washington?"
    selected_example = example_selector.select_examples({"question": question})
    print(f"Examples most similar to the input: {question}")
    for example in selected_example:
        print("\n")
        for k, v in example.items():
            print(f"{k}: {v}")

    # Use few shot prompt with example selector -> prompt shorter
    prompt = FewShotPromptTemplate(
        example_selector=example_selector,
        example_prompt=example_prompt,
        suffix="Question: {input}",
        input_variables=["input"],
    )
    print(prompt.invoke({"input": "Who was the father of Mary Ball Washington?"}).to_string())

    # Output:
    # Question: Who was the maternal grandfather of George Washington?

    # Are follow up questions needed here: Yes.
    # Follow up: Who was the mother of George Washington?
    # Intermediate answer: The mother of George Washington was Mary Ball Washington.
    # Follow up: Who was the father of Mary Ball Washington?
    # Intermediate answer: The father of Mary Ball Washington was Joseph Ball.
    # So the final answer is: Joseph Ball

    # Question: Who was the father of Mary Ball Washington?