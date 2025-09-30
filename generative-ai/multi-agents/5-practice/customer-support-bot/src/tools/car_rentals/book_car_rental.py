import sqlite3
from langchain_core.tools import tool


@tool
def book_car_rental(rental_id: int) -> str:
    """
    Book a car rental by its ID.

    Args:
        rental_id (int): The ID of the car rental to book.

    Returns:
        str: A message indicating whether the car rental was successfully booked or not.
    """

    conn = sqlite3.connect("travel2.sqlite")
    cursor = conn.cursor()

    cursor.execute("UPDATE car_rentals SET booked = 1 WHERE rental_id = ?", (rental_id,))
    conn.commit()

    if cursor.rowcount > 0:
        cursor.close()
        return f"Car rental with ID {rental_id} successfully booked."
    else:
        conn.close()
        return f"No car rental found with ID {rental_id}."