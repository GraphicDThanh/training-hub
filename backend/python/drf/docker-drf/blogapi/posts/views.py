from django.contrib.auth import get_user_model

from rest_framework import generics, viewsets, permissions

from .models import Post
from .permissions import IsAuthorOrReadOnly
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly, permissions.IsAuthenticated)
    queryset = Post.objects.all()
    serializer_class = PostSerializer
