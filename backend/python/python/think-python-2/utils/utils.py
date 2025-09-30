# file word: ../09-pr1-word-play/reading-word-lists/words.txt
def read_file(filename):
    """Read file by file name

        filename: path of file
    """
    return open(filename)


def make_word_list_with_dict():
    """Read file and create list words use append"""
    fin = read_file('../09-pr1-word-play/reading-word-lists/words.txt')

    # init dictionary
    list_word = {}

    for line in fin:
        word = line.strip()
        list_word[word] = 'sss'

    return list_word

def make_word_list_with_list():
    """Read file and create list words use append"""
    fin = read_file('../09-pr1-word-play/reading-word-lists/words.txt')

    list_word = []
    for line in fin:
        word = line.strip()
        list_word.append(word)

    return list_word


def invert_dict(d):
    """Inverts a dictionary, returning a map from val to a list of keys

    d: dict

    Returns: dict
    """
    inverse = {}
    for key in d:
        val = d[key]
        inverse.setdefault(val, []).append(key)
    return inverse

def remove_escape(word, escape):
    """Remove all character from escape out of the word

        word: string
    """
    for c in escape:
        if c in word:
            word = word.replace(c, '')

    return word

def subtract_set(d1, d2):
    """
    Return element in d1 but not in d2
    """
    return set(d1) - set(d2)
