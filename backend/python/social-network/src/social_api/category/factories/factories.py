from datetime import datetime
import factory
from factory.django import DjangoModelFactory

from social_api.core.factories import PhotoFactory
from social_api.category.models import Category


class CategoryFactory(DjangoModelFactory):
    icon = factory.SubFactory(PhotoFactory)
    name = factory.Sequence(lambda n: 'category-%s' % (
        datetime.now().timestamp()))

    class Meta:
        model = Category
