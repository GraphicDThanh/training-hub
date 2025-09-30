# Exercise 5
# Write a function named choose_from_hist that takes a histogram as defined in Section 11.2 and returns a random value from the histogram, chosen with probability in proportion to frequency. For example, for this histogram:

# >>> t = ['a', 'a', 'b']
# >>> hist = histogram(t)
# >>> hist
# {'a': 2, 'b': 1}
# your function should return 'a' with probability 2/3 and 'b' with probability 1/3.

import random


def histogram(s):
    """Make a dictionary as a collection of counters
        :param s: string
        :return: dict
    """
    d = dict()
    for c in s:
        if c not in d:
            d[c] = 1
        else:
            d[c] += 1
    return d


def choose_from_hist(t):
    """Return a random value from the histogram"""
    hist = histogram(t)
    random_el = random.choice(list(hist))
    probability_of_random_el = hist[random_el] / len(t)

    print('Random element is: ', random_el, 'with probability of it is: ', probability_of_random_el)


def main():
    """Main function execute"""
    t = ['a', 'a', 'b', 'v', 'c', 'd', 'b']
    choose_from_hist(t)


if __name__ == '__main__':
    main()
