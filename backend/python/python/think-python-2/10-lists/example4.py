def chop(list_items):
    """return new list that contain all but the first and last elements
    >>> t = [1, 2, 3, 4]
    >>> middle(t)
    [2, 3]
    """
    del list_items[0]
    del list_items[len(list_items) - 1]
    return list_items


def main():
    """Excute"""
    t = [1, 2, 3, 4]
    print(chop(t))
    print(t)


if __name__ == '__main__':
    main()
