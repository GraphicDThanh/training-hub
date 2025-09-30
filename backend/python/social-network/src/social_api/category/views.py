from django.db.models import Count

from rest_framework.decorators import action
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from social_api.core.views import CustomModelViewSet
from social_api.core.permissions import OnlyAdminHaveWritePermission
from social_api.post.serializers import PostSerializer
from social_api.post.models import Post

from .models import Category
from .serializers import CategorySerializer


class CategoryViewSet(CustomModelViewSet):
    queryset = Category.objects.select_related('icon').all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated & OnlyAdminHaveWritePermission, ]

    # def get_queryset(self):
    #   return self.queryset.select_related().prefetch_related().annotate(
    #         total_post=Count('posts')
    #     )

    def get_queryset(self):
        """Override get_queryset for category viewset"""
        return Category.objects.annotate(
            total_post=Count('posts')
        )

    @action(detail=True, methods=['get'])
    def posts(self, request, pk=None):
        """List all post of category"""

        serializer = PostSerializer(
            Post.objects.filter(category=pk),
            many=True,
            context={'request': request}
        )
        return Response(serializer.data, status.HTTP_200_OK)
