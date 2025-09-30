import copy
from object import Point


class Rectangle:
    """Represents a rectangle.

    attributes: width, height, corner
    """


def find_center(rect):
    """Find point center of rectangle"""
    p = Point()
    p.x = rect.corner.x + rect.width/2
    p.y = rect.corner.y + rect.height/2
    return p


def grow_rectangle(rect, d_width, d_height):
    """Grow the Rectangle and return a new Rectangle object.

    rect: Rectangle object.
    d_width: grow in x coordinate
    d_height:  in y coordinate

    returns: new Rectangle
    """
    rect.width += d_width
    rect.height += d_height


def grow_rectangle_copy(rect, d_width, d_height):
    """Grow the Rectangle by modified its width, height.

    rect: Rectangle object.
    d_width: grow in x coordinate
    d_height:  in y coordinate
    """
    # shallow copy. (grow_rect.corner is rect.corner) => True
    new_react = copy.copy(rect)
    new_react.width += d_width
    new_react.height += d_height

    return new_react


def move_rectangle(rect, dx, dy):
    """Move the Rectangle by modifying its corner object.

    rect: Rectangle object.
    dx: change in x coordinate
    dy: change in y coordinate
    """
    rect.corner.x += dx
    rect.corner.y += dy


def move_rectangle_copy(rect, dx, dy):
    """Move the Rectangle and return a new Rectangle object.

    rect: Rectangle object.
    dx: change in x coordinate
    dy: change in y coordinate

    returns: new Rectangle
    """
    new_rect = copy.deepcopy(rect)
    move_rectangle(new_rect, dx, dy)

    return new_rect


if __name__ == '__main__':
    box = Rectangle()
    box.width = 100.0
    box.height = 200.0

    box.corner = Point()
    box.corner.x = 0.0
    box.corner.y = 0.0

    center = find_center(box)
    print('center point:', center.x, center.y)

    print('after grow rectangle after mutable', box.width, box.height)
    # Grow rectangle mutable
    grow_rectangle(box, 5, 10)
    print('before grow rectangle after mutable', box.width, box.height)

    # Grow rectangle copy
    print('before grow rectangle copy', box.width, box.height)
    grow_rectangle_copy(box, 10, 20)
    print('after grow rectangle copy', box.width, box.height)

    # Move rectangle mutable
    print('before move rectangle mutable', box.corner.x, box.corner.y)
    move_rectangle(box, 5, 10)
    print('after move rectangle mutable', box.corner.x, box.corner.y)

    # Move rectangle copy
    print('before move rectangle copy', box.corner.x, box.corner.y)
    move_rectangle_copy(box, 5, 10)
    print('after move rectangle copy', box.corner.x, box.corner.y)




