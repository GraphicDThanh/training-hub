import bisect

def make_word_list():
    """Read file and create list words use append"""
    fin = open('../09-pr1-word-play/reading-word-lists/words.txt')

    list_word = []
    for line in fin:
        word = line.strip()
        list_word.append(word)

    fin.close()

    return list_word

def in_bisect_cheat(list_words, word):
    """takes a sorted list and a target value and returns True if the word is in the list and False if it’s not
    Pre-condition: the list is sorted already

    list_words: list of string
    word: string
    """
    i = bisect.bisect_left(list_words, word)

    print('i', i)
    print('len', len(list_words))

    if i == len(list_words):
        return False

    return list_words[i] == word


def main():
    """Exercise 10
    To check whether a word is in the word list, you could use the in operator, but it would be slow because it searches through the words in order.

    Because the words are in alphabetical order, we can speed things up with a bisection search (also known as binary search), which is similar to what you do when you look a word up in the dictionary. You start in the middle and check to see whether the word you are looking for comes before the word in the middle of the list. If so, you search the first half of the list the same way. Otherwise you search the second half.

    Either way, you cut the remaining search space in half. If the word list has 113,809 words, it will take about 17 steps to find the word or conclude that it’s not there.

    Write a function called in_bisect that takes a sorted list and a target value and returns True if the word is in the list and False if it’s not.

    Or you could read the documentation of the bisect module and use that! Solution: http://thinkpython2.com/code/inlist.py.
    """
    word_list = ['aa', 'abgt', 'aken', 'alien', 'allen', 'zymurgy']
    # word_list = make_word_list()
    for word in ['aa', 'alien', 'allen', 'zymurgy', 'jjjj']:
        print(word, 'in list', in_bisect_cheat(word_list, word))


if __name__ == '__main__':
    main()
