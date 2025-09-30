import time

def make_word_list():
    """Read file and create list words use append"""
    fin = open('../09-pr1-word-play/reading-word-lists/words.txt')

    list_word = {}
    for line in fin:
        word = line.strip()
        list_word[word] = 'sss'

    fin.close()

    return list_word


def main():
    """Exercise 1    Write a function that reads the words in words.txt and stores them as keys in a dictionary. It doesn’t matter what the values are. Then you can use the in operator as a fast way to check whether a string is in the dictionary.
    If you did Exercise 10(List - chapter 10), you can compare the speed of this implementation with the list in operator and the bisection search.
    """

    list_word = make_word_list()

    start_time = time.time()
    for word in ['aa', 'alien', 'allen', 'zymurgy', 'hhh']:
        if word in list_word:
            print(word, 'in list')

    elapsed_time = time.time() - start_time
    print('elapsed_time', elapsed_time)


if __name__ == '__main__':
    main()

# Note: compare with example10 in chapter 10
# Solution: the bisection search => 0.009602785110473633
# Solution: in operator => 6.29425048828125e-05
# => in operator is much faster
