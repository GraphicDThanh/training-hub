"""Exercise 6
Write a function called is_abecedarian that returns True if the letters in a word appear in alphabetical order (double letters are ok). How many abecedarian words are there?
"""
def is_abecedarian_while(word):
    """Check if a word is a abecedarian

        word: word need checking
    """
    index = 0

    while index < len(word) - 1:
        if word[index] > word[index + 1]:
            return False
        index = index + 1
    return True


def is_abecedarian_for(word):
    """Check if a word is a abecedarian

        word: word need checking
    """
    previous = word[0]

    for C in word:
        if C < previous:
            return False
        previous = C
    return True


def is_abecedarian_recursion(word):
    """Check if a word is a abecedarian

        word: word need checking
    """
    if len(word) <= 1:
        return True
    if word[0] > word[1]:
        return False
    return is_abecedarian_recursion(word[1:])


def is_abecedarian_use_enumrate(word):
    """Check if a word is a abecedarian

        word: word need checking
    """
    for i, letter in enumerate(word):
        k = i - 1
        if k < 0:
            k = 0
        if letter < word[k]:
            return False
    return True


# void execute function
def is_abecedarian_input():
    """Print number of abecedarian word """
    # Read fine word
    fin = open('words.txt')
    count = 0

    for line in fin:
        word = line.strip()
        if is_abecedarian_while(word):
        # if is_abecedarian_for(word):
        # if is_abecedarian_recursion(word):
        # if is_abecedarian_use_enumrate(word):
            count += 1
            print(word)

    print('Number of abecedarian in list is: ', count)


def main():
    """Main execute function"""
    is_abecedarian_input()


if __name__ == '__main__':
    main()
