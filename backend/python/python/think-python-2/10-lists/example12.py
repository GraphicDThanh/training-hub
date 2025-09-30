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

    list_words: list of strings
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


def interlock(word_list, word):
    """Check if a word contain 2 interveaved words

    word_list: list of strings
    word: string
    """

    evens_word = word[::2]
    odds_word = word[1::2]

    return in_bisect(word_list, evens_word) and in_bisect(word_list, odds_word)


def general_interlock(word_list, word, n=3):
    """Check if a word contain n interveaved words

    word_list: list of strings
    word: string
    n: number of interleaved words
    """
    for i in range(n):
        inter = word[i::n]
        if not in_bisect(word_list, inter):
            return False
        return True


# Not finish yet
def main():
    """Exercise 12
    Two words “interlock” if taking alternating letters from each forms a new word. For example, “shoe” and “cold” interlock to form “schooled”. Solution: http://thinkpython2.com/code/interlock.py. Credit: This exercise is inspired by an example at http://puzzlers.org.

    Write a program that finds all pairs of words that interlock. Hint: don’t enumerate all pairs!
    Can you find any words that are three-way interlocked; that is, every third letter forms a word, starting from the first, second or third?
    """

    word_list = make_word_list()

    for word in word_list:
        if interlock(word_list, word):
            print(word, word[::2], word[1::2])
    for word in word_list:
        if general_interlock(word_list, word, 3):
            print(word, word[::3], word[1::3], word[2::3])


if __name__ == '__main__':
    main()
