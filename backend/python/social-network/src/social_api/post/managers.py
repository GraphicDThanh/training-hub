
from django.db import models
# from django.contrib.auth.models import User
from django.db.models import Q
from social_api.user.models import Profile
from . import Comment, Like


# https://simpleisbetterthancomplex.com/tips/2016/08/16/django-tip-11-custom-manager-with-chainable-querysets.html
class PostQuerySet(models.QuerySet):
    def users_like(self, pk):
        # return self.all()
        """Get list person like post"""
        # user_ids = list(Like.objects.filter(
        #                     Q(is_like=True) & Q(post=int(pk))
        #                 ).value_list('owner__id'), flat=True)

        return Profile.objects.filter(
            id__in=Like.objects.filter(
                Q(is_like=True) & Q(post=int(pk))).value_list('owner__id'))

    def users_comment(self, pk):
        """Get list person comment post"""
        # return self.all()
        # return Profile.objects.select_related(
        #     'user').filter(post_posts__id=int(pk))
        return Profile.objects.filter(
            id__in=Comment.objects.filter(
                post=int(pk)).value_list('owner__id'))

    # def users_comment(self, pk):
    #     """Get list person comment post"""
    #     comments = Comment.objects.select_related(
    #         'owner').filter(post=int(pk))

    #     user_comment = (comment.owner for comment in comments)
    #     return User.objects.select_related('profile').filter(
    #         id__in=[user.id for user in user_comment])
