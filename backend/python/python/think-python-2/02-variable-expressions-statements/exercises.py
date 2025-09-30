import math

# Exercise 1
# Repeating my advice from the previous chapter, whenever you learn a new feature, you should try it out in interactive mode and make errors on purpose to see what goes wrong.

# We’ve seen that n = 42 is legal. What about 42 = n?
# How about x = y = 1?
# In some languages every statement ends with a semi-colon, ;. What happens if you put a semi-colon at the end of a Python statement?
# What if you put a period at the end of a statement?
# In math notation you can multiply x and y like this: x y. What happens if you try that in Python?

# Answer Exercise 1:
    # 42 = n // Err: SyntaxError: can't assign to literal
    # x = y = 1; # work
    # n = 42; # allow ;
    # n = 42, # result n is: (42,)
    # x * y # not allow like in Math, not allow x.y, just allow x * y

# Exercise 2
# Practice using the Python interpreter as a calculator:

# 1. The volume of a sphere with radius r is 4/3 π r3. What is the volume of a sphere with radius 5?
# 2. Suppose the cover price of a book is $24.95, but bookstores get a 40% discount. Shipping costs $3 for the first copy and 75 cents for each additional copy. What is the total wholesale cost for 60 copies?
# 3. If I leave my house at 6:52 am and run 1 mile at an easy pace (8:15 per mile), then 3 miles at tempo (7:12 per mile) and 1 mile at easy pace again, what time do I get home for breakfast?
def main():
    """Main execute function"""
    # Exercise 2: Using Python interpreter as a caculator
    #1:
    print('Volume of a sphere with radius is 5:', 4/3 * math.pi * math.pow(5, 3))
    #2:
    # print('price of books after discount is $:', math.ceil(24.95 * 60 * (1 - 0.4)))
    # print('price of ship:', 3 + (60 -1) * (75/100))
    print('the total wholesale cost for 60 copies is $', math.ceil(24.95 * 60 * (1 - 0.4)) + (3 + (60 -1) * (75/100)))

    #3:
    seconds = 1
    minutes = 60 * seconds
    hours = 60 * minutes

    # 6:52 am
    time_left_house = 6 * hours + 52 * minutes
    time_easy_run = 2 * 8 * minutes + 15 * seconds
    time_fast_run = 3 * 7 * minutes + 12 * seconds
    total_time_run = time_left_house + time_easy_run + time_fast_run

    hour = total_time_run // hours

    part_hour = total_time_run % hours

    minute = part_hour // minutes
    second = part_hour % minutes
    print('Time get home for breafast is: {hour} hour {minute} minutes {second} seconds'.format(hour=hour, minute=minute, second=second))


if __name__ == '__main__':
    main()
