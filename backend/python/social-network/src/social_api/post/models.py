from django.db import models
from django.db.models import Q
from django.utils.translation import ugettext_lazy as _

from social_api.core.models import Photo, BaseModel
from social_api.category.models import Category
from social_api.user.models import Profile


class PostQuerySet(models.QuerySet):
    def users_like(self, pk):
        """Get list person like post"""
        return Profile.objects.filter(
            id__in=Like.objects.filter(
                Q(is_like=True) & Q(post=int(pk))).values_list('owner__id'))

    def users_comment(self, pk):
        """Get list person comment post"""
        return Profile.objects.filter(
            id__in=Comment.objects.filter(
                post=int(pk)).values_list('owner__id'))


class Feed(BaseModel):
    """Feed base abstract model"""
    owner = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        # Read more https://docs.djangoproject.com/en/2.2/topics/db/
        # models/#be-careful-with-related-name-and-related-query-name
        # related_name='%(app_label)s_%(class)s',
        related_name='%(app_label)s_%(class)s_related',
        related_query_name='%(app_label)s_%(class)ss',
    )
    content = models.TextField(default='This is content default')
    photo = models.ForeignKey(
        Photo,
        on_delete=models.SET_NULL,
        related_name='%(app_label)s_%(class)s_related',
        null=True,
        blank=True,
    )

    class Meta:
        abstract = True


class Post(Feed):
    """Post model"""
    title = models.CharField(
        max_length=100,
        default='This is default title'
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        related_name='posts',
        null=True
    )

    objects = PostQuerySet.as_manager()

    def __str__(self):
        return '#%d %s' % (self.id, self.title)


class Comment(Feed):
    """Comment model"""
    post = models.ForeignKey(
        Post,
        on_delete=models.SET_NULL,
        related_name='comments',
        null=True
    )
    is_spam = models.BooleanField(_('spam?'), default=False, editable=False)

    def __str__(self):
        return 'comment #%d of post #%d' % (self.id, self.post_id)


class Like(BaseModel):
    """Like model"""
    owner = models.ForeignKey(
        Profile,
        on_delete=models.SET_NULL,
        null=True,
    )
    post = models.ForeignKey(
        Post,
        on_delete=models.SET_NULL,
        null=True
    )
    is_like = models.BooleanField(default=True)

    class Meta:
        default_related_name = 'likes'

    def __str__(self):
        return 'from user#%d to #%d' % (self.owner_id, self.post_id)

