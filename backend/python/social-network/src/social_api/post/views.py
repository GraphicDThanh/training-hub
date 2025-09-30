from django.db.models import Count, Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from social_api.core.views import CustomModelViewSet
from social_api.user.serializers import UserProfileSerializer

from .models import Post, Comment, Like
from .serializers import PostSerializer, CommentSerializer, LikeSerializer
from .permissions import PostPermission, CommentPermission, LikePermission
from social_api.post.tasks import spam_filter


class PostViewSet(CustomModelViewSet):
    """Post model viewset"""
    queryset = Post.objects.select_related('categories', 'photos').all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated & PostPermission,)

    def get_queryset(self):
        """Override get_queryset for post viewset"""
        return Post.objects.annotate(
            total_comment=Count('comments'),
            total_like=Count('likes'),
        )

    @action(
        detail=True,
        methods=['get'],
        name='List comment')
    def comments(self, request, pk=None):
        """List all comment of post"""
        return self.multi_serializer_data(
            CommentSerializer, request, Comment.objects.filter(post=pk))

    @action(
        detail=True,
        methods=['get'],
        name='List like')
    def likes(self, request, pk=None):
        """List all like of post"""
        return self.multi_serializer_data(
            LikeSerializer,
            request,
            Like.objects.filter(Q(post=pk) & Q(is_like=True))
        )

    @action(
        detail=True,
        methods=['get'],
        name='list user liked')
    def users_like(self, request, pk=None):
        """List all user like post"""
        print('result user like', Post.objects.users_like(pk))
        return self.multi_serializer_data(
            UserProfileSerializer,
            request,
            Post.objects.users_like(pk)
        )

    @action(
        detail=True,
        methods=['get'],
        name='list user commented')
    def users_comment(self, request, pk=None):
        """List all user comment post"""
        return self.multi_serializer_data(
            UserProfileSerializer,
            request,
            Post.objects.users_comment(pk)
        )


class CommentViewSet(CustomModelViewSet):
    """Comment model viewset"""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated & CommentPermission,)

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check spam asynchronously
        remote_addr = request.META.get('REMOTE_ADDR')
        spam_filter.delay(
            comment_id=serializer.data.id,
            remote_addr=remote_addr
        )

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class LikeViewSet(CustomModelViewSet):
    """
    Like viewset auto provide list, create, retrieve, update actions

    * Require token authentication
    * Only admin user can modify this viewset, others can view only
    """
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = (IsAuthenticated & LikePermission,)
