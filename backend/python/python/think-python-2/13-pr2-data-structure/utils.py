from string import punctuation, whitespace


def make_list_word(fin):
    """Make a list of word from file input

        :param fin: file content input
        :return list of word in
    """
    generator_result = (word for word in (
            line.split() for line in (
                line.strip() for line in fin
            )
        )
    )
    return [item for sublist in generator_result for item in sublist]


def make_dict_word(fin):
    """Make a dit of word from file input

        :param fin: file content inputfile
        :return  dict of word and
    """

    dict_word = {}

    for line in fin:
        line = line.strip()

        for word in line.split():
            word = split_word_by_escape(word)
            if word:
                if word not in dict_word:
                    dict_word[word] = 1
                else:
                    dict_word[word] += 1

    return dict_word


def split_word_by_escape(word):
    """split word by escape to list word

        word: string
    Return: list of words
    """
    escape_string = punctuation + """“——’’0123456789"""
    is_not_exist_escape = True

    word = word.lower()

    for char in escape_string:
        if char in word:
            is_not_exist_escape = False
            for word in word.split(char):
                return split_word_by_escape(word)

    if is_not_exist_escape:
        return word


def main():
    """Execute function"""
    with open('./book/book1.txt', 'r') as fin:
        print('testing --- ', make_dict_word(fin))


if __name__ == '__main__':
    main()
