from rest_framework.permissions import SAFE_METHODS

from social_api.core.permissions import IsOwnerOrReadOnly

from .models import Post, Comment, Like


class PostPermission(IsOwnerOrReadOnly):
    """
    Post Model Permission
    - Only admin or owner have write(update, delete) permission
    """
    def has_permission(self, request, view):
        """check permission for access user APIs"""
        if request.method in SAFE_METHODS or request.user.is_staff:
            return True

        if request.method == 'DELETE':
            post = Post.objects.get(pk=view.kwargs.get('pk'))
            return post.owner == request.user

        return True


class CommentPermission(IsOwnerOrReadOnly):
    """
    Post Model Permission
    - Only admin or owner have write(update, delete) permission
    """
    def has_permission(self, request, view):
        """check permission for access user APIs"""
        if request.method in SAFE_METHODS or request.user.is_staff:
            return True

        if request.method == 'DELETE':
            comment = Comment.objects.get(pk=view.kwargs.get('pk'))
            return comment.owner == request.user

        return True


class LikePermission(IsOwnerOrReadOnly):
    """
    Post Model Permission
    - Only admin or owner have write(update, delete) permission
    """
    def has_permission(self, request, view):
        """check permission for access user APIs"""
        if request.method in SAFE_METHODS or request.user.is_staff:
            return True

        if request.method == 'DELETE':
            like = Like.objects.get(pk=view.kwargs.get('pk'))
            return like.owner == request.user

        return True
