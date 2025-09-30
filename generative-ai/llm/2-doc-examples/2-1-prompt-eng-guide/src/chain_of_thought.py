from utils import get_completion

if __name__ == "__main__":
    # --- Chain-of-Thought ---
    prompt = """
    The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
    A: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.
    The odd numbers in this group add up to an even number: 17,  10, 19, 4, 8, 12, 24.
    A: Adding all the odd numbers (17, 19) gives 36. The answer is True.
    The odd numbers in this group add up to an even number: 16,  11, 14, 4, 8, 13, 24.
    A: Adding all the odd numbers (11, 13) gives 24. The answer is True.
    The odd numbers in this group add up to an even number: 17,  9, 10, 12, 13, 4, 2.
    A: Adding all the odd numbers (17, 9, 13) gives 39. The answer is False.
    The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.
    A:
    """
    # response
    # Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.

    # Example 2: fewer examples
    prompt = """
    The odd numbers in this group add up to an even number: 17,  9, 10, 12, 13, 4, 2.
    A: Adding all the odd numbers (17, 9, 13) gives 39. The answer is False.
    The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.
    A:
    """
    # response:
    # Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.

    # --- Zero-shot COT Prompt ---
    # Example: no COT
    prompt = """
    Q: A juggler can juggle 16 balls.
    Half of the balls are golf balls, and half of the golf balls are blue.
    Green balls is 1/3 of the total number of balls, and the rest are red.
    How many red balls are there?
    A: The answer (arabic numerals) is
    """
    # response: 4 --> wrong answer

    # Example Zero-shot COT
    prompt = """
    Q: A juggler can juggle 16 balls.
    Half of the balls are golf balls, and half of the golf balls are blue.
    Green balls is 1/3 of the total number of balls, and the rest are red.
    How many red balls are there?
    A: Let think step by step.
    """
    # response: correct
    # 1. Total number of balls = 16
    # 2. Half of the balls are golf balls, so there are 16/2 = 8 golf balls
    # 3. Half of the golf balls are blue, so there are 8/2 = 4 blue golf balls
    # 4. Green balls is 1/3 of the total number of balls, so there are 16/3 = 5.33 green balls (rounding up to the nearest whole number, there are 6 green balls)
    # 5. The rest of the balls are red, so to find the number of red balls, we subtract the number of blue and green balls from the total number of balls: 16 - 4 (blue) - 6 (green) = 6 red balls

    # Therefore, there are 6 red balls.

    # Example: more complicated
    prompt = """
    Q: A juggler can juggle 16 balls.
    Half of the balls are golf balls, and half of the golf balls are blue.
    Green balls is 1/3 of the total number of balls, and the rest are red and yellow.
    How many red balls are there?
    A: Let think step by step.
    """
    # response: wrong answer
    # 1. Total number of balls = 16
    # 2. Half of the balls are golf balls, so there are 16/2 = 8 golf balls
    # 3. Half of the golf balls are blue, so there are 8/2 = 4 blue golf balls
    # 4. Green balls is 1/3 of the total number of balls, so there are 16/3 = 5.33 green balls (rounding to the nearest whole number, there are 5 green balls)
    # 5. The rest of the balls are red and yellow, so the total number of red and yellow balls is 16 - 5 (green balls) = 11
    # 6. Since half of the golf balls are blue (4 balls), the remaining golf balls are red and yellow, so there are 8 - 4 = 4 red golf balls
    # 7. Therefore, there are 4 red balls in total.

    # --- Few-shot COT ---
    prompt ="""
    Q: A juggler can juggle 16 balls.
    Half of the balls are golf balls, and half of the golf balls are blue.
    Green balls is 1/3 of the total number of balls, and the rest are red and yellow with equal ratio.
    How many red balls are there?
    A: Start with 16 balls. Half of the balls are golf balls, so there are 16/2 = 8 golf balls.
    Green balls is 1/4 of the total number of balls, so there are 16/4 = 4 green balls (rounding to the nearest whole number, there are 5 green balls).
    The rest of the balls are red and yellow, so the total number of red and yellow balls is 16 - 4 (green balls) = 12.
    Red and yellow balls are in equal ratio, so there are 6 red balls for each.
    Red balls = 6

    Q: A juggler can juggle 58 balls.
    Half of the balls are golf balls, and half of the golf balls are blue.
    Green balls is 1/3 of the total number of balls, and the rest are red and yellow with red ball greater then yellow balls.
    How many yellow balls are there?
    A:
    """
    # response
    # Start with 58 balls. Half of the balls are golf balls, so there are 58/2 = 29 golf balls.
    # Green balls is 1/3 of the total number of balls, so there are 58/3 = 19.33 green balls (rounding to the nearest whole number, there are 20 green balls).
    # The rest of the balls are red and yellow, so the total number of red and yellow balls is 58 - 20 (green balls) = 38.
    # Since red balls are greater than yellow balls, let's assume there are x yellow balls and 38 - x red balls.
    # According to the assumption, x < 38 - x.
    # Solving for x, we get x < 19.
    # Therefore, there are less than 19 yellow balls.


    # --- Auto-COT ---
    prompt = """
    Q: While shopping for music online. Zoe bought 3 country albums and 5 pop albums.
    Each album came with a lyric sheet and had 3 songs. How many songs did Zoe buy total?
    A: Let's think step by step. Zoe bought 3 country albums and 5 pop albums. Each album has 3 songs.
    So, Zoe bought 3 * 3 = 9 country songs and 5 * 3 = 15 pop songs. In total, Zoe bought 9 + 15 = 24 songs.
    The answer is 24.

    Q: A chef needs to cook 9 potatoes. He has already cooked 7.
    If each potato takes 3 minutes to cook, how long does it take for the chef to finish cooking the potatoes?
    A: Let's think step by step. A chef already cooked 7 potatoes. That means it has taken him 7*3 minutes to cook for those 7 potatoes.
    That means it will take him more 3 minutes to cook each of the remaining 2 potatoes.
    So, it will take him 7*3 + 2*3 = 21 + 6 = 27 minutes to finish cooking the potatoes.
    The answer is 27.

    Q: A pet shop had 64 puppies. In one day, they sold 28 of them and put the rest in cages with each 4 in each cage.
    How many cages did they use?
    A: Let's think step by step.
    """
    response = get_completion(prompt)
    print(response)