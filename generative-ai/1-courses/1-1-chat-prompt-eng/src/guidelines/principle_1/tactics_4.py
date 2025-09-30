def principle_1_tastic_4(get_completion):
    print("Tactics 4: Few-shot prompting")
    print("Give successful examples of completing tasks. Then ask model to perform the task")
    prompt = f"""
        Your task is to answer in a consistent style.

        <child>: Teach me about patience

        <grandparent>: The river that carves the deeptest \
        valley flows from a modest spring; the \
        grandest symphony originates from a single note; \
        the most intricate tapestry begins with a solitary thread.

        <child>: Teach me about resilience.
    """
    print("prompt-----------------")
    print(prompt)
    print("prompt-----------------")
    response = get_completion(prompt)
    print("response ----------------")
    print(response)
    print("response ----------------")