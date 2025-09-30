from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from apis import models
from profiles.models import User


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RoomModel
        fields = ('id', 'name',)


class RegisterSerializers(serializers.Serializer):
    username = serializers.CharField(
        required=True,
    )
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField(write_only=True)

    # Add more validation
    # def validate_username(self, username):
    #     pass
    # def validate_password(self, password):
    #     pass

    def save(self, request):
        user = User.objects.create_user(
            username=self.validated_data.get('username'),
            password=self.validated_data.get('password'),
            # password=self.validated_data.get('password1'),
            email=self.validated_data.get('email'),
            first_name=self.validated_data.get('first_name', ''),
            last_name=self.validated_data.get('last_name', ''),
        )

        return user
