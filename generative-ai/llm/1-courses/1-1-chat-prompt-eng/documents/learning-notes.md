# [ChatGPT Prompt Engineering for Developers](https://learn.deeplearning.ai/courses/chatgpt-prompt-eng)

## IntroductionTwo types of large language models (LLMs)
- Base LLM
    - Predicts next word, based on text training data
- Instruction Tuned LLM
    - Tries to follow instructions
    - Fine-tune on instructions and good attempts at following those instructions.
    - RLHF: Reinforcement Learning with Human Feedback
    - Helpful, Honest, Harmless

## Guidelines
### Prompting Principles
Principle 1: Write clear and specific instructions
- Tactics 1: Use delimiters to clearly indicate distinct parts of the input
- Tactics 2: Ask for a structured output (HTML, JSON)
- Tactics 3: Ask the model to check whether conditions are satisfied
- Tactics 4: Few-shot prompting

Principle 2: Give the model time to think
- Tactics 1: Specify the steps to complete a task
    ```
    Step 1: …
    Step 2: …
    …
    Step N: …
    ```
- Tactics 2: Instruct the model to work out its own solution before rushing to a conclusion

### Model Limitations
- Hallucination
    - Make statements that sound plausible but are not true
- Reduce hallucinations:
    - First find relevant information
    - Then answer the question based on the relevant information

## Iterative
Iterative Prompt Development
- Idea
- Implementation (code/data) Prompt
- Experimental result
- Error Analysis

Prompt - guidelines
- Be clear and specific
- Analyze why result does not give desired output
- Refine the idea and the prompt
- Repeat

Prompt guidelines
- Be clear and specific
- Analyze why result does not give desired output
- Refine the idea and the prompt
- Repeat

Iterative Process
- Try something
- Analyze where the result does not give what you want
- Clarify instructions, give more time to think
- Refine prompts with a batch of examples

## Summarizing
- prompt 1: Summarize with a word, sentence, character limit
```python
"""
Your task is to generate a short summary of a product \
review from an ecommerce site.

Summarize the review below, delimited by triple backticks, \
in at most 20 words.

Review: ```{review}```
"""
```
- prompt 2: Summarize with a focus on shipping and delivery
```python
"""
Your task is to generate a short summary of a product \
review from an ecommerce site \
to give feedback to the Shipping department.

Summarize the review below, delimited by triple
backticks, in at most 30 words, and focusing on any aspects \
that mention shipping and delivery of the product.

Review: ```{prod_review}```
"""
```
- prompt 3: Summarize with a focus on price and value
```python
"""
Your task is to generate a short summary of a product \
review from an ecommerce site \
to give feedback to the Pricing department, \
responsible for determining the price of the product.

Summarize the review below, delimited by triple backticks, \
in at most 30 words, and focusing on any aspects that \
are relevant to the price and perceived value.

Review: ```{prod_review}```
"""
```
- prompt 4: Try "extract" instead of "summarize"
```python
"""
Your task is to extract the most important information \
from a product review from an ecommerce site \
to give feedback to the Shipping department.

From the review below, delimited by triple backticks, \
extract the information relevant to shipping and delivery. \
Limit to 30 words.

Review: ```{prod_review}```
"""
```

## Inferring
- prompt 1: Ask the model to infer the sentiment of a product review
```python
"""
What is the sentiment of the following product review,
which is delimited with triple backticks?

Review: ```{lamp_review}```
"""
```
- prompt 2: Ask the model to infer the sentiment of a product review and provide guide to answer positive/negative
```python
"""
What is the sentiment of the following product review,
which is delimited with triple backticks?

Give me your answer as a single word, either "positive" or "negative".
Review: ```{lamp_review}```
"""
```
- prompt 3: Identify types of emotions
```python
"""
Identify a list of emotions that the writer of the \
following review is expressing. Include no more than \
five items in the list. Format your answer as a lit of \
lower-case words separated by commas.

Review: ```{lamp_review}```
"""
```
- prompt 4: Identify anger
```python
"""
Is the writer of the following review expressing anger? \
The review is delimited with triple backticks. \
Give your answer as either yes or no.

Review: ```{lamp_review}```
"""
```
- prompt 5: Extract product and company name from customer reviews
```python
"""
Identify the following items from the review text:
- Item purchased by reviewer
- Company that made the item

The review is delimited with triple backticks. \
Format your response as a JSON object with \
"Item" and "Brand" as keys.
If the information isn't present, use "unknown" as the value.
Make your response as short as possible.

Review: ```{lamp_review}```
"""
```
- prompt 6: do multiple tasks
```python
"""
Identify the following items from the review text:
- Sentiment (positive/negative)
- Is the reviewer expressing anger? (true/false)
- Item purchased by reviewer
- Company that made the item

The review is delimited with triple backticks. \
Format your response as a JSON object with \
"Sentiment", "Anger", "Item", and "Brand" as keys.
If the information isn't present, use "unknown" as the value.
Make your response as short as possible.
Format the Anger value as a boolean.

Review: ```{lamp_review}```
"""
```
- prompt 7: infer topics
```python
"""
Determine five topics that are being discussed in the following text.\
which is delimited with triple backticks.

Make each item one or two words long.

Format your response as items separated by commas.

Text sample: ```{story}```
"""
```

## Transforming
- prompt 1: translation
```python
"""
Translate the following English text to Spanish: \
```Hi, I would like to order a blender```
"""
```
- prompt 2: define language
```python
"""
Tell me which language this is:
```Combien coûte le lampadaire?```
"""
```
- prompt 3: translate
```python
"""
Translate the following text to Spanish in both the \
formal and informal forms:
'Would you like to order a pillow?'
"""
```
- prompt 4: tone translation
```python
"""
Translate the following from slang to a business letter:
'Dude, This is Joe, check out this spec on this standing lamp.'
"""
```
- prompt 5: Proofread and correct
```python
"""
proofread and correct this review: ```{text}```
"""
```

## Expanding
