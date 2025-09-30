class Time:
    """Represents the time of day

    attributes: hour, minute, second
    """


def print_time(time_obj):
    """Print time object to format hour:minute:second"""
    print('Time is: %.2d:%.2d:%.2d' % (time_obj.hour, time_obj.minute, time_obj.second))


def is_after(time1, time2):
    """Check if time1 is go after time2"""
    return (time1.hour, time1.minute, time1.second) > (time2.hour, time2.minute, time2.second)


def add_time(t1, t2):
    """Add two time become one time

    t1: Time object
    t2: Time object

    returns: time object
    """
    sum = Time()
    sum.hour = t1.hour + t2.hour
    sum.minute = t1.minute + t2.minute
    sum.second = t1.second + t2.second

    if sum.second >= 60:
        sum.second -= 60
        sum.minute += 1
    if sum.minute >= 60:
        sum.minute -= 60
        sum.hour += 1

    return sum


def valid_time(time):
    """Check whether a Time object is valid

    time: Time
    returns: boolean
    """
    if time.hour < 0 or time.minute < 0 or time.second < 0:
        return False
    if time.minure > 60 or time.second > 60:
        return False
    return True


def add_time_v2(t1, t2):
    assert valid_time(t1) and valid_time(t2)
    return int_to_time(time_to_int(t1) + time_to_int(t2))


def increment(time, seconds):
    """Increment time by second
    time: time object
    second: number on second increment

    return: time object
    """
    time.second += seconds

    if time.second >= 60:
        time.second = (time.second + seconds) % 60
        print('time.second', time.second)
        time.minute += time.second // 60

    if time.minute >= 60:
        time.minute = time.minute % 60
        time.hour += time.hour // 60

    return time


def increment_v2(time, seconds):
    assert valid_time(time)
    return int_to_time(time_to_int(time) + seconds)


def time_to_int(time):
    minutes = time.hour * 60 + time.minute
    seconds = minutes * 60 + time.second
    return seconds


def int_to_time(seconds):
    time = Time()
    minutes, time.second = divmod(seconds, 60)
    time.hour, time.minute = divmod(minutes, 60)
    return time


if __name__ == '__main__':
    time = Time()
    time.hour = 11
    time.minute = 56
    time.second = 45
    print_time(time)

    time1 = Time()
    time1.hour = 9
    time1.minute = 45
    time1.second = 42

    time2 = Time()
    time2.hour = 10
    time2.minute = 11
    time2.second = 55
    print(is_after(time1, time2))

    time3 = increment(time2, 130)
    print(time3.hour, time3.minute, time3.second)

    time4 = increment_v2(time2, 130)
    print('increment_v2', time4.hour, time4.minute, time4.second)
