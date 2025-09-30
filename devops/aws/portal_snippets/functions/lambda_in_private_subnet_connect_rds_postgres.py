import os, json, psycopg2, logging, sys

# rds settings
host = os.environ["HOST"]
user_name = os.environ["USER_NAME"]
password = os.environ["PASSWORD"]
database = os.environ["DB_NAME"]
logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = psycopg2.connect(
        host=host, database=database, 
        user=user_name, password=password, connect_timeout=5
    )

except psycopg2.Error as e:
    logger.error("ERROR: Unexpected error: Could not connect to Postgres instance.")
    logger.error(e)
    sys.exit(1)

def lambda_handler(event, context):
    with conn.cursor() as cur:
        rows = cur.fetchall()
        json_result = json.dumps(rows)
    
    return json_result