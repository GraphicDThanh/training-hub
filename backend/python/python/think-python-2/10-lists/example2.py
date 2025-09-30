def cumsum(list_nums):
    """returns the cumulative sum
    >>> t = [1, 2, 3]
    >>> cumsum(t)
    [1, 3, 6]
    """
    result = []

    for i, value in enumerate(list_nums):
        if i == 0:
            result.append(value)
        else:
            result.append(value + result[i - 1])

    return result


def main():
    """Excute"""
    t = [1, 2, 3, 4, 5, 6]
    print(cumsum(t))


if __name__ == '__main__':
    main()
