from django_extensions.db.models import TimeStampedModel


class BaseModel(TimeStampedModel):
    """Base Model with timestamp"""
    class Meta:
        abstract = True
