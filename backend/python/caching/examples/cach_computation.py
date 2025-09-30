import time


# Complex_computation() simulates a slow function.
# time.sleep() cause the program to pause for n seconds.
# In real life, this might be a call to a database,
# or a present to another web service
def complex_computation(a, b):
    time.sleep(.5)
    return a + b


# QUIZZ - improve complex_computation() function below
# so that it caches results after computing them
# for the first time so future calls are faster
cache = {}


def cache_computation(a, b):
    if (a, b) in cache:
        print('GO CACHE HIT')
        return cache[(a, b)]
    else:
        print('GO CACHE MISS')
        sum = complex_computation(a, b)
        cache[(a, b)] = sum
        return sum


if __name__ == 'main':
    cache_computation((1, 2))
    cache_computation((1, 2))
    cache_computation((1, 3))
