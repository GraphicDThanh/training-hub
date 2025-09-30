# Exercise 1
# Write a function called sed that takes as arguments a pattern string,
# a replacement string, and two filenames; it should read the first file
# and write the contents into the second file (creating it if necessary).
# If the pattern string appears anywhere in the file, it should be replaced with the replacement string.
# If an error occurs while opening, reading, writing or closing files,
# your program should catch the exception, print an error message, and exit.
# Solution: http://thinkpython2.com/code/sed.py.


def seed(pattern_string, replace_string, file1, file2):
    """
        Read first file then write content of first file to second file.
        Replace pattern by replace string

        :param pattern_string: string
        :param replace_string: string
        :param file1: string
        :param file2: string
        :return: Null
    """
    try:
        # Read file 1 content
        fin1 = open(file1)
        # Read file 2 with write permission
        fin2 = open(file2, 'w')

        # Write content file 1 to file 2
        for line in fin1:
            if pattern_string in line:
                line = line.replace(pattern_string, replace_string)
            fin2.write(line)

        fin1.close()
        fin2.close()
    except ValueError:
        print('Some thing go wrong')


def main():
    """Main execute function"""
    seed('morning', 'afternoon', 'files/text-1.txt', 'files/text-2.txt')


if __name__ == '__main__':
    main()

