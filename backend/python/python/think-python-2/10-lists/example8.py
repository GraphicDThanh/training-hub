import random

def has_duplicates(list_items):
    """returns True if they are anagrams
    """
    len_list = len(list_items)
    list_sorted = sorted(list_items)
    for i, value in enumerate(list_sorted):
        if i == len_list - 1:
            return False
        else:
            if value == list_items[i + 1]:
                return True


def main():
    """This exercise pertains to the so-called Birthday Paradox, which you can read about at http://en.wikipedia.org/wiki/Birthday_paradox.

    If there are 23 students in your class, what are the chances that two of you have the same birthday? You can estimate this probability by generating random samples of 23 birthdays and checking for matches. Hint: you can generate random birthdays with the randint function in the random module.

    You can download my solution from http://thinkpython2.com/code/birthday.py.
    """
    """Random birthday"""
    num_students = 23
    birthdays = []
    count = 0

    for i in range(num_students):
        birthdays.append(random.randint(1, 365))

        if (has_duplicates(birthdays)):
            count += 1
    print('Percent of duplicate birthday in 23 student: ', count / num_students * 100)


if __name__ == '__main__':
    main()

