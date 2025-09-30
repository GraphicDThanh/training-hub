from unittest import mock
from unittest.mock import call, patch, mock_open
from ..src.word import WordPlay
from nose2.tools import such, params

with such.A("Word Game:") as it:
    with it.having('a word list from words.txt file'):
        @it.has_setup
        @patch("builtins.open", mock_open(read_data="""
            hello
            hi
            good
            bye
        """))
        def setup():
            it.word_list = WordPlay('words.txt')

        @it.should('print words longer than number character')
        @patch('builtins.print')
        def test(mock_print):
            # do this can get mock open
            it.word_list.print_words_longer_than(2)
            expected_calls = [
                call('hello'),
                call('good'),
                call('bye')
            ]

            mock_print.assert_has_calls(expected_calls)

        @it.should('print list words have no letter e and percent of them in file')
        @patch('builtins.print')
        def test_print_words_longer_than_number_char(mock_print):
            it.word_list.print_words_have_no_letter('e')
            expected_calls = [
                call('hi'),
                call('good'),
                call('Percent of word have letter e in file are: 50 %')
            ]

            mock_print.assert_has_calls(expected_calls)

        @it.should('return number of word not contain forbidden letter')
        def test_return_number_words_not_have_forbidden_letter():
            it.word_list.generate_word = mock.MagicMock(return_value='abh')
            forbidden_letter = it.word_list.generate_word(3)
            assert it.word_list.get_number_words_not_contain_forbidden_letter(forbidden_letter) is 1

        @it.should('return true if word contain only letters in word generate')
        def test_print_list_words_have_no_letter_e():
            it.word_list.generate_word = mock.MagicMock(return_value='abc')
            available_letter = it.word_list.generate_word(3)
            word_random = 'abcabcabc'
            it.assertTrue(it.word_list.uses_only(word_random, available_letter))

        @it.should('return false if word not-contain only letters in word generate')
        def test_print_number_words_contain_forbidden_letter():
            it.word_list.generate_word = mock.MagicMock(return_value='abc')
            available_letter = it.word_list.generate_word(3)
            word_random = 'abcaghfgn'
            it.assertFalse(it.word_list.uses_only(word_random, available_letter))

        @it.should('return true if word not contain all letters in word generate')
        def test_word_contain_all_letters_return_true():
            it.word_list.generate_word = mock.MagicMock(return_value='abc')
            require_letter = it.word_list.generate_word(3)
            word_random = 'abcaghfgn'
            it.assertTrue(it.word_list.uses_all(word_random, require_letter))

        @it.should('return false if word not contain all letters in word generate')
        def test_word_contain_only_letters_return_false():
            it.word_list.generate_word = mock.MagicMock(return_value='abcy')
            require_letter = it.word_list.generate_word(4)
            word_random = 'abcaghfgn'
            it.assertFalse(it.word_list.uses_all(word_random, require_letter))

    it.createTests(globals())
