from .reader import FileReader
from .utils import Utils
import random
import bisect

class BookPlay(Utils, FileReader):
    def __init__(self, book, file_words_list):
        """ Play with book

            Extends from:
            ------------
            Utils: class of utils function
            FileReader: class read file content
        """

        FileReader.__init__(self, book)
        # book content
        self.book: [str] = self.lines

        FileReader.__init__(self, file_words_list)
        # list given words for checking
        self.words: [str] = self.lines

        # All words in book - after clean - duplicate
        self.book_words: [str] = self.make_list_word(self.book)

        # dict of diff word and it frequency
        self.histogram: {str: int} = self.dict_item_with_frequency(self.book_words)

        # list diff words use in book
        self.book_diff_words: [str] = [tuple_word for tuple_word in self.histogram]

        # Variable use for ex 8
        # map for curent prefix to  a list suffixes
        self.suffix_map: {(str, str): [str]} = {}
        # current tuples of words
        self.prefix: (str, str) = ()
        self.order: int = 0

    def count_word_in_book(self) -> int:
        """Count number of word in book

            Returns:
            -------
            int: number of words
        """

        return len(self.book_diff_words)

    def get_words_use_most_frequently(self, number) -> [str]:
        """Most frequently word from book

            Paramaters:
            ----------
            number(int): number of most frequency words showing

            Returns:
            -------
            list(str): list of words
        """

        return self.get_list_key_when_value_sorted(self.histogram, is_reverse=True)[:number]

    def find_word_in_book_not_in_word_list(self) -> [str]:
        """find word use in book not exist in word list file and return list of them"""

        return list(set(self.book_diff_words) - set(self.words))

    def get_random_word(self) -> str:
        """Get random word from book

            Returns:
            ----------
            str: random word in book
        """

        total_freq: int = 0
        words: [str, ...] = []
        freq_list: [int, ...] = []

        # Build a list that contains the cumulative sum of the word frequencies
        for word, freq in self.histogram.items():
            total_freq += freq
            words.append(word)
            freq_list.append(total_freq)

        # Choose a random number from 1 to n
        random_num = random.randrange(total_freq)
        return words[bisect.bisect(freq_list, random_num)]

    def process_book_with_Markov_analysis(self, order=2):
        """Make collection by Markov analysis by number of word in order

            Paramaters:
            ----------
            order(int): number of words prefix
        """

        self.order: int = order
        for word in self.book_words:
            self.process_word_with_Markov_analysis(word)

    def process_word_with_Markov_analysis(self, word):
        """process a word with Markov analysis

            Parameters:
            ----------
            word(string): work need go process
        """

        if len(self.prefix) < self.order:
            self.prefix += (word,)
            return

        try:
            self.suffix_map[self.prefix].append(word)
        except KeyError:
            self.suffix_map[self.prefix] = [word]

        self.prefix = self.shift(self.prefix, word)


    def random_words_with_markov_collection_made_from_book(self, n=100) -> [str]:
        """Make random words with Markov collection made from book

            Paramaters:
            ----------
            n(int): number of words to generate

            Returns:
            -------
            list(str): n random words select with collection rule
        """

        result: [str, ...] = []
        # choice a random prefix
        start = random.choice(list(self.suffix_map.keys()))

        for i in range(n):
            suffixes = self.suffix_map.get(start, None)
            if suffixes == None:
                self.random_words_with_markov_collection_made_from_book(n-i)
                return

            word = random.choice(suffixes)
            result.append(word)

            start = self.shift(start, word)

        return result

    def shift(self, t: (str, str), word: str) -> (str, str):
        """ Form a new tuples by removing the head and adding word to the tail

            Paramaters:
            ----------
            t(tuple(str, str)): prefix with order of string
            word(str): word need shift to prefix

            Returns:
            -------
            tuple(str, str): new prefix shift by word
        """
        return t[1:] + (word,)


def playWithBook():
    """Main function execute all exercises from chapter 13 - Select data structure"""
    print('play with book here')

    book_game = BookPlay('book.txt', 'words.txt')

    print('\nEx1: Print all word of books after  after strips white space, punctuation, convert to lower:\n')
    print(*book_game.book_words, sep=', ')

    print('\nEx2: print number of diff word used in book: ', book_game.count_word_in_book())

    print('\nEx3: print 20 most frequently used are: ')
    print(*book_game.get_words_use_most_frequently(20), sep=', ')

    print('\nEx4,6: print all words use in book but not belong to words list(words.txt):')
    print(*book_game.find_word_in_book_not_in_word_list(), sep=', ')

    select_word, probality = book_game.select_and_calculate_probality_of_random_item(book_game.book_words)
    print(f'\nEx5 Probality of random word "{select_word}" in list is {probality}')

    print('\nEx7: print random word: ', book_game.get_random_word())

    print('\nEx8: Generate random paragraph by Makov analysis:\n')
    book_game.process_book_with_Markov_analysis(order=2)
    print(*book_game.random_words_with_markov_collection_made_from_book(n=100), sep=' ')

