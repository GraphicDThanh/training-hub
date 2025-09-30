# with number large like ackermann(5, 7), this function go error "RecursionError: maximum recursion depth exceeded in comparison""
# def ackermann(m, n):
#     if m == 0:
#         return n + 1
#     if n == 0:
#         return ackermann(m - 1, 1)
#     return ackermann(m - 1, ackermann(m, n - 1))


def ackermann(m, n):
    """Computes the Ackermann function A(m, n)

    See http://en.wikipedia.org/wiki/Ackermann_function

    n, m: non-negative integers
    """
    cache = {}
    if m == 0:
        return n + 1
    if n == 0:
        return ackermann(m - 1, 1)

    print('m:', m)
    print('n:', n)
    if (m, n) in cache:
        print('m, n in cache', cache)
        print('if m:', m)
        print('if n:', n)
        return cache[m, n]
    else:
        cache[m, n] = ackermann(m - 1, ackermann(m, n - 1))
        print('cache', cache)
        print('else m:', m)
        print('else n:', n)
        return cache[m, n]


def main():
    """Exercise 3
    Memoize the Ackermann function from Exercise 2 and see if memoization makes it possible to evaluate the function with bigger arguments. Hint: no. Solution: http://thinkpython2.com/code/ackermann_memo.py.
    """
    print(ackermann(3, 7))


if __name__ == '__main__':
    main()
