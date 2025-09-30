# Exercise 1
# Write a definition for a class named Circle with attributes center and radius,
# where center is a Point object and radius is a number.
# Instantiate a Circle object that represents a circle
# with its center at (150, 100) and radius 75.
# Write a function named point_in_circle that takes a Circle and a Point
# and returns True if the Point lies in or on the boundary of the circle.
# Write a function named rect_in_circle that takes a Circle and a Rectangle
# and returns True if the Rectangle lies entirely in or on the boundary of the circle.
# Write a function named rect_circle_overlap that takes a Circle and a Rectangle
# and returns True if any of the corners of the Rectangle fall inside the circle.
# Or as a more challenging version, return True if any part of the Rectangle falls inside the circle.
# Solution: http://thinkpython2.com/code/Circle.py.
import math
import copy


class Point:
    """Represents a pint in 2-D space"""


class Circle:
    """Represent a circle

        attributes: center, radius
    """


class Rectangle:
    """Represents a rectangle.

        attributes: width, height, corner
    """


def point_in_circle(circle, point):
    """Check if Point lies in or on the boundary of the circle
        :param: circle: Circle object
        :param: point: Point object

        :return: Boolean
    """
    # Mathematics solution:
    # d is distance between center(Xc, Yc) and point(Xp, Yp),
    # d = sqrt((Xp - Xc)**2 + (Yp - Yc)**2)
    # Solution:
    # Point in Circle when d**2 = r**2
    # Point inside Circle when d**2 < r**2
    # Point outside Circle when d*2 > r**2
    return distance(circle.center, point) <= circle.radius


def rect_in_circle(circle, rect):
    """Check if the Rectangle lies entirely in or
       on the boundary of the circle

        :param: circle: Circle object
        :param: rect: Rectangle object

        :return Boolean
    """
    for option in option_corners_of_rect(rect).values():
        if check_all_corners_in_circle(circle, option):
            return True

    return False


def check_all_corners_in_circle(circle, corners):
    """Check if all corner in circle
        :param circle: Circle object
        :param corners: consequence of corner
        :return Boolean
    """
    for corner in corners:
        if not point_in_circle(circle, corner):
            return False
    return True


def check_at_least_a_corner_in_circle(circle, corners):
    """Check if at least  corner in circle
        :param circle: Circle object
        :param corners: consequence of corner
        :return Boolean
    """
    for corner in corners:
        if point_in_circle(circle, corner):
            return True
    return False


def rect_circle_overlap(circle, rect):
    """Check if any of the corners of the Rectangle fall inside the circle.
        :param: circle: Circle object
        :param: rect: Rectangle object
        :return Boolean
    """
    for option in option_corners_of_rect(rect).values():
        if check_at_least_a_corner_in_circle(circle, option):
            return True

    return False


# utils function
def distance(point1, point2):
    """Find distance between two points"""
    return math.sqrt((point1.x - point2.x)**2 + (point1.y - point2.y)**2)


def option_corners_of_rect(rect):
    """Find all options of rect corners
    If we know rect have width, height and one corner, it have 4 options of other corner
    # Case 1: (x, y); (x + w, y); (x, y + h); (x + w, y + h)
    # Case 2: (x, y); (x - w, y); (x, y + h); (x - w, y + h)
    # Case 3: (x, y); (x, y - h); (x + w, y); (x + w, y - h)
    # Case 4: (x, y); (x, y - h); (x - w, y); (x - w, y - h)

        :param rect: Rectangle object
        :return list of tuple of corner by Point (x, y)
    """
    options = {}
    width = rect.width
    height = rect.height
    first_corner = copy.copy(rect.corner)

    for i in range(0, 4):
        second_corner = copy.copy(first_corner)
        third_corner = copy.copy(first_corner)
        fourth_corner = copy.copy(first_corner)

        if i == 0:
            second_corner.x += width
            third_corner.y += height
        elif i == 1:
            second_corner.x -= width
            third_corner.y += height
        elif i == 2:
            second_corner.y -= height
            third_corner.x += width
        else:
            second_corner.y -= height
            third_corner.x -= width

        fourth_corner.x = second_corner.x
        fourth_corner.y = third_corner.y
        options[i] = (first_corner, second_corner, third_corner, fourth_corner)

    return options


def main():
    circle = Circle()
    center = Point()
    (center.x, center.y) = (150, 100)
    circle.center = center
    circle.radius = 75
    point = Point()
    point.x = 130
    point.y = 100

    print('--- testing point in circle ---')
    print(point_in_circle(circle, point))

    # Create a rectangle instance
    rect = Rectangle()
    rect.width = 20
    rect.height = 50

    # corner is a Point object
    corner = Point()
    corner.x = 100
    corner.y = 90
    rect.corner = corner

    print('--- testing rect in circle ---')
    print(rect_in_circle(circle, rect))

    print('--- testing if any corner of rectange inside circle ---')
    print(rect_circle_overlap(circle, rect))


if __name__ == '__main__':
    main()

