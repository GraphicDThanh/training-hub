def principle_2_tastic_1(get_completion):
    print("Tactics 1: Specify the steps to complete a task")
    print("Step 1: ...")
    print("Step 2: ...")
    print("Step N: ...")
    
    text = f"""
        In a charming village, siblings Jack and Jill set out on \ 
        a quest to fetch water from a hilltop \ 
        well. As they climbed, singing joyfully, misfortune \ 
        struck—Jack tripped on a stone and tumbled \ 
        down the hill, with Jill following suit. \ 
        Though slightly battered, the pair returned home to \ 
        comforting embraces. Despite the mishap, \ 
        their adventurous spirits remained undimmed, and they \ 
        continued exploring with delight.
    """
    # example 1:
    prompt_1 = f"""
    Perform the following actios:
    1 - Summarize the following text delimited by triple \
    backticks with 1 sentence
    2 - Translate the summary into French
    3 - List each name in the French summary
    4 - Output a json object that contains the following \
    keys: french_summary, num_names.
    
    Separate your answers with line breaks.

    Text:
    ```{text}```
    """
    # print("prompt 1-----------------")
    # print(prompt_1)
    # print("prompt 1-----------------")
    # response = get_completion(prompt_1)
    # print("response 1----------------")
    # print(response)
    # print("response 1----------------")

    prompt_2 = f"""
    Your task is to perform the following actions: 
    1 - Summarize the following text delimited by 
    <> with 1 sentence.
    2 - Translate the summary into French.
    3 - List each name in the French summary.
    4 - Output a json object that contains the 
    following keys: french_summary, num_names.

    Use the following format:
    Text: <text to summarize>
    Summary: <summary>
    Translation: <summary translation>
    Names: <list of names in summary>
    Output JSON: <json with summary and num_names>

    Text: <{text}>
    """
    print("prompt 2-----------------")
    print(prompt_2)
    print("prompt 2-----------------")
    response = get_completion(prompt_2)
    print("response 2----------------")
    print(response)
    print("response 2----------------")