# old version from book
#
# def invert_dict(d):
#     inverse = dict()
#     for key in d:
#         val = d[key]
#         if val not in inverse:
#             inverse[val] = [key]
#         else:
#             inverse[val].append(key)
#     return inverse
# Here is an example:
# >>> hist = histogram('parrot')
# >>> hist
# {'a': 1, 'p': 1, 'r': 2, 't': 1, 'o': 1}
# >>> inverse = invert_dict(hist)
# >>> inverse
# {1: ['a', 'p', 't', 'o'], 2: ['r']}


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


def histogram(s):
    """Return collection of counters of string character

        s: string
    """
    d = dict()
    for c in s:
        if c not in d:
            d[c] = 1
        else:
            d[c] += 1
    return d


def main():
    """Exercise 2
    Read the documentation of the dictionary method setdefault and use it to write a more concise version of invert_dict. Solution: http://thinkpython2.com/code/invert_dict.py.
    """
    hist = histogram('parrot')
    print('hist', hist)

    inverse = invert_dict(hist)
    for val in inverse:
        keys = inverse[val]
        print(val, keys)


if __name__ == '__main__':
    main()
