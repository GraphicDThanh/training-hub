"""Exercise 1
Write a program that reads words.txt
and prints only the words with more than 20 characters (not counting whitespace).
"""
def main():
    """Main execute function"""
    with open('words.txt', 'r') as fin:
        number = 20
        for word in (line.strip() for line in fin if len(line.strip()) > number):
          print(word)


if __name__ == '__main__':
    main()

