# Python 3.x
class InvalidSalaryError(Exception):
    pass

def days_to_earn(annual_pay, amount):
    """Return number of days worked to earn `amount`."""
    try:
        annual_frac = amount / annual_pay
    except ZeroDivisionError:
        raise InvalidSalaryError("Could not calculate number of days")
    return 365 * annual_frac

class DatabaseError(Exception):
    pass
class Database():
    pass

class FileDatabase(Database):
    def __init__(self, filename):
        try:
            self.file = open(filename)
        except IOError as exc:
            raise DatabaseError('failed to open') from exc



if __name__ == '__main__':
    days_to_earn(0, 4500)
    days_to_earn(20000, 4500)

# if __name__ == '__main__':
#     FileDatabase('words.txt')
