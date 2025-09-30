import json
import logging
import db_connection
from portal_orm_objects import User
logger = logging.getLogger(__name__)
logger.setLevel(logging.ERROR)

session = db_connection.get_db_session()

def get_staffs():
    try:
        users = session.query(User).all()
        print('users', users)
        results = [
            { 
                "uuid": user.uuid,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "role": user.role
            } for user in users
        ]

        return {
            "statusCode": 200,
            "data": results
        }

    except Exception as e:
        logger.debug(e)
        response = {
            "statusCode": 500,
            "error": f"Error: {e}"
        }
        return response
        
def create_staff(event):
    try:
        req = event['body']
        staff = User(
            uuid=req['uuid'],
            email=req['email'],
            first_name=req['first_name'],
            last_name=req['last_name'],
            role=1
        ) 
        logger.debug(f"Creating: {staff}")
        session.add(staff)
        session.commit()

        return {
            "statusCode": 201
        }
    except Exception as e:
        logger.debug(e)
        return {
            "statusCode": 500,
            "error": f"Error: {e}"
        }
    
def lambda_handler(event, context):
    logger.debug(event)

    if (event['httpMethod'] == 'POST'):
        response = create_staff(event)
    elif (event['httpMethod'] == 'GET'):
        response = get_staffs()
    else:
        logger.debug(f"No handler for http verb: {event['httpMethod']}")
        raise Exception(f"No handler for http verb: {event['httpMethod']}")
        
    return response
