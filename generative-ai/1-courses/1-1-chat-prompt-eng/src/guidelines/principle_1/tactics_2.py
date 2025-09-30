def principle_1_tastic_2(get_completion):
    print("Tactics 2: Ask for a structured output (HTML, JSON)")
    prompt = f"""
        Generate a list of three made-up books titles along \
        with their authors and genres.
        Provide them in JSON format with the following keys:
        book_id, title, author, genre.
    """
    print("prompt-----------------")
    print(prompt)
    print("prompt-----------------")
    response = get_completion(prompt)
    print("response ----------------")
    print(response)
    print("response ----------------")

