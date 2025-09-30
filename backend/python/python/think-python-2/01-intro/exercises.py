
def convert_km_to_mile(x_km=0):
    """Convert km to miles

        :param x_km kilometer
        :return mile
    """
    return x_km / 1.61


def conver_time(hour=0, minute=0, second=0, type_convert='second'):
    """Convert time to one type of time

        :param(opt) hour
        :param(opt) minute
        :param(opt) second
        :param type convert
    """
    if type_convert == 'second':
        return second + minute * 60 + hour * 60 * 60
    elif type_convert == 'minute':
        return second / 60 + minute + hour * 60
    else:
        return second / 360 + minute / 60 + hour


def result_exercise():
    """Do exercise intro"""
    mile = convert_km_to_mile(10)
    second = conver_time(minute=42, second=42)
    minute = conver_time(minute=42, second=42,  type_convert='minute')
    hour = conver_time(minute=42, second=42,  type_convert='hour')
    digits = 3
    print('1. 42 mins 42 seconds is: {} s \n'.format(second))
    print('2. 10 kilometers is: {} miles \n'.format(mile))
    print('3. Run 10km in 42mins 42s, average pace is: {} mile/m, {} mile/s, {} mile/hour'.format(mile / minute, mile / second, mile / hour))
    print('{0:.{1}f} mile/m'.format(mile / minute, digits))
    print('{0:.{1}f} mile/s'.format(mile / second, digits))
    print('{0:.{1}f} mile/hour'.format(mile / hour, digits))


def main():
    """Main execute function"""
    result_exercise()


if __name__ == '__main__':
    main()
