# Python 3.6
# PEP 526 - Syntax for Variable Annotations
class TestClass:
    name:str

def example_func(a: int, b: int) -> int:
    return a // b

print(TestClass.__annotations__)
# >>> {'name': <class 'str'>}

print(example_func.__annotations__)
# >>> {'a': <class 'int'>, 'b': <class 'int'>, 'return': <class 'int'>}

