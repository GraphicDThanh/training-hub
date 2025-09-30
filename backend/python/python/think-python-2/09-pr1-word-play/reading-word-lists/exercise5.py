'''
Write a function named uses_all that takes a word and a string of required letters,
and that returns True if the word uses all the required letters at least once.
How many words are there that use all the vowels aeiou? How about aeiouy?
'''
def uses_all(word, required_letter):
    """Check word use all required_letter

        word: word need checking
        letter: letter expect use in word
    """

    for letter in word:
        if letter not in required_letter:
            return False
    return True


def uses_all_input():
    """ Check word use all input from user """
    fin = open('words.txt')

    count = 0
    required_letter = input('Enter required letter: ')

    for line in fin:
        word = line.strip()
        if uses_all(word, required_letter):
            count += 1
            print(word)

    print('There is %d words that required all " %s " letters' % (count, required_letter))

    fin.close()


def main():
    """Main execute function"""
    uses_all_input()


if __name__ == '__main__':
    main()
