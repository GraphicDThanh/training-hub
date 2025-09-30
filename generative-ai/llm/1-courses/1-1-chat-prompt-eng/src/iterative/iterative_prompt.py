def iterative_prompt(get_completion):
    fact_sheet_chair = """
    OVERVIEW
    - Part of a beautiful family of mid-century inspired office furniture,
    including filing cabinets, desks, bookcases, meeting tables, and more.
    - Several options of shell color and base finishes.
    - Available with plastic back and front upholstery (SWC-100)
    or full upholstery (SWC-110) in 10 fabric and 6 leather options.
    - Base finish options are: stainless steel, matte black,
    gloss white, or chrome.
    - Chair is available with or without armrests.
    - Suitable for home or business settings.
    - Qualified for contract use.

    CONSTRUCTION
    - 5-wheel plastic coated aluminum base.
    - Pneumatic chair adjust for easy raise/lower action.

    DIMENSIONS
    - WIDTH 53 CM | 20.87”
    - DEPTH 51 CM | 20.08”
    - HEIGHT 80 CM | 31.50”
    - SEAT HEIGHT 44 CM | 17.32”
    - SEAT DEPTH 41 CM | 16.14”

    OPTIONS
    - Soft or hard-floor caster options.
    - Two choices of seat foam densities:
    medium (1.8 lb/ft3) or high (2.8 lb/ft3)
    - Armless or 8 position PU armrests

    MATERIALS
    SHELL BASE GLIDER
    - Cast Aluminum with modified nylon PA6/PA66 coating.
    - Shell thickness: 10 mm.
    SEAT
    - HD36 foam

    COUNTRY OF ORIGIN
    - Italy
    """

    prompt_1 = f"""
    Your task is to help a marketing team create a
    description for a retail website of a product based
    on a technical fact sheet.

    Write a product description based on the information
    provided in the technical specifications delimited by
    triple backticks.

    Technical specifications: ```{fact_sheet_chair}```
    """
    # response = get_completion(prompt_1)
    # print(response)
    # response:
    # """
    # Introducing the SWC-100/SWC-110 Office Chair, a stylish and versatile addition to any workspace. This chair is part of a stunning collection of mid-century inspired office furniture, offering a cohesive look for your office space. With options for shell color, base finish, and upholstery type, you can customize this chair to fit your personal style.
    # Constructed with a 5-wheel plastic coated aluminum base and a pneumatic chair adjust for easy raise/lower action, this chair is both durable and functional. The dimensions of the chair are perfect for any setting, whether it be at home or in a business environment.
    # Choose between soft or hard-floor caster options, two seat foam densities, and armless or 8 position PU armrests to create the perfect chair for your needs. The materials used in this chair are of high quality, ensuring long-lasting comfort and support.
    # Made in Italy, the SWC-100/SWC-110 Office Chair combines style, functionality, and quality craftsmanship. Upgrade your workspace with this elegant and versatile chair today.
    # """

    # The response from prompt_1 is lengthy
    # Improve 1: limit the length of the response
    prompt_2 = f"""
    Your task is to help a marketing team create a
    description for a retail website of a product based
    on a technical fact sheet.

    Write a product description based on the information
    provided in the technical specifications delimited by
    triple backticks.

    Use at most 50 words.

    Technical specifications: ```{fact_sheet_chair}```
    """
    # response = get_completion(prompt_2)
    # print(response)
    # response: 48 words
    # """
    # Introducing our versatile and stylish mid-century inspired office chair. Available in a variety of colors and finishes, with options for upholstery and base style. Featuring a durable construction with adjustable height and comfortable seating options. Perfect for both home and business use. Made in Italy.
    # """

    # Improve 2: provide product id
    prompt_3 = f"""
    Your task is to help a marketing team create a
    description for a retail website of a product based
    on a technical fact sheet.

    Write a product description based on the information
    provided in the technical specifications delimited by
    triple backticks.

    At the end of the description, include every 7-character
    Product ID in the technical specification.

    Use at most 50 words.

    Technical specifications: ```{fact_sheet_chair}```
    """
    # response = get_completion(prompt_3)
    # print(response)
    # response: has Product IDs: SWC-100, SWC-110.
    # """
    # Introducing our versatile and stylish office chair, part of a mid-century inspired furniture collection. Choose from various shell colors, base finishes, and upholstery options. With a durable construction and adjustable features, this chair is perfect for any home or business setting. Product IDs: SWC-100, SWC-110.
    # """

    # Improve 3: provide product dimensions
    prompt_4 = f"""
    Your task is to help a marketing team create a
    description for a retail website of a product based
    on a technical fact sheet.

    Write a product description based on the information
    provided in the technical specifications delimited by
    triple backticks.

    At the end of the description, include every 7-character
    Product ID in the technical specification.

    After the description, include a table that gives the product's dimensions.
    The table should have two columns.
    In the first column include the name of the dimension.
    In the second column include the measurements in inches only.

    Give the table the title "Product Dimensions".
    Format everything in HTML that can be used in a website.
    Place the description in a <div> element.

    Technical specifications: ```{fact_sheet_chair}```
    """
    response = get_completion(prompt_4)
    print(response)