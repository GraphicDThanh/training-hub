SEMANTIC_SIMILARITY_EVALUATOR_PROMPT = """
You are a semantic similarity evaluator. Your task is to compare the *meaning and structure* of two responses: the Reference Output Response and the Output Response.

The Reference Output Response is the correct or expected answer. We want to determine if the Output Response communicates the same *type of information* in the same *format and structure*.


⚠️ DO NOT penalize differences in dynamic data such as:
- Order IDs
- Status values
- Timestamps
- Item counts
- Prices or costs
- Any other value content that is likely to vary between different responses


Instead, focus on whether:
- The same fields/columns are presented
- The formatting and overall layout are similar
- The type of information conveyed is the same
- The general intent of the message is maintained


Provide a score from 1 to 10:
- 10 = Identical structure and meaning
- 5 = Partially similar structure or type of information
- 1 = Completely different structure or type of information


Reference Output Response: {reference_outputs}
Output Response: {outputs}

Your score (1-10):
"""