from rest_framework.permissions import BasePermission, SAFE_METHODS


# class IsAdminOrReadOnly(BasePermission):
#     """Only Admin have write permission"""
#     def has_permission(self, request, view):
#         """check permission for access user APIs"""
#         if request.method in SAFE_METHODS or request.user.is_staff:
#             return True

#         return False


class OnlyAdminCanCreateDestroy(BasePermission):
    """Only admin have create, destroy permission"""
    def has_permission(self, request, view):
        if view.action in ['create', 'destroy']:
            return request.user.is_staff
        return True


class OnlyAdminHaveWritePermission(BasePermission):
    """Only admin have create and write(update, destroy) permission"""
    def has_permission(self, request, view):
        if view.action in ['create', 'destroy', 'update', 'partial_update']:
            return request.user.is_staff
        return True


class IsOwnerOrReadOnly(BasePermission):
    """Only Owner and Admin have write permission"""
    # def has_permission(self, request, view):
    #     """check permission for access user APIs"""
    #     if request.method in SAFE_METHODS or request.user.is_staff:
    #         return True

    #     if request.method == 'DELETE':
    #         friend = Friend.objects.get(pk=view.kwargs.get('pk'))
    #         return friend.from_user == request.user

    #     return True

    def has_object_permission(self, request, view, instance):
        """object permission belong admin or owner"""
        if request.method in SAFE_METHODS or request.user.is_staff:
            return True

        return instance.owner == request.user
