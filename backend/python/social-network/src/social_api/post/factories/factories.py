import factory
import factory.fuzzy
from factory.django import DjangoModelFactory

from social_api.user.factories import UserFactory
from social_api.category.factories import CategoryFactory
from social_api.core.factories import PhotoFactory

from social_api.post.models import Post, Comment, Like


class PostFactory(DjangoModelFactory):
    """Factory for Post Model"""
    owner = factory.SubFactory(UserFactory)
    photo = factory.SubFactory(PhotoFactory)
    category = factory.SubFactory(CategoryFactory)
    title = factory.fuzzy.FuzzyText(length=20)
    content = factory.fuzzy.FuzzyText(length=50)

    class Meta:
        model = Post


class CommentFactory(DjangoModelFactory):
    """Factory for Comment Model"""
    owner = factory.SubFactory(UserFactory)
    photo = factory.SubFactory(PhotoFactory)
    post = factory.SubFactory(PostFactory)
    content = factory.Sequence(lambda n: 'Auto generate content \
        for comment id-%d' % n)

    class Meta:
        model = Comment


class LikeFactory(DjangoModelFactory):
    """Factory for Like Model"""
    owner = factory.SubFactory(UserFactory)
    post = factory.SubFactory(PostFactory)

    class Meta:
        model = Like
