import sqlite3
from typing import Optional
from langchain_core.tools import tool

@tool
def book_excursion(recommendation_id: int) -> str:
    """
    Book an excursion by its ID.

    Args:
        recommendation_id (int): The ID of the trip recommendation to book.

    Returns:
        str: A message indicating whether the trip recommendation was successfully booked or not.
    """
    conn = sqlite3.connect("travel2.sqlite")
    cursor = conn.cursor()

    cursor.execute("UPDATE recommendations SET booked = 1 WHERE id = ?", (recommendation_id,))
    conn.commit()

    if cursor.rowcount > 0:
        cursor.close()
        return f"Trip recommendation {recommendation_id} successfully booked."
    else:
        conn.close()
        return f"No trip recommendation found with ID {recommendation_id}."

