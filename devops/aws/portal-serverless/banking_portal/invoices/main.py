import json
import logging
import db_connection
from portal_orm_objects import Invoice

logger = logging.getLogger(__name__)
logger.setLevel(logging.ERROR)

session = db_connection.get_db_session()

def get_invoices():
    try:
        invoices = session.query(Invoice).all()
        results = [
            { 
                "uuid": invoice.uuid,
                "amount": invoice.amount,
                "status": invoice.status,
                "customer": invoice.customer.uuid,
                "created_at": invoice.created_at,
            } for invoice in invoices
        ]

        return {
            "statusCode": 200,
            "body": json.dumps({
                "invoices": results
            })
        }

    except Exception as e:
        logger.debug(e)
        response = {
            "statusCode": 500,
            "error": f"Error: {e}"
        }

def create_invoice(event):
    try:
        req = json.loads(event['body'])
        invoice = Invoice(
            uuid=req['uuid'],
            email=req['email'],
            first_name=req['first_name'],
            last_name=req['last_name'],
            role=1
        ) 
        logger.debug(f"Creating: {invoice}")
        session.add(invoice)
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
        response = create_invoice(event)
    elif (event['httpMethod'] == 'GET'):
        response = get_invoices()
    else:
        logger.debug(f"No handler for http verb: {event['httpMethod']}")
        raise Exception(f"No handler for http verb: {event['httpMethod']}")
        
    return response
