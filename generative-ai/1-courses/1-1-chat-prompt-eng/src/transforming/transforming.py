def transforming(get_completion):
    """
    Transforming examples
    """
    # 1. Translation
    prompt = f"""
    Translate the following English text to Spanish: \
    ```Hi, I would like to order a blender```
    """
    # response:
    # Hola, me gustaría ordenar una licuadora.

    prompt = f"""
    Tell me which language this is:
    ```Combien coûte le lampadaire?```
    """
    # response:
    # French

    prompt = f"""
    Translate the following  text to French and Spanish
    and English pirate: \
    ```I want to order a basketball```
    """
    # response:
    # French: Je veux commander un ballon de basket
    # Spanish: Quiero ordenar un balón de baloncesto
    # Pirate: I be wantin' to order a basketball

    prompt = f"""
    Translate the following text to Spanish in both the \
    formal and informal forms:
    'Would you like to order a pillow?'
    """
    # response:
    # Formal: ¿Le gustaría ordenar una almohada?
    # Informal: ¿Te gustaría ordenar una almohada?
    # response = get_completion(prompt)
    # print(response)

    # 2. Universal Translator
    # user_messages = [
    #     "La performance du système est plus lente que d'habitude.",  # System performance is slower than normal
    #     "Mi monitor tiene píxeles que no se iluminan.",              # My monitor has pixels that are not lighting
    #     "Il mio mouse non funziona",                                 # My mouse is not working
    #     "Mój klawisz Ctrl jest zepsuty",                             # My keyboard has a broken control key
    #     "我的屏幕在闪烁"                                               # My screen is flashing
    # ]
    # for issue in user_messages:
    #     prompt = f"Tell me what language this is: ```{issue}```"
    #     lang = get_completion(prompt)
    #     print(f"Original message ({lang}): {issue}")

    #     prompt = f"""
    #     Translate the following  text to English \
    #     and Korean: ```{issue}```
    #     """
    #     response = get_completion(prompt)
    #     print(response, "\n")

    # response:
    # Original message (French): La performance du système est plus lente que d'habitude.
    # English: "The system performance is slower than usual."

    # Korean: "시스템 성능이 평소보다 느립니다."

    # Original message (This is Spanish.): Mi monitor tiene píxeles que no se iluminan.
    # English: "My monitor has pixels that do not light up."

    # Korean: "내 모니터에는 빛나지 않는 픽셀이 있습니다."

    # Original message (Italian): Il mio mouse non funziona
    # English: My mouse is not working
    # Korean: 내 마우스가 작동하지 않습니다

    # Original message (This is Polish.): Mój klawisz Ctrl jest zepsuty
    # English: My Ctrl key is broken
    # Korean: 제 Ctrl 키가 고장 났어요

    # Original message (This is Chinese.): 我的屏幕在闪烁
    # English: My screen is flickering
    # Korean: 내 화면이 깜박거립니다

    # 3. Tone Transformation
    prompt = f"""
    Translate the following from slang to a business letter:
    'Dude, This is Joe, check out this spec on this standing lamp.'
    """
    # response:
    # Dear Sir/Madam,

    # I am writing to bring to your attention the specifications of the standing lamp that I have attached for your review.

    # Thank you for your time and consideration.

    # Sincerely,
    # Joe

    # 4. Format Conversion
    data_json = { "resturant employees" :[
        {"name":"Shyam", "email":"shyamjaiswal@gmail.com"},
        {"name":"Bob", "email":"bob32@gmail.com"},
        {"name":"Jai", "email":"jai87@gmail.com"}
    ]}

    prompt = f"""
    Translate the following python dictionary from JSON to an HTML \
    table with column headers and title: {data_json}
    """
    response = get_completion(prompt)
    print(response)

    # response:
    # <html>
    # <head>
    #     <title>Restaurant Employees</title>
    # </head>
    # <body>
    #     <table>
    #         <tr>
    #             <th>Name</th>
    #             <th>Email</th>
    #         </tr>
    #         <tr>
    #             <td>Shyam</td>
    #             <td>shyamjaiswal@gmail.com</td>
    #         </tr>
    #         <tr>
    #             <td>Bob</td>
    #             <td>bob32@gmail.com</td>
    #         </tr>
    #         <tr>
    #             <td>Jai</td>
    #             <td>jai87@gmail.com</td>
    #         </tr>
    #     </table>
    # </body>
    # </html>

    # 5. Spellcheck/Grammar check
    text = [
        "The girl with the black and white puppies have a ball.",  # The girl has a ball.
        "Yolanda has her notebook.", # ok
        "Its going to be a long day. Does the car need it’s oil changed?",  # Homonyms
        "Their goes my freedom. There going to bring they’re suitcases.",  # Homonyms
        "Your going to need you’re notebook.",  # Homonyms
        "That medicine effects my ability to sleep. Have you heard of the butterfly affect?", # Homonyms
        "This phrase is to cherck chatGPT for speling abilitty"  # spelling
    ]
    for t in text:
        prompt = f"""Proofread and correct the following text
        and rewrite the corrected version. If you don't find
        and errors, just say "No errors found". Don't use
        any punctuation around the text:
        ```{t}```"""
        # response = get_completion(prompt)
        # print(response)
        # print("---")

    text = f"""
    Got this for my daughter for her birthday cuz she keeps taking \
    mine from my room.  Yes, adults also like pandas too.  She takes \
    it everywhere with her, and it's super soft and cute.  One of the \
    ears is a bit lower than the other, and I don't think that was \
    designed to be asymmetrical. It's a bit small for what I paid for it \
    though. I think there might be other options that are bigger for \
    the same price.  It arrived a day earlier than expected, so I got \
    to play with it myself before I gave it to my daughter.
    """
    prompt = f"proofread and correct this review: ```{text}```"
    # response
    # Got this for my daughter for her birthday because
    # she keeps taking mine from my room.
    # Yes, adults also like pandas too.
    # She takes it everywhere with her,
    # and it's super soft and cute.
    # One of the ears is a bit lower than the other,
    # and I don't think that was designed to be asymmetrical.
    # It's a bit small for what I paid for it though.
    # I think there might be other options that are bigger for the same price.
    # It arrived a day earlier than expected,
    # so I got to play with it myself before I gave it to my daughter.
    response = get_completion(prompt)
    print(response)
