# Still not finish
def has_duplicates(list_items):
    """returns True if they are anagrams"""
    for i, value in enumerate(sorted(list_items)):

        if i == len(list_items) - 1:
            return False
        else:
            if value == list_items[i + 1]:
                return True

def has_duplicate_dict(list_items):
    """find if list have duplicate"""
    d = {}
    for item in list_items:
        if item in d:
            return True
        else:
            d[item] = ''

    return False


def has_duplicate_set(list_items):
    return len(set(list_items)) < len(list_items)


def main():
    """Exercise 4
    If you did Exercise 7, you already have a function named has_duplicates that takes a list as a parameter and returns True if there is any object that appears more than once in the list.

    Use a dictionary to write a faster, simpler version of has_duplicates. Solution: http://thinkpython2.com/code/has_duplicates.py.
    """
    print(has_duplicate_dict([1, 2, 3, 1, 4]))
    print(has_duplicate_set([1, 2, 3, 4]))


if __name__ == '__main__':
    main()
