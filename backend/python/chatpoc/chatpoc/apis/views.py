# Built-in libraries
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import (
    login as django_login,
    logout as django_logout,
    authenticate as django_authenticate,
)

# User-defined libraries
from profiles.models import User
from django.conf import settings
from apis.models import RoomModel
from apis import serializers


@csrf_exempt
@permission_classes(AllowAny,)
@api_view(['POST'])
def login(request):
    """Login API"""
    # TODO: you must handle logged in here
    username = request.data.get('username', None)
    password = request.data.get('password', None)

    # breakpoint()

    # Check input data
    if not username or not password:
        return Response({'error': 'Please input username and password'},
                        status=status.HTTP_400_BAD_REQUEST)

    # Check user exist
    user = User.objects.filter(username=username).first()
    if not user:
        return Response({'error': 'User not exist'},
                        status=status.HTTP_400_BAD_REQUEST)

    # Authenticated
    user = django_authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Incorrect password/username'},
                        status=status.HTTP_400_BAD_REQUEST)

    # Generate token
    token, _ = Token.objects.get_or_create(user=user)

    return Response(
        data={
            'token': token.key,
            'message': 'User log in successfully'
        },
        status=status.HTTP_200_OK)


@api_view(['POST'])
def logout(request):
    """Logout API"""
    # TODO: you must handle logged out here
    # Delete session here
    request.user.auth_token.delete()

    if getattr(settings, 'REST_SESSION_LOGIN', True):
        django_logout(request)

    return Response(data={'message': 'You logged out successfully'},
                    status=status.HTTP_200_OK)


@api_view(['POST'])
def signup(request):
    """Sign Up API"""
    serialized = serializers.RegisterSerializers(data=request.data)

    if serialized.is_valid():
        user = serialized.save(request)
        breakpoint()
        if user:
            # Generate token
            token, _ = Token.objects.get_or_create(user=user)
        return Response(data={
            'token': token.key,
            'message': 'Create user successfully',
        }, status=status.HTTP_201_CREATED)

    return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


class HelloView(APIView):
    """Hello view for testing authenticated"""
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello'}
        return Response(content)


class RoomViewSet(viewsets.ModelViewSet):
    """
    The RESTful endpoins for room resources.
    """
    queryset = RoomModel.objects.all().order_by('created')
    serializer_class = serializers.RoomSerializer
    permission_classes = (IsAuthenticated,)
