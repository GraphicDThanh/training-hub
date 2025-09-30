from rest_framework import serializers

from social_api.commons.utils import UtilFunctions

from .models import Photo


class CustomModelSerializer(serializers.ModelSerializer, UtilFunctions):
    """
        Add power to combine __all__ fields and custom field
        Use: In class inherited:
            - fields = '__all__'
            - extra_fields = [...]
        Note: NOT use to BaseSerializer
    """
    created = serializers.SerializerMethodField()
    modified = serializers.SerializerMethodField()

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(
            CustomModelSerializer, self).get_field_names(
                declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields + \
                   ['created', 'modified']

        return expanded_fields

    def get_created(self, obj):
        return self.human_time(obj.created)

    def get_modified(self, obj):
        return self.human_time(obj.modified)

    class Meta:
        abstract = True


class PhotoSerializer(CustomModelSerializer):
    """Photo serializer return the Photo info"""
    medium = serializers.ImageField(read_only=True)
    small = serializers.ImageField(read_only=True)

    class Meta:
        model = Photo
        fields = '__all__'
