def prompt_func(context: dict) -> str:
    variables: dict = context['vars']

    return [
        {
            "role": 'system',
            "content": "You're a translator. Your task is translate user input to French.",
        },
        {
            "role": 'user',
            "content": f"{variables['text']}",
        },
    ]
