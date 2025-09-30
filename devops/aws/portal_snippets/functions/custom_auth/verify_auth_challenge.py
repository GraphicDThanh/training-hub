import json

def lambda_handler(event, context):
    print(json.dumps(event))
    try:
        challenge = event['request']['privateChallengeParameters']['challenge']
    except:
        event['response']['answerCorrect'] = False
        return event
        
    
    # Check if challenge is met
    if (event['request']['challengeAnswer'] == challenge):
        event['response']['answerCorrect'] = True
        return event
        
    event['response']['answerCorrect'] = False
    return event