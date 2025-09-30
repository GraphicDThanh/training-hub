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


def reverse_pair(word_list, word):
    """finds all the reverse pairs in the word list
    """
    reverse_word = word[::-1]

    return in_bisect(word_list, reverse_word)


def main():
    """Exercise 11
    Two words are a “reverse pair” if each is the reverse of the other. Write a program that finds all the reverse pairs in the word list. Solution: http://thinkpython2.com/code/reverse_pair.py.
    """
    word_list = make_word_list()

    for word in word_list:
        if reverse_pair(word_list, word):
            print(word, word[::-1])


if __name__ == '__main__':
    main()
