from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils.translation import ugettext_lazy as _
from chatpoc.settings import AUTH_USER_MODEL
from core.models import BaseModel
from chatpoc.commons import constants


class User(AbstractUser, BaseModel):
    """User extend from AbstractUser"""
    username = models.CharField(_('username'), unique=True, max_length=100)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', ]

    def get_full_name(self):
        """get full name of user"""
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return f'{self.username}'


class Profile(BaseModel):
    """Model User Profile"""
    user = models.OneToOneField(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile',
    )
    gender = models.IntegerField(
        default=constants.GENDER_MALE,
        choices=constants.GENDER_CHOICES,
        blank=True,
    )
    address = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
