from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.db.models import Count, Q


from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

from social_api.commons.constants import (ACCEPT, DENIED, REQUIRED_TO_USER,
                                          ERROR_FRIEND_EXIST_STATUS)
from social_api.core.views import CustomModelViewSet
from social_api.core.exceptions import AlreadyExistError, ValidationError
from social_api.post.serializers import (PostSerializer, CommentSerializer,
                                         LikeSerializer)
from social_api.post.models import Post, Comment, Like

from .models import Friend, Profile
from .serializers import UserProfileSerializer, FriendSerializer
from .permissions import (UserPermission, IsTargetUserOfFriendOrAdmin,
                          FriendPermission)


class UserViewSet(CustomModelViewSet):
    """
    User viewset auto provide list, create, retrieve, update actions

    * Require token authentication
    * Only admin user can modify this viewset, others can view only
    """
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated & UserPermission,)

    def get_queryset(self):
        """Override get_queryset for user viewset"""
        return Profile.objects.prefetch_related(
                'friends',
            ).annotate(
                total_friend=Count('friends'),
                total_post=Count('post_posts'),
                total_comment=Count('post_comments'),
                total_like=Count('likes'),
            )

    @action(
        detail=True,
        methods=['get'],
        name='List friend')
    def friends(self, request, pk=None):
        """List friend"""
        return self.multi_serializer_data(
            UserProfileSerializer, request, Profile.objects.friends(pk))

    @action(
        detail=True,
        methods=['get'],
        name='List post')
    def posts(self, request, pk=None):
        """List post"""
        return self.multi_serializer_data(
            PostSerializer,
            request,
            Post.objects.filter(owner=pk))

    @action(
        detail=True,
        methods=['get'],
        name='List comments')
    def comments(self, request, pk=None):
        """List all comment of user"""
        return self.multi_serializer_data(
            CommentSerializer,
            request,
            Comment.objects.filter(owner=pk))

    @action(
        detail=True,
        methods=['get'],
        name='List like')
    def likes(self, request, pk=None):
        """List like"""
        return self.multi_serializer_data(
            LikeSerializer,
            request,
            Like.objects.filter(Q(owner=pk) & Q(is_like=True)))


class FriendViewset(CustomModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    permission_classes = (IsAuthenticated & FriendPermission, )

    def create(self, request):
        """Create new friend request"""
        to_user = None

        if 'to_userid' in request.data:
            to_user = request.data['to_userid']
        elif 'to_user' in request.data:
            to_user = request.data['to_user']
        else:
            raise ValidationError(REQUIRED_TO_USER)

        if self.id_require_integer(to_user):
            to_user = get_object_or_404(Profile, pk=to_user)

            data = {
                'to_user': to_user
            }
            serializer = self.serialize_validate_and_save(
                self.get_serializer, data)

            send_mail(
                'DRF Social APIs frienship request',
                'I would like to be friend with you',
                request.user.email,
                [to_user.user.email],
            )

            return Response(
                serializer.data,
                status.HTTP_201_CREATED
            )

    @action(
        detail=True,
        methods=['post'],
        permission_classes=[IsAuthenticated & IsTargetUserOfFriendOrAdmin],
        name='Accept friendship')
    def accept(self, request, pk=None):
        """Request accept friendship"""
        return self.update_status(pk, ACCEPT)

    @action(
        detail=True,
        methods=['post'],
        permission_classes=[IsAuthenticated & IsTargetUserOfFriendOrAdmin],
        name='Reject friendship')
    def reject(self, request, pk=None):
        """Request reject friendship"""
        return self.update_status(pk, DENIED)

    def update_status(self, pk, status_code):
        """
        Update status of friendship

        :param: status_code int(0, 1, 2)
        :return Response obj
        """
        friend = get_object_or_404(Friend, pk=pk)

        if friend.status == status_code:
            raise AlreadyExistError(ERROR_FRIEND_EXIST_STATUS)

        # Still not handle if status already accepted (1) yet
        friend.status = status_code
        friend.save()
        serializer = self.get_serializer(friend)

        return Response(
            serializer.data,
            status.HTTP_200_OK
        )
