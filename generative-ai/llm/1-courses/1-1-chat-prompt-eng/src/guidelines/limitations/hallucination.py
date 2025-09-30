def hallucination(get_completion):
    print("Model Limitations: Hallucination")
    
    prompt = f"""
    Tell me about AeroGlide UltraSlim Smart Toothbrush by Boie
    """
    print("prompt-----------------")
    print(prompt)
    print("prompt-----------------")
    response = get_completion(prompt)
    print("response ----------------")
    print(response)
    print("response ----------------")