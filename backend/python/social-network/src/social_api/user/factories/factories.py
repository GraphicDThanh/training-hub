from datetime import datetime
from django.contrib.auth.models import User
from django.db.models.signals import post_save

import factory
import factory.fuzzy
from factory.django import DjangoModelFactory
from factory import Faker

from ..models import Profile, Friend


@factory.django.mute_signals(post_save)
class UserFactory(DjangoModelFactory):
    """Factory for User Model"""
    first_name = Faker('first_name')
    last_name = Faker('last_name')
    email = Faker('email')
    username = factory.Sequence(lambda n: 'user-%s' % (
        datetime.now().timestamp()))

    class Meta:
        model = User


@factory.django.mute_signals(post_save)
class ProfileFactory(DjangoModelFactory):
    """Factory for User Model"""
    user = factory.SubFactory(UserFactory, profile=None)
    phone = factory.fuzzy.FuzzyChoice(
        ['+8463651191', '+84905549193', '+8405912192'])
    address = Faker('address')
    # later
    avatar = None

    class Meta:
        model = Profile


class FriendFactory(DjangoModelFactory):
    """Factory for User Model"""
    from_user = factory.SubFactory(ProfileFactory)
    to_user = factory.SubFactory(ProfileFactory)
    status = 0

    class Meta:
        model = Friend
