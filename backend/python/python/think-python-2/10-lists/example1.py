def nested_sum(list_integers):
    """Return summary of all nested lists
    >>> t = [[1, 2], [3], [4, 5, 6]]
    >>> nested_sum(t)
    21
    """
    total = 0
    for nested_list in list_integers:
        for x in nested_list:
            total += x

    return total


def main():
    """Excute"""
    t = [[1, 2], [3], [4, 5, 6]]
    print(nested_sum(t))


if __name__ == '__main__':
    main()


