# Lambda action:
# - add environment variable RDS_DB_SECRET_NAME to the lambda function
# - add role has permission to read, write to AWS Secrets Manager
import json
import os
import logging
import boto3
from portal_orm_objects import Base
from portal_utils import create_db_engine

logger = logging.getLogger(__name__)
db_secret_name = os.getenv('RDS_DB_SECRET_NAME')
secrets_client = boto3.client('secretsmanager')

# Get DB credentials from AWS Secrets Manager
def get_db_secrets():
    """
    Return the secret string as a dictionary for secret name SECRET_NAME.
    """
    secret_response = secrets_client.get_secret_value(SecretId=db_secret_name)
    secrets = json.loads(secret_response['SecretString'])
    return secrets

def lambda_handler(event, context):
    """
    Lambda entry point.
    """
    secrets = get_db_secrets()
    db_name = secrets['dbName']
    username = secrets['username']
    password = secrets['password']
    db_proxy_endpoint = secrets['host']
    port = secrets['port']
    
    db_conn_string = f"postgresql://{username}:{password}@{db_proxy_endpoint}:{port}/{db_name}"

    logger.info(f'Creating SQLAlchemy database engine for database: "{db_name}"')
    engine = create_db_engine(db_conn_string)

    logger.info(f'Creating or Updating DB schema for database: "{db_name}"')
    Base.metadata.create_all(engine)