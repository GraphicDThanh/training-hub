"""Exercise 9   Here’s another Car Talk Puzzler you can solve with a search (http://www.cartalk.com/content/puzzlers):
“Recently I had a visit with my mom and we realized that the two digits that make up my age when reversed resulted in her age. For example, if she’s 73, I’m 37. We wondered how often this has happened over the years but we got sidetracked with other topics and we never came up with an answer.
“When I got home I figured out that the digits of our ages have been reversible six times so far. I also figured out that if we’re lucky it would happen again in a few years, and if we’re really lucky it would happen one more time after that. In other words, it would have happened 8 times over all. So the question is, how old am I now?”

Write a Python program that searches for solutions to this Puzzler. Hint: you might find the string method zfill useful.
"""
def check_reverse(a, b):
    """Check a is b reverse value"""
    if a == b[::-1]:
        return True
    return False


def find_current_age():
    """Find current age of children"""
    child_current = 0

    for i in range(0, 6):
        child = str(i).zfill(2)
        parent = child[::-1]

        if (int(parent) - int(child) > 16):
            count = 1

            while int(parent) < 100:
                child = str(int(child) + 1)
                parent = str(int(parent) + 1)
                if check_reverse(child, parent):
                    print('child age', child)
                    print('parent age', parent)
                    count += 1
                    if count == 6:
                        child_current = int(child)

            if count == 8:
                print('Current age of child is: ', child_current)
                break


def main():
    """Main execute function"""
    find_current_age()


if __name__ == '__main__':
    main()




