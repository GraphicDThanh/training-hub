import sqlite3
from typing import Optional, Union
from datetime import date, datetime
from langchain_core.tools import tool


@tool
def search_hotels(
    location: Optional[str] = None,
    name: Optional[str] = None,
    price_tier: Optional[str] = None,
    checkin_date: Optional[Union[date, datetime]] = None,
    checkout_date: Optional[Union[date, datetime]] = None,
) -> list[dict]:
    """
    Search for hotels based on location, name, price tier, check-in date, and check-out date.

    Args:
        location (Optional[str]): The location of the hotel. Defaults to None.
        name (Optional[str]): The name of the hotel. Defaults to None.
        price_tier (Optional[str]): The price tier of the hotel. Defaults to None. Examples: Midscale, Upper Midscale, Upscale, Luxury
        checkin_date (Optional[Union[date, datetime]]): The check-in date of the hotel. Defaults to None.
        checkout_date (Optional[Union[date, datetime]]): The check-out date of the hotel. Defaults to None.

    Returns:
        list[dict]: A list of hotel dictionaries matching the search criteria.
    """
    conn = sqlite3.connect("travel2.sqlite")
    cursor = conn.cursor()

    query = "SELECT * FROM hotels WHERE 1 = 1"
    params = []

    if location:
        query += " AND location LIKE ?"
        params.append(f"%{location}%")

    if name:
        query += " AND name LIKE ?"
        params.append(f"%{name}%")

    # For the sake of this tutorial, we will let you match on any dates and price tier.
    cursor.execute(query, params)
    results = cursor.fetchall()

    cursor.close()

    return [
        dict(zip([column[0] for column in cursor.description], row))
        for row in results
    ]