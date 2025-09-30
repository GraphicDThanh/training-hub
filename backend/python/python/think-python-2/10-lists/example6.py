def is_anagram(str1, str2):
    """returns True if they are anagrams
    """
    if sorted(str1) == sorted(str2):
        return True
    return False


def main():
    """Excute"""
    str1 = 'dad'
    str2 = 'bad'
    # str1 = 'listen'
    # str2 = 'silent'
    print(is_anagram(str1, str2))


if __name__ == '__main__':
    main()
