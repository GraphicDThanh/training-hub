from abc import ABC, abstractmethod
from typing import Generic, TypeVar

from common.config import settings

from supabase import create_client

T = TypeVar("T")


class Repository(Generic[T], ABC):
    def __init__(
        self,
        supabase_url: str = settings.supabase.API_URL,
        supabase_key: str = settings.supabase.ANON_KEY,
    ):
        self.client = create_client(supabase_url, supabase_key)

    @abstractmethod
    def get(self, id: str) -> T:
        raise NotImplementedError

    @abstractmethod
    def get_all(self) -> list[T]:
        raise NotImplementedError

    @abstractmethod
    def add(self, item: T) -> None:
        raise NotImplementedError

    @abstractmethod
    def update(self, item: T) -> None:
        raise NotImplementedError

    @abstractmethod
    def delete(self, id: int) -> None:
        raise NotImplementedError
