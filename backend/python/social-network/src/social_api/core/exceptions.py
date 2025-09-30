from django.db import IntegrityError


class AlreadyExistError(IntegrityError):
    pass


class ValidationError(IntegrityError):
    pass
