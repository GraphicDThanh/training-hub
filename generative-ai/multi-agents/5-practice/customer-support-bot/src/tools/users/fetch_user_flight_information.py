import sqlite3
from langchain_core.runnables import RunnableConfig
from langchain_core.tools import tool

from utils import constants


@tool
def fetch_user_flight_information(config: RunnableConfig) -> list[dict]:
    """Fetch all tickets for the user along with corresponding flight information and seats assignment.

    Returns:
        A list of dictionaries where each dictionary contains the ticket details, associated flight details, and the seat assignments for each ticket belonging to the user.
    """
    configuration = config.get("configurable", {})
    passenger_id = configuration.get("passenger_id", None)
    # from remote_pdb import RemotePdb; RemotePdb("127.0.0.1", 4444).set_trace()
    if not passenger_id:
        raise ValueError("No passenger ID configured.")

    conn = sqlite3.connect(constants.DB_NAME)
    cursor = conn.cursor()

    query = """
    SELECT
        t.ticket_no, t.book_ref,
        f.flight_id, f.flight_no, f.departure_airport, f.scheduled_departure, f.scheduled_arrival,
        bp.seat_no, tf.fare_conditions
    FROM tickets t
        JOIN ticket_flights tf ON t.ticket_no = tf.ticket_no
        JOIN flights f ON tf.flight_id = f.flight_id
        JOIN boarding_passes bp ON bp.ticket_no = t.ticket_no AND bp.flight_id = f.flight_id
    WHERE t.passenger_id = ?
    """
    cursor.execute(query, (passenger_id,))
    rows = cursor
    column_names = [column[0] for column in cursor.description]
    results = [dict(zip(column_names, row)) for row in rows]

    cursor.close()
    conn.close()

    return results
