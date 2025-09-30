from nose2.tools import such
from ..src.utils import Utils
from unittest import mock

with such.A("Utils:") as it:
    with it.having(''):
        @it.has_setup
        def setup():
            it.utils = Utils()

        with it.having('generate_word method'):
            # should change name of generate_word => actually, it generate a word with letter not duplicate
            @it.should('return a random word with given length')
            def test_generate_random_word_not_duplicate_letter():
                word = it.utils.generate_word(5)
                # not check duplicate yet
                assert len(word) is 5

        with it.having('select and calculate probality of random item method'):
            @it.should('return a random item and its probality')
            def test_return_random_item_and_its_probality():
                list_items = [1, 3, 2, 1, 4]
                # it.utils.random.choice = mock.MagicMock(return_value=3)
                item_select, probality = it.utils.select_and_calculate_probality_of_random_item(list_items)

                assert item_select in list_items

                count = 0
                for item in list_items:
                    if item == item_select:
                        count += 1

                assert probality == round(count/ len(list_items) * 100, 2)





    it.createTests(globals())
