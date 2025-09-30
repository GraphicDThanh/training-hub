def most_frequent(s):
    """Sorts the letters in s in reverse order of frequency

    s: string
    return: list of letters
    """
    hist = make_histogram(s)

    t = []

    for x, freq in hist.items():
        t.append((freq, x))

    t.sort(reverse=True)
    res = []

    for freq, x in t:
        res.append(x)

    return res


def read_file(filename):
    return open(filename).read()


def make_histogram(s):
    """Make a map from letters to number of times they appear

    s: tring
    Returns: map from letter of frequency
    """
    hist = {}
    for x in s:
        hist[x] = hist.get(x, 0) + 1
    return hist


def main():
    """Exercise 1
    Write a function called most_frequent that takes a string and prints the letters in decreasing order of frequency. Find text samples from several different languages and see how letter frequency varies between languages. Compare your results with the tables at http://en.wikipedia.org/wiki/Letter_frequencies. Solution: http://thinkpython2.com/code/most_frequent.py.
    """
    string = read_file('../09-pr1-word-play/reading-word-lists/words.txt')

    letter_seq = most_frequent(string)

    for x in letter_seq:
        print(x)


if __name__ == '__main__':
    main()
