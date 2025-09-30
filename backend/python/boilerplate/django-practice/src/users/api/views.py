from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

from core.api_views import BaseModelViewSet
from .serializers import UserSerializer


USER_MODEL = get_user_model()


class UserViewSet(BaseModelViewSet):
    """User view set"""

    resource_name = "users"
    serializer_class = UserSerializer
    queryset = USER_MODEL.objects.all()
    permission_classes = [IsAuthenticated]
    http_method_names = ["get"]

    def get_queryset(self, *args, **kwargs):
        return self.queryset.all()


apps = [UserViewSet]
