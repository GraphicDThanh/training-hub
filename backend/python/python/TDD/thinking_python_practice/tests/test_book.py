from unittest import mock
from unittest.mock import call, patch, mock_open
from nose2.tools import such, params
import random

from ..src.word import WordPlay
from ..src.book import BookPlay
from thinking_python_practice.src import book

with such.A("Book Game:") as it:
    with it.having('file book and words list'):
        @it.has_setup
        @patch('builtins.open', mock_open(read_data="""
            thanks for  good  reading
            good luck !! to you >
            love you, good jobbb!, thanks
        """))
        def setup():
            it.book = BookPlay('book.txt', 'words.txt')


        @it.should('return list word after strips white space, punctuation, convert to lower')
        def test_return_list_words_in_book_after_clean():
            assert it.book.book_words == ['thanks', 'for', 'good', 'reading', 'good', 'luck', 'to', 'you', 'love', 'you', 'good', 'jobbb', 'thanks']

        @it.should('return number of diff words in book')
        def test_count_number_of_diff_word_in_book():
            assert it.book.count_word_in_book() is 9

        @it.should('return list of top word use most frequently')
        def test_return_list_words_use_most_frequently():
            assert it.book.get_words_use_most_frequently(3) == ['good', 'thanks', 'you']

        @it.should('return list word use book not in word list')
        def test_return_list_word_in_book_not_have_in_word_list():
            assert it.book.find_word_in_book_not_in_word_list() == ['jobbb']

        @it.should('return probality of word in list word of book')
        def test_return_probality_of_word_in_list_word_of_book():
            word_select, probality = it.book.select_and_calculate_probality_of_random_item(it.book.book_words)

            calculate_probality = round(it.book.histogram[word_select] / len(it.book.book_words) * 100, 2)

            assert word_select in it.book.book_diff_words
            assert probality == calculate_probality

        @it.should('choice random word in book and return it')
        def test_choice_random_word_in_book():
            word_select = it.book.get_random_word()
            assert word_select in it.book.book_diff_words



        with it.having('list suffix map and save current prefix'):
            @it.should('create collection with Markov analysis - random select item in collection should belong to list')
            def test_create_collection_with_markov_analysis():
                it.book.process_book_with_Markov_analysis(2)

                (prefix, suffixes) = random.choice(list(it.book.suffix_map.items()))

                book_content = ' '.join(word for word in it.book.book_words)
                group_prefix = ' '.join(item for item in prefix)
                # test group of prefix belong to book
                assert group_prefix in book_content

                for suffix in suffixes:
                    assert group_prefix + ' ' + suffix in book_content

            @it.should('test generate random paragraph base on collection of Markov analysis')
            def test_generate_random_paragraph_by_markov_collection():
                it.book.process_book_with_Markov_analysis(2)

                result = it.book.random_words_with_markov_collection_made_from_book(10)

                assert len(result) is 10


            with it.having('have util function help on generate random paragraph'):
                @it.should('shift new word with current tuple of string')
                def test_shift_new_word():
                    assert it.book.shift(('a', 'b'), 'c') == ('b', 'c')

                @it.should('return prefix when current prefix still smaller then order required - case empty prefix tuple')
                def test_process_a_word_init_case1():
                    it.book.suffix_map = {}
                    it.book.prefix = ()
                    it.book.order = 2

                    it.book.process_word_with_Markov_analysis('a')

                    assert it.book.prefix == ('a',)
                    assert it.book.suffix_map == {}

                @it.should('return prefix when current prefix still smaller then order required - case have prefix tuple')
                def test_process_a_word_init_case2():
                    it.book.suffix_map = {}
                    it.book.prefix = ('a',)
                    it.book.order = 2

                    it.book.process_word_with_Markov_analysis('b')

                    assert it.book.prefix == ('a', 'b')
                    assert it.book.suffix_map == {}

                @it.should('set new key-value in suffix map when key-value of prefix not exist in map suffix yet')
                def test_add_new_pair_to_suffix_map():
                    it.book.suffix_map = {}
                    it.book.prefix = ('a', 'b')
                    it.book.process_word_with_Markov_analysis('c')

                    assert it.book.suffix_map == {
                        ('a', 'b'): ['c']
                    }

                    assert it.book.prefix == ('b', 'c')

                @it.should('add new word to key-value of prefix exist in map suffix already')
                def test_append_word_to_exist_pair_of_suffix_map():
                    it.book.suffix_map = {
                        ('a', 'b'): ['c']
                    }
                    it.book.prefix = ('a', 'b')
                    it.book.process_word_with_Markov_analysis('d')

                    assert it.book.suffix_map == {
                        ('a', 'b'): ['c', 'd']
                    }

                    assert it.book.prefix == ('b', 'd')

    it.createTests(globals())
