import random
import string
from collections import Counter
from string import punctuation, whitespace


class Utils:
    # Group: related random
    def generate_word(self, num_letter: int):
        # Currently, code highlight with function annotation have some problem
        #   def generate_word(self, num_letter: int) -> str:
        """Generate a random word base on number of letter given

            Parameters:
            ----------
            num_letter(int): number letter in word expect

            Returns:
            -------
            string: word generated
        """
        word: str = ''

        while len(word) < num_letter:
            random_letter = random.choice(string.ascii_lowercase)
            while random_letter not in word:
                word += random_letter

        return word

    def select_and_calculate_probality_of_random_item(
            self, list_iput: [any]) -> (any, float):
        """ Do select random item from list and calculate probality of it

            Parameters:
            ----------
            list_iput(list)

            Returns:
            -------
            tuple(any, float): item selected and its probality
        """

        histogram = self.dict_item_with_frequency(list_iput)
        item_select = random.choice(list_iput)

        return item_select, \
            round(histogram[item_select] / len(list_iput) * 100, 2)

    # Group: checking
    def is_contain_forbidden_letter(self, word: str, forbidden_letter: str):
        # def is_contain_forbidden_letter
        # (self, word: str, forbidden_letter: str) -> bool:
        """Check if word contain forbidden letter

            Parameters:
            ----------
            word(str): word need checking
            forbidden_letter(str): string of forbidden letter

            Returns:
            -------
            bool: is word contain forbidden letter
        """

        for letter in word:
            if letter in forbidden_letter:
                return False

        return True

    def uses_only(self, word: str, available_letter: str):
        # def uses_only
        # (self, word: str, available_letter: str) -> bool:
        """Check word contain only available_letter

            Parameters:
            ----------
            word(str): word need checking
            available_letter(str): string of letters expect contain on word

            Returns:
            -------
            bool: is contain only available letter
        """

        for letter in word:
            if letter not in available_letter:
                return False
        return True

    def uses_all(self, word: str, required_letter: str):
        # def uses_all
        # (self, word: str, required_letter: str) -> bool:
        """Check word use all require letters

            Parameters:
            ----------
            word(str): word need checking
            required_letter(str): string of required letters

            Returns:
            -------
            bool: is contain all required letters
        """

        for letter in required_letter:
            if letter not in word:
                return False
        return True

    # Group: calculate
    def iterator_subtraction(self, iter1, iter2):
        # def iterator_subtraction
        # (self, iter1, iter2) -> {}:
        """ Subtraction of iter1 and iter2

            Parameters:
            -----------
            iter1(iteration): iterator
            iter2(iteration): iterator

            Returns:
            -------
            dict: dict of items in iter1 but not in iter2
        """

        return set(iter1) - set(iter2)

    def dict_item_with_frequency(self, list_input: []):
        """Analysis a list to item and its frequency"""

        return Counter(list_input)

    # Group: sort iteration
    def get_list_key_when_value_sorted(self, d: {}, is_reverse: bool):
        # def get_list_key_when_value_sorted
        # (self, d: {}, is_reverse: bool) -> []:
        """Sort dict by value then get list keys
            ex_dict = {'a': 1,'b': 5, 'c': 4, 'd': 7, 'e': 3}
            result: ['a', 'e', 'x', 'b', 'd']

            Parameters:
            ----------
            d(dict): target dict
            is_reverse(bool): is reverse sort attribute

            Returns:
            -------
            list: list keys result
        """

        return sorted(d, key=d.__getitem__, reverse=is_reverse)

    def get_list_value_when_key_sorted(self, d: {}, is_reverse: bool):
        # def get_list_value_when_key_sorted
        # (self, d: {}, is_reverse: bool) -> list:
        """Sort dict by key then get list value
        ex_dict = {'a': 1,'b': 5, 'c': 4, 'd': 7, 'e': 3}
        result: [1, 5, 7, 3, 4]

            Parameters:
            ----------
            d(dict): target dict

            Returns:
            -------
            list: list value result
        """

        return [value for (key, value) in sorted(d.items(), revers=is_reverse)]

    # Group: word
    def clean_word(self, word: str):
        # def clean_word(self, word: str) -> str:
        """ Clean a word by remove all whitespace
            around and punctuation in it
        """
        return word.strip(punctuation).replace(whitespace, '')

    def make_list_word(self, lines: [str]):
        # def make_list_word(self, lines: [str]) -> list:
        """Make a list of words from file input

            Paramaters:
            ----------
            lines(list(str)): lines in file

            Returns:
            --------
            list: list of words
        """

        words = []
        for line in lines:
            line = line.strip()

            for word in line.split():
                word = self.split_word_by_escape(word)
                if word:
                    words.append(word)

        return words

    def split_word_by_escape(self, word: str):
        """split word by escape

            Parameters:
            -----------
            word: string

            Returns:
            -------
            list: list of words
        """

        escape_string = punctuation + """“——’’0123456789"""
        is_not_exist_escape = True

        word = word.lower()

        for char in escape_string:
            if char in word:
                is_not_exist_escape = False
                for word in word.split(char):
                    return self.split_word_by_escape(word)

        if is_not_exist_escape:
            return word
