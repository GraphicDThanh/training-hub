import json
from random import randint
import boto3
from botocore.exceptions import ClientError

SENDER = "thanh.nguyen@asnet.com.vn"
SUBJECT = "Your Portal Dashboard Login Code"
AWS_REGION = "us-east-1"
CHARSET = "urf-8"

client = boto3.client('ses', region_name=AWS_REGION)

def lambda_handler(event, context):
    # Random code
    code = random_with_N_digits(6)
    
    # Send email
    send_email(
        event['request']['userAttributes']['email'],
        "Your Portal Dashboard Login Code",
        f"Your login code is: {code}"
    )
    
    # Set challenge params
    event['response']['privateChallengeParameters'] = dict()
    event['response']['privateChallengeParameters']['challenge'] = code
    print(json.dumps(event))
    
    return event
    

def send_email(recipient, subject, body):
    try:
        response = client.send_email(
            Source= SENDER, 
            Destination={ 'ToAddresses':[recipient] }, 
            Message={
                'Subject': { 'Data': subject }, 
                'Body':{ 'Text':{ 'Data': body } }
            }
        )
    except ClientError as e:
        print('Error: ', e)
    else:
        print('Email send!')
        print('response', response)
        

def random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)