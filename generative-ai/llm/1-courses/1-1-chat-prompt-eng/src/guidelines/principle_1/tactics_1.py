def principle_1_tastic_1(get_completion):
    print("Tactics 1: Use delimiters to clearly indicate distinct parts of the input")
    print('- Tripe quotes: """')
    print ("- Triple backticks: ```")
    print("- Triple dashes: ---")
    print("- Angle brackers: <>")
    print("- XML tags: <tag></tag>")
    text = f"""
        You should express what you want a model to do by \ 
        providing instructions that are as clear and \ 
        specific as you can possibly make them. \ 
        This will guide the model towards the desired output, \ 
        and reduce the chances of receiving irrelevant \ 
        or incorrect responses. Don't confuse writing a \ 
        clear prompt with writing a short prompt. \ 
        In many cases, longer prompts provide more clarity \ 
        and context for the model, which can lead to \ 
        more detailed and relevant outputs.
    """
    prompt = f"""
        Summarize the text delimited by stripe backticks \
        into a single sentence.
        ```{text}```
    """
    print("prompt-----------------")
    print(prompt)
    print("prompt-----------------")
    response = get_completion(prompt)
    print("response ----------------")
    print(response)
    print("response ----------------")