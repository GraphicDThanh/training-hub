import unittest
from unittest import mock
from unittest.mock import call, patch
from ..practice import WordPlay

class WordPlayTest(unittest.TestCase):
    @patch("builtins.open", mock.mock_open(read_data="""
        hello
        hi
        good
        bye
    """))
    def setUp(self):
        self.word_list = WordPlay('words.txt')
        self.utils = self.word_list.utils

    @patch('builtins.print')
    def test_print_words_longer_than_number_char(self, mock_print):
        # do this can get mock open
        # word_list = WordPlay('words.txt')
        self.word_list.get_words_longer_than(2)
        expected_calls = [
            call('hello'),
            call('good'),
            call('bye')
        ]

        mock_print.assert_has_calls(expected_calls)

    @patch('builtins.print')
    def test_print_list_words_have_no_letter_e(self, mock_print):
        # word_list = WordPlay('words.txt')
        self.word_list.get_words_no_letter('e')
        expected_calls = [
            call('hi'),
            call('good'),
            call('Percent of word have letter e in file are: 50 %')
        ]

        mock_print.assert_has_calls(expected_calls)

    def test_print_number_words_contain_forbidden_letter(self):
        self.utils.generate_word = mock.MagicMock(return_value='abc')
        forbidden_letter = self.utils.generate_word(4)

        self.assertEqual(self.word_list.get_number_words_not_contain_forbidden_letter(forbidden_letter), 3)

    # Todo: write code for multi params checking this case
    def test_word_contain_only_letters_return_true(self):
        self.word_list.generate_word = mock.MagicMock(return_value='abc')
        available_letter = self.utils.generate_word(4)
        word_random = 'abcabcabc'

        self.assertTrue(self.utils.uses_only(word_random, available_letter))

    def test_word_contain_only_letters_return_false(self):
        self.word_list.generate_word = mock.MagicMock(return_value='abc')
        available_letter = self.utils.generate_word(4)
        word_random = 'abcaghfgn'

        self.assertFalse(self.utils.uses_only(word_random, available_letter))

    def test_word_contain_all_letters_return_true(self):
        self.word_list.generate_word = mock.MagicMock(return_value='abc')
        require_letter = self.utils.generate_word(3)
        word_random = 'abcaghfgn'

        self.assertTrue(self.utils.uses_all(word_random, require_letter))

    def test_word_contain_all_letters_return_false(self):
        self.word_list.generate_word = mock.MagicMock(return_value='abcy')
        require_letter = self.utils.generate_word(3)
        word_random = 'abcaghfgn'

        self.assertFalse(self.utils.uses_all(word_random, require_letter))

    # List test missing I think
    # test function generate_word
    # test function is_contain_forbidden_letter by mock
    # test raise exceptions


def suite():
    """Test suite for practice only

        return: test suite
    """
    loader = unittest.TestLoader()
    test_suite = unittest.TestSuite()
    test_suite.addTest(loader.loadTestsFromTestCase(WordPlayTest))
    return test_suite
