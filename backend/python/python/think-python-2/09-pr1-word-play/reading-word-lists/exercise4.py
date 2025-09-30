"""Exercise 4
Write a function named uses_only that takes a word and a string of letters, and that returns True if the word contains only letters in the list. Can you make a sentence using only the letters acefhlo? Other than “Hoe alfalfa?”
"""
def uses_only(word, available_letter):
    """Check word contain only available_letter

        word: word need checking
        letter: letter expect contain on word
    """

    for letter in word:
        if letter not in available_letter:
            return False
    return True


def main():
    """Main execute function"""
    print(uses_only('thanh', 'th'))


if __name__ == '__main__':
    main()
