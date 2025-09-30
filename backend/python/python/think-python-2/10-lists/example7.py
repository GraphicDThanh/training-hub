def has_duplicates(list_items):
    """returns True if they are anagrams
    """
    for i, value in enumerate(sorted(list_items)):

        if i == len(list_items) - 1:
            return False
        else:
            if value == list_items[i + 1]:
                return True


def main():
    """Excute"""
    # list_items = [1, 3, 4, 2, 5, 1]
    list_items = [1, 3, 4, 2, 5]
    print(has_duplicates(list_items))
    print('list_items: ', list_items)


if __name__ == '__main__':
    main()
