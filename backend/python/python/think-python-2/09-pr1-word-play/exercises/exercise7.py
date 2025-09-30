"""Exercise 7
This question is based on a Puzzler that was broadcast on the radio program Car Talk (http://www.cartalk.com/content/puzzlers):

Give me a word with three consecutive double letters. I’ll give you a couple of words that almost qualify, but don’t. For example, the word committee, c-o-m-m-i-t-t-e-e. It would be great except for the ‘i’ that sneaks in there. Or Mississippi: M-i-s-s-i-s-s-i-p-p-i. If you could take out those i’s it would work. But there is a word that has three consecutive pairs of letters and to the best of my knowledge this may be the only word. Of course there are probably 500 more but I can only think of one. What is the word?
"""
def take_out_letter(letter_take_out, word):
    """Take out all letter match from word

        letter_take_out: letter want to take out
        word: target word need take out letter
    """
    return word.replace(letter_take_out, '')


def contain_pairs_letter(word):
    """Check word contain couple pair word. For example: commttee

        word: word need checking
    """
    previous = word[0]
    count_pair = 0

    for letter in word[1:]:
        if previous == letter:
            count_pair = count_pair + 1

        previous = letter

    if count_pair > 1:
        return True
    return False


def main():
    """Main execute function"""
    print(contain_pairs_letter(take_out_letter('i', 'Mississippi')))


if __name__ == '__main__':
    main()
