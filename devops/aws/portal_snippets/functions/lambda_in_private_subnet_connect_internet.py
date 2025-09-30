import json
import urllib3  # urllib3 is python built-in library

def lambda_handler(event, context):

    http = urllib3.PoolManager()
    r = http.request('GET', 'https://google.com')
    return {
        'statusCode': r.status,
        'body': json.dumps('Hello from Google!')
    }
