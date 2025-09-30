from django.db import models
from social_api.core.models import Photo, BaseModel


class Category(BaseModel):
    """Category model"""
    name = models.CharField(max_length=50, unique=True, blank=False)
    icon = models.ForeignKey(
        Photo,
        on_delete=models.SET_NULL,
        related_name='categories',
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name
