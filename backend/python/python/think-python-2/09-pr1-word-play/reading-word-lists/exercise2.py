"""Exercise 2
In 1939 Ernest Vincent Wright published a 50,000 word novel called Gadsby that does not contain the letter “e”. Since “e” is the most common letter in English, that’s not easy to do.

In fact, it is difficult to construct a solitary thought without using that most common symbol. It is slow going at first, but with caution and hours of training you can gradually gain facility.

All right, I’ll stop now.

Write a function called has_no_e that returns True if the given word doesn’t have the letter “e” in it.

Modify your program from the previous section to print only the words that have no “e” and compute the percentage of the words in the list that have no “e”.
"""
def main():
    """Main execute function"""
    with open('words.txt', 'r') as fin:
        # Read fine word
        number_word = 0
        number_word_no_e = 0
        letter = 'e'

        for line in fin:
            number_word += 1
            word = line.strip()
            if letter not in word:
                number_word_no_e += 1
                print(line)
        print('Percent of word have no e letter in the list is: ', number_word_no_e/number_word * 100, '%')


if __name__ == '__main__':
    main()
