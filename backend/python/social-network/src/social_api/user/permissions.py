
from rest_framework.permissions import BasePermission, SAFE_METHODS

from social_api.core.permissions import OnlyAdminCanCreateDestroy

from .models import Friend


class UserPermission(OnlyAdminCanCreateDestroy):
    """
    User model permission
        get list users => authenticated user
        create/ delete user => admin only
        update user => owner or admin
    """
    def has_object_permission(self, request, view, instance):
        """object permission belong admin or owner"""
        if request.method in SAFE_METHODS or request.user.is_staff:
            return True

        return instance == request.user


class IsTargetUserOfFriendOrAdmin(BasePermission):
    """Only to_user or admin have permission accept/reject"""
    def has_permission(self, request, view):
        """check permission for access user APIs"""
        if request.method in SAFE_METHODS or request.user.is_staff:
            return True

        if request.method == 'POST':
            friend = Friend.objects.get(pk=view.kwargs.get('pk'))
            return friend.to_user == request.user

        return False


class FriendPermission(BasePermission):
    """
    Friendship model permission

    Only admin or from_user of friend request have permission to delete it
    """
    def has_permission(self, request, view):
        """check permission for access user APIs"""
        if request.method in SAFE_METHODS or request.user.is_staff:
            return True

        if request.method == 'DELETE':
            friend = Friend.objects.get(pk=view.kwargs.get('pk'))
            return friend.from_user == request.user

        return True
