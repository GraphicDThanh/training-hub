# Exercise 6
# Python provides a data structure called set that provides many common set operations. You can read about them in Section 19.5, or read the documentation at http://docs.python.org/3/library/stdtypes.html#types-set.

# Write a program that uses set subtraction to find words in the book that are not in the word list. Solution: http://thinkpython2.com/code/analyze_book2.py.



def subtract(d1, d2):
    """Return element in d1 but not in d2

        :param d1 a sequence
        :param d2 a sequence
        :return a sequence
    """
    return set(d1) - set(d2)


def main():
    """Main execute function"""
    d1 = {'a': 3, 'b': 2, 'c': 1, 'd': 4}
    d2 = {'v': 4, 'b': 1, 'c': 5}
    print(subtract(d1, d2))


if __name__ == '__main__':
    main()
