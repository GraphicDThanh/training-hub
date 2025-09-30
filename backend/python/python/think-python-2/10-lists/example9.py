import time


def create_list_word_by_append():
    """Read file and create list words use append"""
    fin = open('../09-pr1-word-play/reading-word-lists/words.txt')

    list_word = []
    for line in fin:
        word = line.strip()
        list_word.append(word)

    # fin.close()

    return list_word


def create_list_word_by_plus_operator():
    """Read file and create list words use + operator"""
    fin = open('../09-pr1-word-play/reading-word-lists/words.txt')

    list_word = []
    for line in fin:
        word = line.strip()
        list_word = list_word + [word]

    # fin.close()
    return list_word


def main():
    """Exercise 9
    Write a function that reads the file words.txt and builds a list with one element per word. Write two versions of this function, one using the append method and the other using the idiom t = t + [x]. Which one takes longer to run? Why?
    Solution: http://thinkpython2.com/code/wordlist.py.
    """

    start_time = time.time()
    result = create_list_word_by_append()
    elapsed_time = time.time() - start_time

    print('len list 1: ', len(result))
    print(result[:10])
    print(elapsed_time, 'seconds')

    start_time = time.time()
    result = create_list_word_by_plus_operator()
    elapsed_time = time.time() - start_time

    print('len list 2: ', len(result))
    print(result[:10])
    print(elapsed_time, 'seconds')


if __name__ == '__main__':
    main()

# Summary: append is work much paster than operator plus because
# append: add new element to the end of the list
# plus operator will create a new result list each time. So, it will slower

# If we change t = t + [x] to t += [x], the result is will closer. Because t += [x] will like t.append([x-])
