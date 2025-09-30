# Exercise 8
# Markov analysis:

# Write a program to read a text from a file and perform Markov analysis. The result should be a dictionary that maps from prefixes to a collection of possible suffixes. The collection might be a list, tuple, or dictionary; it is up to you to make an appropriate choice. You can test your program with prefix length two, but you should write the program in a way that makes it easy to try other lengths.
# Add a function to the previous program to generate random text based on the Markov analysis. Here is an example from Emma with prefix length 2:
# He was very clever, be it sweetness or be angry, ashamed or only amused, at such a stroke. She had never thought of Hannah till you were never meant for me?" "I cannot make speeches, Emma:" he soon cut it all himself.
# For this example, I left the punctuation attached to the words. The result is almost syntactically correct, but not quite. Semantically, it almost makes sense, but not quite.

# What happens if you increase the prefix length? Does the random text make more sense?

# Once your program is working, you might want to try a mash-up: if you combine text from two or more books, the random text you generate will blend the vocabulary and phrases from the sources in interesting ways.
# Credit: This case study is based on an example from Kernighan and Pike, The Practice of Programming, Addison-Wesley, 1999.

# You should attempt this exercise before you go on; then you can can download my solution from http://thinkpython2.com/code/markov.py. You will also need http://thinkpython2.com/code/emma.txt.

import random

# global variables
suffix_map = {} # map from prefix to a list suffixes
prefix = ()     # current tuples of words


def process_file(
    filename,
    order=2
):
    """ Read file and analysis by Markov way

    :pram filename: string
          order: integer number of words in the prefix

    :return: map from prefix to list of possible suffixes
    """

    fin = open(filename)
    skip_gutenberg_header(fin)

    for line in fin:
        for word in line.rstrip().split():
            process_word(word, order)


def skip_gutenberg_header(fp):
    """ Read from fp until it finds the line that ends the header

    :param fp: file object
    """
    for line in fp:
        if line.startswith('*END*THE SMALL PRINT!'):
            break


def process_word(word, order):
    """ Handle each word

        :param word: string
        :param order: integer
    """
    # use global variable prefix
    global prefix

    if len(prefix) < order:
        prefix += (word,)
        return

    try:
        suffix_map[prefix].append(word)
    except KeyError:
        suffix_map[prefix] = [word]

    prefix = shift(prefix, word)


def random_text(n=100):
    """ Generate random words from the analyzed text
    Start with random prefix from the dictionary

    :param n: number of words to generate
    """
    # choice a random prefix
    start = random.choice(list(suffix_map.keys()))

    for i in range(n):
        suffixes = suffix_map.get(start, None)
        if suffixes == None:
            random_text(n-i)
            return
        word = random.choice(suffixes)
        print(word, end=' ')
        start = shift(start, word)


def shift(t, word):
    """ Form a new tuples by removing the head and adding word to the tail

    :param t: tuple of string
    :param word: string

    :return: tuple of strings
    """
    return t[1:] + (word,)


def main(filename='./book/emma.txt', n=100, order=2):
    try:
        n = int(n)
        order = int(order)

    except ValueError:
        print('Error')
    else:
        process_file(filename, order)
        random_text(n)
        print()


if __name__ == '__main__':
    main()
