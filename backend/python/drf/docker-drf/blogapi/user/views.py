from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions, generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser

from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

#######################################################
# Example from DRF document
from rest_framework import authentication
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView

# APIView
class ListAPI(APIView):
    """
    View to list all users in the system

    * Requires token authentication.
    * Only admin user are able to access this view
    """
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAdminUser,)

    def get(self, request, format=None):
        """
        Return a list of all user
        """
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)

# Generic view
class UserList(generics.ListCreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    # permissin_class = (IsAdminUser,)

    def list(self, request):
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

#######################################################
