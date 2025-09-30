# Exercise 4
# Modify the previous program to read a word list (see Section 9.1) and then print all the words in the book that are not in the word list. How many of them are typos? How many of them are common words that should be in the word list, and how many of them are really obscure?

from string import punctuation, whitespace
from operator import itemgetter
from collections import OrderedDict

def create_list_word():
    """Read file and create list words use append"""
    fin = open('../09-pr1-word-play/reading-word-lists/words.txt')

    list_word = []
    for line in fin:
        word = line.strip()
        list_word.append(word)

    fin.close()
    return list_word

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
    escape_string = punctuation + '“——’’0123456789'
    is_not_exist_escape = True

    word = word.lower()

    for char in escape_string:
        if char in word:
            is_not_exist_escape = False
            for word in word.split(char):
                return split_word_by_escape(word)

    if is_not_exist_escape:
        return word

def subtract(d1, d2):
    result = dict()

    for key in d1:
        if key not in d2:
            result[key] = None

    return result
def subtract_set(d1, d2):
    """Return element in d1 but not in d2"""
    return set(d1) - set(d2)

def main():
    """Main execute function"""
    word_list = create_list_word()
    dict_word_of_book = make_dict_word('./book/emma.txt')

    result = subtract(dict_word_of_book, word_list).keys()

    # ex 6 use set instead
    # result = subtract_set(dict_word_of_book, word_list)
    print('all the words in the book that are not in the word list are: ', result)


if __name__ == '__main__':
    main()
