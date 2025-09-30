# Exercise 2
# Go to Project Gutenberg (http://gutenberg.org) and download your favorite out-of-copyright book in plain text format.

# Modify your program from the previous exercise to read the book you downloaded, skip over the header information at the beginning of the file, and process the rest of the words as before.

# Then modify the program to count the total number of words in the book, and the number of times each word is used.

# Print the number of different words used in the book. Compare different books by different authors, written in different eras. Which author uses the most extensive vocabulary?

# Requirement:
# 1 total number of words
# 2 number of diff words
# 3 number each time words using
# 4 compare between author about most extensive vocabulary

from collections import OrderedDict
from utils import make_dict_word


def remove_escape(word, escape):
    """Remove all character from escape out of the word

        word: string
    """
    for c in escape:
        if c in word:
            word = word.replace(c, '')

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


def print_word_top_frequency(words, num_top=0):
    """ Print top number of word most frequency

        num_top: number of word showing
        words: dictionary of words
    """
    # Inverse dict from word:cound to count:words
    reverse_dict_word = invert_dict(words)

    # reverse sort
    dict_word_sort_reverse = OrderedDict(sorted(reverse_dict_word.items(), reverse=True))

    for i, key in enumerate(dict_word_sort_reverse):
        if num_top > 0:
            if i < num_top:
                print_word_by_times(dict_word_sort_reverse[key], key)
        # Print all
        else:
            print_word_by_times(dict_word_sort_reverse[key], key)


def print_word_by_times(word, times):
    """Do print word by time"""

    if len(word) == 1:
        print(times, 'times -', word[0])
    else:
        group_word = ''
        for j, word in enumerate(word):
            if j == len(word) - 2:
                group_word += word
            else:
                group_word += word + ', '

        print(times, 'times - ', group_word, '\n')


def analysis_book(file):
    print('Do analysis book have url - ', file)
    # Make dict word from file
    dict_word = make_dict_word(file)
    print('Req 1 - total number of words: ', sum(dict_word.values()))
    print('Req 2 - total number of words different: ', len(dict_word))

    print('Req-3 - number each time words using:')
    print_word_top_frequency(dict_word)


def main():
    """Execute function"""
    with open('./book/book1.txt', 'r') as fin:
        analysis_book(fin)

    with open('./book/book2.txt', 'r') as fin:
        analysis_book(fin)


if __name__ == '__main__':
    main()
