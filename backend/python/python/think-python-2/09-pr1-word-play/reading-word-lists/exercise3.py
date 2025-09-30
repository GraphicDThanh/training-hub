"""Exercise 3
Write a function named avoids that takes a word and a string of forbidden letters, and that returns True if the word doesn’t use any of the forbidden letters.

Modify your program to prompt the user to enter a string of forbidden letters and then print the number of words that don’t contain any of them. Can you find a combination of 5 forbidden letters that excludes the smallest number of words?
"""
# Read fine word
def is_contain_forbidden_letter(word, forbidden_letter):
    """Check if word contain forbidden letter

      word: word need checking
      forbidden_letter: list forbidden letter use to check
    """
    for letter in word:
        if letter in forbidden_letter:
            return False

    return True


def avoids_input(fin):
    """Print number word contain forbidden letter and not contain forbidden letter base on user input"""
    forbidden_letter = input('Enter a forbidden letter: \n')
    count_right = 0
    count_wrong = 0

    for line in fin:
        if is_contain_forbidden_letter(line, forbidden_letter):
            count_wrong = count_wrong + 1
        else:
            count_right = count_right + 1

    print('There are %d word not contain forbidden letter: ' %count_right)
    print('There are %d word contain forbidden letter: ' %count_wrong)


def main():
    """Main execute function"""
    with open('words.txt', 'r') as fin:
        avoids_input(fin)


if __name__ == '__main__':
    main()
