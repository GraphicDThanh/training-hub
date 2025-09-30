# Exercise 2
# A function object is a value you can assign to a variable or pass as an argument. For example, do_twice is a function that takes a function object as an argument and calls it twice:

# def do_twice(f):
#     f()
#     f()
# Here’s an example that uses do_twice to call a function named print_spam twice.

# def print_spam():
#     print('spam')

# do_twice(print_spam)
# Type this example into a script and test it.
# Modify do_twice so that it takes two arguments, a function object and a value, and calls the function twice, passing the value as an argument.
# Copy the definition of print_twice from earlier in this chapter to your script.
# Use the modified version of do_twice to call print_twice twice, passing 'spam' as an argument.
# Define a new function called do_four that takes a function object and a value and calls the function four times, passing the value as a parameter. There should be only two statements in the body of this function, not four.
# Solution: http://thinkpython2.com/code/do_four.py.


# Example code
def do_twice(do_func, arg):
    """Runs a function twice.

    func: function object
    arg: argument passed to the function
    """
    do_func(arg)
    do_func(arg)


def print_twice(string):
    """Print arg twice

    string: anything is printable
    """
    print(string)
    print(string)


def do_four(do_func, arg):
    """Runs a function twice.

    f: function object
    arg: argument passed to the function
    """
    do_twice(do_func, arg)
    do_twice(do_func, arg)


def main():
    """Main execute function"""
    do_twice(print_twice, 'spam')
    print('')
    do_four(print_twice, 'hello')


if __name__ == '__main__':
    main()
