def is_sorted(list_items):
    """returns True if the list is sorted in ascending order and False otherwise
    >>> is_sorted([1, 2, 2])
    True
    >>> is_sorted(['b', 'a'])
    False
    """
    is_sort = True
    original_list = list_items[:]
    list_items.sort()
    if (original_list == list_items):
        return True

    return False


def main():
    """Excute"""
    # t = [1, 3, 2]
    t = [1, 2, 3]
    # t = ['a', 'b', 'c']
    # t = ['a', 'c', 'b']
    print(is_sorted(t))


if __name__ == '__main__':
    main()
