import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class Entity(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now())
    updated_at: datetime = Field(default_factory=lambda: datetime.now())

    @staticmethod
    def from_dict(data: dict):
        """Create model from dict"""
        raise ValueError("from_dict method not implemented")

    def to_dict(self):
        """
        Data for model in app
        By default, all fields are included
        """
        return self.model_dump(mode="json")

    def db_model_data(self):
        """
        Data for model in database
        By default, all fields are included
        """
        return self.model_dump(mode="json", exclude={})
