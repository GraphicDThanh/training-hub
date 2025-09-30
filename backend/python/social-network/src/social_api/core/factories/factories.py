# import os
from django.core.files.base import ContentFile
# from django.conf import settings

import factory
from factory.django import DjangoModelFactory

from social_api.core.models import Photo


class PhotoFactory(DjangoModelFactory):
    # https://stackoverflow.com/questions/25806428/how-to-make-factoryboys-imagefield-generate-image-before-save-is-called
    origin = factory.LazyAttribute(lambda _: ContentFile(
        factory.django.ImageField()._make_data({
            'width': 1024,
            'height': 768,

        }),
        'example.png'
    ))
    # origin = ''

    class Meta:
        model = Photo
