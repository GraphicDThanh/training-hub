from django.db import models
from django.utils.translation import ugettext_lazy as _
from django_extensions.db.models import TimeStampedModel

# Create your models here.
class RoomModel(TimeStampedModel):
    """
    This is model for creating chat room
    """
    name = models.CharField(_('name'), max_length=50)

    def __str__(self):
        return self.name
