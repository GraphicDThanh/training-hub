import math
import string
import random
from .utils import Utils
# from .utils import Utils

class WordPlay:
    def __init__(self, filename):
        self.utils = Utils()
        self.filename = filename
        with open(self.filename, "r") as fp:
            self.lines = fp.read().split()

    def get_words_longer_than(self, num_char):
        """Print all words longer than number of character

            num_char: string
        """
        for line in self.lines:
            word = line.strip()
            if len(word) > num_char:
                print(word)
                pass


    def get_words_no_letter(self, letter):
        """Print all words has no letter and caculate percent of them in list

            letter: string
        """
        count = 0

        for line in self.lines:
            word = line.strip()
            if not letter in word:
                print(word)
                count += 1

        print('Percent of word have letter {letter} in file are: {percent} %'.format(letter=letter, percent=math.ceil(count/len(self.lines) * 100)))

    def get_number_words_not_contain_forbidden_letter(self, forbidden_letter):
        count = 0
        for line in self.lines:
            word = line.strip()
            if self.utils.is_contain_forbidden_letter(word, forbidden_letter):
                count += 1

        return count

class BookPlay():
    def __init__(self, book):
        self.book = book
        with open(self.book, "r") as book:
            self.lines = book.read().split()



def playWithWord():
    print('Play with word list in file words.txt\n')
    word_play = WordPlay('words.txt')

    # Exercise 1
    print('Print word longer than 20 characters:')
    word_play.get_words_longer_than(20)

    # Exercise 2
    print('Print word have no e:')
    word_play.get_words_no_letter('e')

    # Exercise 3
    forbidden_letter = word_play.utils.generate_word(4)
    print('Print number of word in file not contain forbidden letter "{forbidden_letter}": {count}'.format(
        forbidden_letter=forbidden_letter, count=word_play.get_number_words_not_contain_forbidden_letter(forbidden_letter)
    ))

    # Exercise 4
    word = 'comunitation'
    # available_letter = 'cmuniato'
    available_letter = word_play.utils.generate_word(8)
    print('Is "{word}" contain only letter in "{available_letter}" ? =>  {result}'.format(
        word=word,
        available_letter=available_letter,
        result=word_play.utils.uses_only(word, available_letter)
    ))

    # Exercise 5
    require_letter = 'acm'
    require_letter = word_play.utils.generate_word(3)
    print('Is "{word}" contain use all letter in "{require_letter}" ? =>  {result}'.format(
        word=word,
        require_letter=require_letter,
        result=word_play.utils.uses_all(word, require_letter)
    ))

def playWithBook():
    pass

# if __name__ == '__main__':
#     playWithWord()
#     # playWithBook()
