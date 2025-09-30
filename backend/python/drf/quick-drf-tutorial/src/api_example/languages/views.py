from django.shortcuts import render
from rest_framework import viewsets
from .models import Language
from .serializers import LanguageSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User


class LanguageView(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

# Example with APIView
class ListAPI(APIView):
    """
    View to list all users in the system

    * Requires token authentication.
    * Only admin user are able to access this view
    """
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request, format=None):
        """
        Return a list of all user
        """
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)

# Example with Generic View
