import random

random_attr = random.choice(('gammavariate', 'lognormvariate', 'normalvariate'))
random_func = getattr(random, random_attr)

print(f'A {random_attr} random value: {random_func(1, 1)}')
