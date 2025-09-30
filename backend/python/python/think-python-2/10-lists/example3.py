def middle(list_items):
    """return new list that contain all but the first and last elements
    >>> t = [1, 2, 3, 4]
    >>> middle(t)
    [2, 3]
    """
    return list_items[1:(len(list_items) - 1)]


def main():
    """Excute"""
    t = [1, 2, 3, 4]
    print(middle(t))
    print(t)


if __name__ == '__main__':
    main()
