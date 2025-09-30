def expanding(get_completion):
    """
    Expanding examples
    """
    # given the sentiment from the lesson on "inferring",
    # and the original customer message, customize the email
    sentiment = "negative"

    # review for a blender
    review = f"""
    So, they still had the 17 piece system on seasonal \
    sale for around $49 in the month of November, about \
    half off, but for some reason (call it price gouging) \
    around the second week of December the prices all went \
    up to about anywhere from between $70-$89 for the same \
    system. And the 11 piece system went up around $10 or \
    so in price also from the earlier sale price of $29. \
    So it looks okay, but if you look at the base, the part \
    where the blade locks into place doesn’t look as good \
    as in previous editions from a few years ago, but I \
    plan to be very gentle with it (example, I crush \
    very hard items like beans, ice, rice, etc. in the \
    blender first then pulverize them in the serving size \
    I want in the blender then switch to the whipping \
    blade for a finer flour, and use the cross cutting blade \
    first when making smoothies, then use the flat blade \
    if I need them finer/less pulpy). Special tip when making \
    smoothies, finely cut and freeze the fruits and \
    vegetables (if using spinach-lightly stew soften the \
    spinach then freeze until ready for use-and if making \
    sorbet, use a small to medium sized food processor) \
    that you plan to use that way you can avoid adding so \
    much ice if at all-when making your smoothie. \
    After about a year, the motor was making a funny noise. \
    I called customer service but the warranty expired \
    already, so I had to buy another one. FYI: The overall \
    quality has gone done in these types of products, so \
    they are kind of counting on brand recognition and \
    consumer loyalty to maintain sales. Got it in about \
    two days.
    """

    # 1. Email reply to thank the customer for their review
    prompt = f"""
    You are a customer service AI assistant. \
    Your task is to send an email reply to a valued customer. \
    Given the customer email delimited by ```, \
    Generate a reply to thank the customer for their review. \
    If the sentiment is positive or neutral, thank them for their review.
    If the sentiment is negative, apologize and suggest that \
    they can reach to customer service. \
    Make sure to use specific details from the review. \
    Write in a concise and professional tone. \
    Sign the email as `AI custom agent`. \
    Customer review: ```{review}```
    Review sentiment: {sentiment}
    """
    # response
    # Dear valued customer,

    # Thank you for taking the time to share your feedback with us.
    # We sincerely apologize for any inconvenience you experienced
    # with the pricing changes and the quality of the product.
    # Your detailed insights are truly valuable to us,
    # and we will make sure to address these issues with our team.

    # If you have any further concerns or would like to discuss this matter
    # further, please feel free to reach out to our customer service team
    # for assistance. We are here to help and ensure your satisfaction.

    # Thank you again for your review and for choosing our products.
    # We appreciate your loyalty and feedback.

    # AI Customer Agent

    # 2. Remind to use the detail from customer email


    prompt = f"""
    Identify the following items from the review text:
    - Item purchased by reviewer
    - Issue with the item purchased (if it is negative sentiment)

    The review is delimited with triple backticks. \
    Format your response as a JSON object with \
    "Item" and "Issue" as keys.
    If the information isn't present, use "unknown" as the value.
    Make your response as short as possible.

    Review: ```{review}```
    """

    prompt = f"""
    You are a customer service AI assistant. \
    Your task is to send an email reply to a valued customer. \
    Given the customer email delimited by ```, \

    Identity the following items from the customer review: \
    - Item purchased by reviewer
    - Issue with the item purchased (if it is negative sentiment)

    Generate a reply to thank the customer for their review. \
    - If the sentiment is positive or neutral, thank them for their review. \
    - If the sentiment is negative, apologize for item purchased \
        (use info you identified and put it in double quotes) \
        has issue (use info you identified and put it in double quotes) \
        and suggest that they can reach to customer service. \

    Make sure to use specific details what you can summary from the review content. \
    Write in a concise and professional tone. \
    Sign the email as `AI custom agent.`. \

    Customer review: ```{review}```
    Review sentiment: {sentiment}
    """

    response = get_completion(prompt)
    print(response)

    # response:
    # Dear valued customer,

    # Thank you for taking the time to share your feedback with us.
    # We are sorry to hear that your "17 piece system" had an issue
    # with the motor making a funny noise after about a year of use.
    # We apologize for any inconvenience this may have caused you.

    # If you have any further concerns or require assistance,
    # please do not hesitate to reach out to our customer service team.
    # We are here to help address any issues you may have.

    # Thank you once again for your review.

    # AI Customer Agent