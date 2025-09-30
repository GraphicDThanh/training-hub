import math
import string
import random
from .reader import FileReader
from .utils import Utils

class WordPlay(Utils, FileReader):
    """ Play with word list

        Extends from:
        ------------
        Utils: class of utils function
        FileReader: class read file content
    """
    def __init__(self, filename):
        FileReader.__init__(self, filename)

        self.list_words: [str, ...] = self.lines

    def print_words_longer_than(self, num_char):
        """Find words longer than number of character

            Parameters
            ----------
            num_char(string): number of character compare
        """

        for line in self.list_words:
            word = line.strip()
            if len(word) > num_char:
                print(word)


    def print_words_have_no_letter(self, letter):
        """Find words has no given letter and caculate percent of them in list

            Parameters
            ----------
            letter(string): letter expect not contain in word
        """

        count = 0

        for line in self.list_words:
            word = line.strip()
            if not letter in word:
                print(word)
                count += 1

        print(f'Percent of word have letter {letter} in file are: {math.ceil(count/len(self.list_words) * 100)} %')

    def get_number_words_not_contain_forbidden_letter(self, forbidden_letter: str) -> int:
        """Count words not contain given forbidden letter and return the number

            Parameters
            ----------
            forbidden_letter: forbidden letter for checking

            Returns
            ----------
            number: number of word not contain forbidden letter
        """

        count = 0
        for line in self.list_words:
            word = line.strip()
            if self.is_contain_forbidden_letter(word, forbidden_letter):
                count += 1

        return count

def playWithWord():
    """Main function execute all exercises from chapter 9 - Play with word list"""

    print('Play with word list in file words.txt\n')
    word_play = WordPlay('words.txt')

    # Exercise 1
    print('Print word longer than 20 characters:')
    word_play.print_words_longer_than(20)

    # Exercise 2
    print('Print word have no e:')
    word_play.print_words_have_no_letter('e')

    # Exercise 3
    forbidden_letter = word_play.generate_word(4)
    print(f'Print number of word in file not contain forbidden letter "{forbidden_letter}": {word_play.get_number_words_not_contain_forbidden_letter(forbidden_letter)}')

    # Exercise 4
    word = 'comunitation'
    # available_letter = 'cmuniato'
    available_letter = word_play.generate_word(8)
    print(f'Is "{word}" contain only letter in "{available_letter}" ? =>  {word_play.uses_only(word, available_letter)}')

    # Exercise 5
    require_letter = 'acm'
    require_letter = word_play.generate_word(3)
    print(f'Is "{word}" contain use all letter in "{require_letter}" ? =>  {word_play.uses_all(word, require_letter)}')
