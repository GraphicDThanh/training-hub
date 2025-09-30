import time

def make_word_list():
    """Read file and create list words use append"""
    fin = open('../09-pr1-word-play/reading-word-lists/words.txt')

    list_word = []
    for line in fin:
        word = line.strip()
        list_word.append(word)

    fin.close()

    return list_word


def in_bisect(list_words, word):
    """takes a sorted list and a target value and returns True if the word is in the list and False if it’s not
    Pre-condition: the list is sorted already

    list_words: list of string
    word: string
    """
    len_list = len(list_words)

    if len_list == 0:
        return False

    i = len_list // 2

    # find out word
    if list_words[i] == word:
        return True

    if list_words[i] > word:
        # search for first half
        return in_bisect(list_words[:i], word)
    else:
        # search for second half
        return in_bisect(list_words[i+1:], word)


def main():
    """Exercise 10
    To check whether a word is in the word list, you could use the in operator, but it would be slow because it searches through the words in order.

    Because the words are in alphabetical order, we can speed things up with a bisection search (also known as binary search), which is similar to what you do when you look a word up in the dictionary. You start in the middle and check to see whether the word you are looking for comes before the word in the middle of the list. If so, you search the first half of the list the same way. Otherwise you search the second half.

    Either way, you cut the remaining search space in half. If the word list has 113,809 words, it will take about 17 steps to find the word or conclude that it’s not there.

    Write a function called in_bisect that takes a sorted list and a target value and returns True if the word is in the list and False if it’s not.

    Or you could read the documentation of the bisect module and use that! Solution: http://thinkpython2.com/code/inlist.py.
    """
    word_list = make_word_list()

    start_time = time.time()
    for word in ['aa', 'alien', 'allen', 'zymurgy', 'hhh']:
        print(word, 'in list', in_bisect(word_list, word))

    elapsed_time = time.time() - start_time

    print('elapsed_time', elapsed_time)


if __name__ == '__main__':
    main()
