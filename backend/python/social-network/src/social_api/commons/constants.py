PENDING = 0
ACCEPT = 1
DENIED = 2

FRIENDSHIP_STATUS = (
    (PENDING, 'PENDING'),
    (ACCEPT, 'ACCEPT'),
    (DENIED, 'DENIED'),
)

ERROR_FRIEND_THEMSELVES = 'User cannot be friends with themselves'
ERROR_FRIEND_EXIST = 'Friendship already exist, pls to update instead'
ERROR_FRIEND_EXIST_STATUS = 'Friend request already have this status'
REQUIRED_TO_USER = 'to_user is required!'
REQUIRED_INTEGER_ID = 'id field is integer only'
