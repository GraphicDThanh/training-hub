from rest_framework import viewsets

from social_api.commons.utils import UtilFunctions

from .models import Photo
from .serializers import PhotoSerializer


class CustomModelViewSet(viewsets.ModelViewSet, UtilFunctions):
    pass


class PhotoViewSet(CustomModelViewSet):
    """Comment model viewset"""
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
