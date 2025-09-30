from rest_framework import serializers

from social_api.core.models import Photo
from social_api.core.serializers import (PhotoSerializer,
                                         CustomModelSerializer)

from .models import Category


class CategorySerializer(CustomModelSerializer):
    """
    Category base serializer

    Useful to showing all data with not adding from viewset
    Useful to nested presentation(#writable-nested-representations)
    """
    icon = PhotoSerializer(read_only=True)
    photo_id = serializers.IntegerField(write_only=True)
    # cost 1 query
    # photo_id = serializers.SlugRelatedField(
    #     queryset=Photo.objects.all(),
    #     slug_field='id',
    #     write_only=True,
    # )
    # breakpoint()
    total_post = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = '__all__'
        extra_fields = ['photo_id', 'total_post']

    def to_internal_value(self, data):
        """Override to support deserializer, for write operations"""
        if 'photo_id' in data:
            icon = Photo.objects.get(pk=data['photo_id'])
        elif 'icon' in data:
            icon = Photo.objects.get(pk=data['icon'])
        else:
            icon = Photo.objects.all().first()
        return {
            'name': data['name'],
            'icon': icon
        }
