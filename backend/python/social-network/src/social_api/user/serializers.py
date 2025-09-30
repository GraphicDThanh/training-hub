from django.contrib.auth.models import User

from rest_framework import serializers

from social_api.commons.constants import (REQUIRED_TO_USER,
                                          ERROR_FRIEND_THEMSELVES,
                                          ERROR_FRIEND_EXIST)
from social_api.core.exceptions import ValidationError, AlreadyExistError
from social_api.core.serializers import CustomModelSerializer
from social_api.commons.utils import UtilFunctions

from .models import Profile, Friend


class UserProfileSerializer(serializers.ModelSerializer, UtilFunctions):
    """
    User base serializer

    Useful to showing all data with not adding from viewset
    Useful to nested presentation(#writable-nested-representations)
    """
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    total_post = serializers.IntegerField(read_only=True)
    total_comment = serializers.IntegerField(read_only=True)
    total_like = serializers.IntegerField(read_only=True)
    total_friend = serializers.IntegerField(read_only=True)

    class Meta:
        model = Profile
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'user',
            'phone',
            'address',
            'avatar',
            'total_friend',
            'total_post',
            'total_comment',
            'total_like',
        )
        extra_kwargs = {
            'user': {'read_only': True}
        }

    def create(self, validated_data):
        # FIXME: RE_CHECK WAY CREATE BY SERIALIZER
        """
        Override create method for nested object create
        Create user and create profile at the same time from viewset
        if it not exist, update if exist
        Dealing create for nested object(#dealing-with-nested-objects)
        """
        # Create & save user
        user = User.objects.create(**validated_data.pop('user'))
        # Get profile from user
        profile = user.profiles

        # profile data need update
        validated_data['user'] = user

        # go update
        profile = self.replace_value_dict(profile, validated_data)

        # save profile
        profile.save()

        return profile

    def update(self, profile, validated_data):
        """Override update method for nested object update"""
        # get data user need for update
        user_data = validated_data.pop('user')
        # go update
        user = self.replace_value_dict(
            User.objects.get(pk=profile.id), user_data)

        # get data profile need for update
        validated_data['user'] = user
        # go update
        profile = self.replace_value_dict(profile, validated_data)

        # save all
        user.save()
        profile.save()

        return profile

class FriendSerializer(CustomModelSerializer):
    from_user = UserProfileSerializer(read_only=True)
    to_user = UserProfileSerializer(read_only=True)
    to_userid = serializers.SlugRelatedField(
        queryset=Profile.objects.all(),
        slug_field='id',
        write_only=True,
    )

    class Meta:
        model = Friend
        fields = '__all__'
        extra_fields = ['to_userid']
        extra_kwargs = {
            'status': {'read_only': True}
        }

    def to_internal_value(self, data):
        """Override to support deserializer, for write operations"""
        if 'to_user' in data:
            to_user = data['to_user']
        else:
            raise ValidationError(REQUIRED_TO_USER)

        return {
            'to_user': to_user
        }

    def create(self, validated_data):
        """Override create to provide a user via request.user by default.
        issue #82"""
        # Add user request become from_user attribute
        if 'from_user' not in validated_data:
            user_id = self.context['request'].user.id

            validated_data['from_user'] = Profile.objects.get(pk=user_id)
        # TODO: Validation. Should put validate function to `validate` function
        from_user = validated_data['from_user']
        to_user = validated_data['to_user']

        # Check request to themselves
        if validated_data['from_user'] == validated_data['to_user']:
            raise ValidationError(ERROR_FRIEND_THEMSELVES)

        # Check friendship request exist
        # from_user to to_user OR to_user to from_user
        friendshipBetweenFromUserAndToUser = Friend.objects.filter(
            from_user=from_user, to_user=to_user)
        friendshipBetweenToUserAndFromUser = Friend.objects.filter(
            from_user=to_user, to_user=from_user)

        if friendshipBetweenFromUserAndToUser.exists():
            raise AlreadyExistError(ERROR_FRIEND_EXIST)
        if friendshipBetweenToUserAndFromUser.exists():
            raise AlreadyExistError(ERROR_FRIEND_EXIST)

        return super(FriendSerializer, self).create(validated_data)
