from django.db import models

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from django_extensions.db.models import TimeStampedModel


class BaseModel(TimeStampedModel):
    """Base model"""
    class Meta:
        abstract = True


class Photo(BaseModel):
    """Photo model"""
    origin = models.ImageField(
        upload_to='media',
        blank=True,
        null=True
    )
    medium = ImageSpecField(
        source='origin',
        processors=[ResizeToFill(300, 200)],
        format='JPEG',
        options={'quality': 60}
    )
    small = ImageSpecField(
        source='origin',
        processors=[ResizeToFill(300, 200)],
        format='JPEG',
        options={'quality': 60}
    )

    def __str__(self):
        return '%d' % self.id
