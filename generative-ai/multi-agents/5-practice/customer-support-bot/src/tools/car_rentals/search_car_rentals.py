import sqlite3
from datetime import date, datetime
from typing import Optional, Union

from langchain_core.tools import tool


@tool
def search_car_rentals(
    location: Optional[str] = None,
    name: Optional[str] = None,
    price_tier: Optional[str] = None,
    start_date: Optional[Union[date, datetime]] = None,
    end_date: Optional[Union[date, datetime]] = None,
) -> list[dict]:
    """
    Search for car rentals based on location, name, price tier, start date, and end date.

    Args:
        location (Optional[str]): The location of the car rental. Defaults to None.
        name (Optional[str]): The name of the car rental company. Defaults to None.
        price_tier (Optional[str]): The price tier of the car rental. Defaults to None.
        start_date (Optional[Union[date, datetime]]): The start date of the car rental. Defaults to None.
        end_date (Optional[Union[date, datetime]]): The end date of the car rental. Defaults to None.

    Returns:
        list[dict]: A list of car rental dictionaries matching the search criteria.
    """

    conn = sqlite3.connect("travel2.sqlite")
    cursor = conn.cursor()

    query = "SELECT * FROM car_rentals WHERE 1 = 1"
    params = []

    if location:
        query += " AND location LIKE ?"
        params.append(f"%{location}%")

    if name:
        query += " AND name LIKE ?"
        params.append(f"%{name}%")

    # For this tutorial, we will let you match on any dates and price tier.
    # (since our toy dataset doesn't have much data)
    cursor.execute(query, params)
    results = cursor.fetchall()

    cursor.close()

    return [
        dict(zip([column[0] for column in cursor.description], row))
        for row in results
    ]
