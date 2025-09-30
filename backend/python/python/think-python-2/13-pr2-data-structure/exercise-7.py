# Exercise 7
# Write a program that uses this algorithm to choose a random word from the book. Solution: http://thinkpython2.com/code/analyze_book3.py.

# An alternative algorithm is:

# - Use keys to get a list of the words in the book.
# - Build a list that contains the cumulative sum of the word frequencies (see Exercise 2). The last item in this list is the total number of words in the book, n.
# - Choose a random number from 1 to n. Use a bisection search (See Exercise 10) to find the index where the random number would be inserted in the cumulative sum.
# - Use the index to find the corresponding word in the word list.

from string import punctuation
import random
import bisect


def make_dict_word(filename):
    """Make a list of word from file input

        :param filename: url of file make list word
    """
    fin = open(filename, 'r')
    dict_word = dict()

    for line in fin:
        line = line.strip()

        for word in line.split():
            word = split_word_by_escape(word)
            if word:
                # Update histogram
                dict_word[word] = dict_word.get(word, 0) + 1
    return dict_word


def split_word_by_escape(word):
    """split word by escape to list word

        :param word: string
        :return: list of words
    """
    escape_string = punctuation + '“——’’0123456789'
    is_not_exist_escape = True

    word = word.lower()

    for char in escape_string:
        if char in word:
            is_not_exist_escape = False
            for word in word.split(char):
                return split_word_by_escape(word)

    if is_not_exist_escape:
        return word


def in_bisect(l, num):
    """Find index need to insert the number to list

        :param l: list of number
        :param num: number
    """
    len_list = len(l)

    if len_list == 0:
        return False

    i = len_list // 2

    # find out num
    if l[i] == num:
        return i

    if l[i] > num:
        # search for first half
        return in_bisect(l[:i], num)
    else:
        # search for second half
        return in_bisect(l[i+1:], num)


def get_random_word(d):
    """
    Get random word from the list

        :param d: a dictionary
    """
    total_freq = 0
    words = []
    freq_list = []

    # Build a list that contains the cumulative sum of the word frequencies
    for word, freq in d.items():
        total_freq += freq
        words.append(word)
        freq_list.append(total_freq)

    # Choose a random number from 1 to n
    x = random.randrange(total_freq)
    return words[bisect.bisect(freq_list, x)]


def main():
    """Main execute function"""
    # Use keys to get a list of the words in the book.
    hist = make_dict_word('./book/emma.txt')
    print(get_random_word(hist))


if __name__ == '__main__':
    main()
