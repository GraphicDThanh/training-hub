from django.db import models
from django.db.models import Q
from django.contrib.auth.models import User

from phonenumber_field.modelfields import PhoneNumberField

from social_api.core.models import Photo
from social_api.commons.constants import (ACCEPT, PENDING, FRIENDSHIP_STATUS)
from social_api.core.models import BaseModel


class ProfileQuerySet(models.QuerySet):
    """Profile Query Set"""
    def friends(self, id):
        """Friends of user"""
        return Profile.objects.filter(
            id__in=[
                friendship.to_user.id
                if friendship.from_user.id == int(id)
                else friendship.from_user.id for friendship in
                Friend.objects.select_related('from_user', 'to_user')
                .filter(status=ACCEPT)
                .filter(Q(from_user__id=id) | Q(to_user__id=id))
            ]

        )

class Profile(BaseModel):
    """Profile model"""
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    phone = PhoneNumberField(
        blank=True,
        null=True
    )
    address = models.CharField(
        max_length=100,
        blank=True
    )
    avatar = models.ForeignKey(
        Photo,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='profiles',
    )

    objects = ProfileQuerySet.as_manager()

    def __str__(self):
        return self.user.username


class Friend(BaseModel):
    """Model present Friendship request"""
    from_user = models.ForeignKey(
        Profile,
        on_delete=models.SET_NULL,
        related_name='friends',
        null=True
    )
    to_user = models.ForeignKey(
        Profile,
        on_delete=models.SET_NULL,
        null=True
    )
    status = models.IntegerField(
        choices=FRIENDSHIP_STATUS,
        default=PENDING
    )

    class Meta:
        unique_together = ('from_user', 'to_user')

    def __str__(self):
        return '%d from user #%s to user #%s' % (
            self.id, self.from_user_id, self.to_user_id)
