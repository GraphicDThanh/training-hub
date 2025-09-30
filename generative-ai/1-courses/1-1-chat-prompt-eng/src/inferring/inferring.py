def inferring(get_completion):
    """
    Inferring examples
    """
    lamp_review = """
    Needed a nice lamp for my bedroom, and this one had \
    additional storage and not too high of a price point. \
    Got it fast.  The string to our lamp broke during the \
    transit and the company happily sent over a new one. \
    Came within a few days as well. It was easy to put \
    together.  I had a missing part, so I contacted their \
    support and they very quickly got me the missing piece! \
    Lumina seems to me to be a great company that cares \
    about their customers and products!!
    """

    # 1. Ask the model to infer the sentiment of a product review
    prompt = f"""
    What is the sentiment of the following product review,
    which is delimited with triple backticks?

    Review: ```{lamp_review}```
    """
    # response:
    # The sentiment of the product review is positive.
    # The reviewer is satisfied with the lamp they purchased,
    # mentioning its additional storage, reasonable price,
    # fast delivery, and excellent customer service.
    # They describe the company, Lumina,
    # as caring about their customers and products.

    # 2. Ask the model to infer the sentiment of a product review
    # and provide guide to answer positive/negative
    prompt = f"""
    What is the sentiment of the following product review,
    which is delimited with triple backticks?

    Give me your answer as a single word, either "positive" or "negative".
    Review: ```{lamp_review}```
    """
    # response: positive

    # 3. Identify types of emotions
    prompt = f"""
    Identify a list of emotions that the writer of the \
    following review is expressing. Include no more than \
    five items in the list. Format your answer as a lit of \
    lower-case words separated by commas.

    Review: ```{lamp_review}```
    """
    # response: happy, satisfied, grateful, impressed, content

    # 4. Identify anger
    prompt = f"""
    Is the writer of the following review expressing anger? \
    The review is delimited with triple backticks. \
    Give your answer as either yes or no.

    Review: ```{lamp_review}```
    """
    # response: no

    # 5. Extract product and company name from customer reviews
    prompt = f"""
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
    # response:
    # {
    #     "Item": "lamp",
    #     "Brand": "Lumina"
    # }

    # 6. Do multiple tasks at once
    prompt = f"""
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
    # response:
    # {
    #     "Sentiment": "positive",
    #     "Anger": false,
    #     "Item": "lamp",
    #     "Brand": "Lumina"
    # }
    response = get_completion(prompt)
    print(response)


def inferring_topic(get_completion):
    """
    Inferring a topic
    """
    story = """
    In a recent survey conducted by the government,
    public sector employees were asked to rate their level
    of satisfaction with the department they work at.
    The results revealed that NASA was the most popular
    department with a satisfaction rating of 95%.

    One NASA employee, John Smith, commented on the findings,
    stating, "I'm not surprised that NASA came out on top.
    It's a great place to work with amazing people and
    incredible opportunities. I'm proud to be a part of
    such an innovative organization."

    The results were also welcomed by NASA's management team,
    with Director Tom Johnson stating, "We are thrilled to
    hear that our employees are satisfied with their work at NASA.
    We have a talented and dedicated team who work tirelessly
    to achieve our goals, and it's fantastic to see that their
    hard work is paying off."

    The survey also revealed that the
    Social Security Administration had the lowest satisfaction
    rating, with only 45% of employees indicating they were
    satisfied with their job. The government has pledged to
    address the concerns raised by employees in the survey and
    work towards improving job satisfaction across all departments.
    """

    # 1. Infer 5 topics
    prompt = f"""
    Determine five topics that are being discussed in the following text.\
    which is delimited with triple backticks.

    Make each item one or two words long.

    Format your response as items separated by commas.

    Text sample: ```{story}```
    """
    # response:
    # government, survey, satisfaction, NASA, Social Security Administration

    # 2. Make a news alert for certain topics
    topic_list = [
        "nasa", "local government", "engineering",
        "employee satisfaction", "federal government"
    ]
    prompt = f"""
    Determine whether each item in the following list of \
    topics is a topic in the text below, which is delimited \
    with triple backticks.

    Give your answer as follows:
    item from the list: 0 or 1

    List of topics: {", ".join(topic_list)}

    Text sample: ```{story}```
    """
    response = get_completion(prompt)
    print(response)
    topic_dict = {i.split(': ')[0]: int(i.split(': ')[1]) for i in response.split(sep='\n')}
    if topic_dict['nasa'] == 1:
        print("ALERT: New NASA story!")