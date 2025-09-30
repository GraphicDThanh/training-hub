from rest_framework import serializers
from django.contrib.auth import get_user_model


USER_MODEL = get_user_model()


class UserSerializer(serializers.ModelSerializer[USER_MODEL]):
    """User serializer"""

    class Meta:
        model = USER_MODEL
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "created",
            "modified",
        ]
