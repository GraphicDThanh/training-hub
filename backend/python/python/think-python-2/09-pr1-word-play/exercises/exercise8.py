"""Exercise 8   Here’s another Car Talk Puzzler (http://www.cartalk.com/content/puzzlers):
“I was driving on the highway the other day and I happened to notice my odometer. Like most odometers, it shows six digits, in whole miles only. So, if my car had 300,000 miles, for example, I’d see 3-0-0-0-0-0.
“Now, what I saw that day was very interesting. I noticed that the last 4 digits were palindromic; that is, they read the same forward as backward. For example, 5-4-4-5 is a palindrome, so my odometer could have read 3-1-5-4-4-5.

“One mile later, the last 5 numbers were palindromic. For example, it could have read 3-6-5-4-5-6. One mile after that, the middle 4 out of 6 numbers were palindromic. And you ready for this? One mile later, all 6 were palindromic!

“The question is, what was on the odometer when I first looked?”
"""
def is_palindromic(word):
    """Check a word is a palindromic

        word: word need checking
    """
    begin = 0
    end = len(word) - begin - 1

    while begin < end:
        if word[begin] != word[end]:
            return False

        begin += 1
        end -= 1
    return True


def number_first_see():
    for i in range(0, 1000000):
        str_num = str(i)
        str_num_after_i = str(i + 1)
        str_num_after_i_plus_one = str(i + 2)

        if len(str_num_after_i_plus_one) == 6 and is_palindromic(str_num[2:]) and is_palindromic(str_num_after_i[1:]) and is_palindromic(str_num_after_i_plus_one):
            print(i)


def main():
    """Main execute function"""
    number_first_see()


if __name__ == '__main__':
    main()
