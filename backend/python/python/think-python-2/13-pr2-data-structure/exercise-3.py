# Exercise 3
# Modify the program from the previous exercise to print the 20 most frequently used words in the book.

from string import punctuation, whitespace
from operator import itemgetter
from collections import OrderedDict


def remove_escape(word, escape):
    """Remove all character from escape out of the word

        word: string
    """
    for c in escape:
        if c in word:
            word = word.replace(c, '')

    return word


def make_dict_word(filename):
    """Make a list of word from file input

        filename: url of file make list word
    """
    fin = open(filename, 'r')
    dict_word = {}

    for line in fin:
        line = line.strip()

        for word in line.split():
            word = split_word_by_escape(word)
            if word:
                if word not in dict_word:
                    dict_word[word] = 1
                else:
                    dict_word[word] += 1
    return dict_word


def split_word_by_escape(word):
    """split word by escape to list word

        word: string
    Return: list of words
    """
    escape_string = punctuation + '——’’0123456789'
    is_not_exist_escape = True

    word = word.lower()

    for char in escape_string:
        if char in word:
            is_not_exist_escape = False
            for word in word.split(char):
                return split_word_by_escape(word)

    if is_not_exist_escape:
        return word


def invert_dict(d):
    """Inverts a dictionary, returning a map from val to a list of keys

    d: dict

    Returns: dict
    """
    inverse = {}
    for key in d:
        val = d[key]
        inverse.setdefault(val, []).append(key)
    return inverse


def print_word_top_frequency(num_top, words):
    """ Print top number of word most frequency

        num_top: number of word showing
        words: dictionary of words
    """
    # Inverse dict from word:cound to count:words
    reverse_dict_word = invert_dict(words)

    # reverse sort
    dict_word_sort_reverse = OrderedDict(sorted(reverse_dict_word.items(), reverse=True))
    # dict_word_sort_reverse = sorted(reverse_dict_word.items(), reverse=True)

    print(type(dict_word_sort_reverse))
    for i, key in enumerate(dict_word_sort_reverse):
        print(i, type(i))
        print(key, type(key))
        print('-----')
        if num_top != None:
            if i < num_top:
                print_word_by_times(dict_word_sort_reverse[key], key)
        # Print all
        else:
            print_word_by_times(dict_word_sort_reverse[key], key)


def print_word_by_times(word, times):
    """Do print word by time"""

    if len(word) == 1:
        pass
        # print(times, 'times -', word[0])
    else:
        group_word = ''
        for j, word in enumerate(word):
            if j == len(word) - 2:
                group_word += word
            else:
                group_word += word + ', '

        print(times, 'times - ', group_word, '\n')


def top_frequency_word(book, number = 10):
    """Print top frequency word of book

        book: book url
        number: number of top
    """

    print('Do analysis book have url - ', book)
    # Make dict word from file
    dict_word = make_dict_word(book)

    print('Top %d frequency words in book are:' %number)

    print_word_top_frequency(number, dict_word)


def main():
    """Execute function"""
    top = 20
    # top_frequency_word('./book/book1.txt', top)
    top_frequency_word('./book/emma.txt', top)


if __name__ == '__main__':
    main()
