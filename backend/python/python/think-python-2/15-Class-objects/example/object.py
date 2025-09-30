import math


class Point:
    """Represents a pint in 2-D space"""


def print_point(p):
    print('(%g %g)' % (p.x, p.y))


def distance_between_points(p1, p2):
    """Compute the distance between two Point objects

    p1: Point
    p2: Point

    returns: float
    """
    dx = p1.x - p2.x
    dy = p1.y - p2.y

    dist = math.sqrt(dx**2 + dy**2)
    return dist


if __name__ == '__main__':
    point1 = Point()
    point1.x = 3.0
    point1.y = 4.0
    print_point(point1)

    point2 = Point()
    point2.x = 5.0
    point2.y = 6.0

    distance_between_points(point1, point2)
