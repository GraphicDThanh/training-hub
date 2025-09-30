# Exercise 1
# Write a function named right_justify that takes a string named s as a parameter and prints the string with enough leading spaces so that the last letter of the string is in column 70 of the display.

# >>> right_justify('monty')
#                                                                  monty
# Hint: Use string concatenation and repetition. Also, Python provides a built-in function called len that returns the length of a string, so the value of len('monty') is 5.

def right_justify(s):
    """Add right justify for string"""
    print(' ' * 70 + s)


def main():
    """Main execute function"""
    right_justify('monty')


if __name__ == '__main__':
    main()
