import random
import string

class Utils:
    def is_contain_forbidden_letter(self, word, forbidden_letter):
        """Check if word contain forbidden letter

        word: word need checking
        forbidden_letter: list forbidden letter use to check

        return: Boolean
        """
        for letter in word:
            if letter in forbidden_letter:
                return False

        return True

    def generate_word(self, num_letter):
        """Generate a random word base on number of letter given
            num_letter: numbet

            return: word: string
        """
        word = ''

        while len(word) < num_letter:
            random_letter = random.choice(string.ascii_lowercase)
            while random_letter not in word:
                word += random_letter

        return word

    def uses_only(self, word, available_letter):
        """Check word contain only available_letter

            word: word need checking
            letter: letter expect contain on word

            return: Boolean
        """
        for letter in word:
            if letter not in available_letter:
                return False
        return True

    def uses_all(self, word, required_letter):
        """Check word use all required_letter

            word: word need checking
            letter: letter expect use in word

            return: Boolean
        """

        for letter in required_letter:
            if letter not in word:
                return False
        return True
