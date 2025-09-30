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
    event_context = event["context"]
    method = event_context["http-method"]
    
    # old command - create table    
    # cur.execute("CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(255))")
    
    if method == "POST":
        data = event["body-json"]
        
        with conn.cursor() as cur:
            name = data["name"]
            string_execution = f"INSERT INTO users (name) VALUES ('{name}')"
            cur.execute(string_execution)
            conn.commit()
            return f"Create user name '{name}' success"
        
    elif method == "GET":
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users")
            rows = cur.fetchall()
            json_result = json.dumps(rows)
            return json_result
                        
    return {}