from django.db import IntegrityError


class AlreadyFriendError(IntegrityError):
    pass
