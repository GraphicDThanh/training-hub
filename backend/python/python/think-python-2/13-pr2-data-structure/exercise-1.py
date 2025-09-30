# Exercise 1
# Write a program that reads a file, breaks each line into words, strips whitespace and punctuation from the words, and converts them to lowercase.

# Hint: The string module provides a string named whitespace, which contains space, tab, newline, etc., and punctuation which contains the punctuation characters. Let’s see if we can make Python swear:

# import string
# string.punctuation
# '!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~'
# Also, you might consider using the string methods strip, replace and translate.


from string import punctuation, whitespace
from utils import make_list_word


def clean_word(word):
    """Clean whitespace, punctuation in word

        word: string
    """
    return word.strip(punctuation).replace(whitespace, '')


def main():
    """Execute function"""
    with open('./text.txt', 'r') as fin:
        for word in make_list_word(fin):
            print(clean_word(word))


if __name__ == '__main__':
    main()
