def principle_1_tastic_3(get_completion):
    print("Tactics 3: Ask the model to check whether conditions are satisfied")
    print("Check assumptions required to do the task")
    text_1 = f"""
    Making a cup of tean is easy! First, you need to get some \
    water boiling. While that's happing, \
    grab a cup and put a tea bag in it. Once the water is \
    hot enough, just pour it over the tea bag. \
    Let it sit for a bit so the tea can steep. After a \
    few minutes, take out the tea bag. If you \
    like, you can add some sugar or milk to taste. \
    And that's it! You've got yourself a delicious \
    cup of tea to enjoy.
    """
    text_2 = f"""
    The sun is shining brightly today, and the birds are \
    singing. It's a beautiful day to go for a \ 
    walk in the park. The flowers are blooming, and the \ 
    trees are swaying gently in the breeze. People \ 
    are out and about, enjoying the lovely weather. \ 
    Some are having picnics, while others are playing \ 
    games or simply relaxing on the grass. It's a \ 
    perfect day to spend time outdoors and appreciate the \ 
    beauty of nature.
    """
    prompt = f"""
        You will be provided with text delimited by tripe quotes.
        It is contains a sequence of instructions, \
        re-write those instructions in the following format:

        Step 1 - ...
        Step 2 - ...
        ...
        Step N - ...

        If the text does not contain a sequence of instructions, \
        then simply write \"No steps provided.\"

        \"\"\"{text_2}\"\"\"
    """
    print("prompt-----------------")
    print(prompt)
    print("prompt-----------------")
    response = get_completion(prompt)
    print("response ----------------")
    print(response)
    print("response ----------------")