from django.contrib.auth.models import AbstractUser
from core.models import AbstractBaseModel


class User(AbstractUser, AbstractBaseModel):
    """
    Custom User model
    """

    pass
