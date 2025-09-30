# https://docs.pydantic.dev/latest/concepts/pydantic_settings
import os
from typing import Optional

from pydantic import Field
from pydantic_settings import BaseSettings

print("SUPABASE_PROJECT_API_URL:", os.getenv("SUPABASE_PROJECT_API_URL"))


class SupabaseSettings(BaseSettings):
    """Settings related to Supabase configuration."""

    API_URL: str
    DB_URL: str
    ANON_KEY: str
    SERVICE_ROLE_KEY: Optional[str] = None

    class Config:
        env_file = ".env"
        extra = "allow"
        case_sensitive = True


class LocalSupabaseSettings(SupabaseSettings):
    """Settings for local Supabase instance."""

    class Config:
        env_prefix = "SUPABASE_LOCAL_"
        extra = "allow"
        case_sensitive = True


class ProjectSupabaseSettings(SupabaseSettings):
    """Settings for cloud Supabase project."""

    class Config:
        env_prefix = "SUPABASE_PROJECT_"
        extra = "allow"
        case_sensitive = True


class VectorStoreSettings(BaseSettings):
    """Settings for vector store configuration."""

    PATH: str = Field(default="server/db/embeddings/ivy_vector_store")
    COLLECTION_NAME: str = Field(default="ivy_collections")

    class Config:
        env_prefix = "VECTOR_STORE_"
        extra = "allow"
        case_sensitive = True


class SplitterSettings(BaseSettings):
    """Settings for text splitter configuration."""

    TEXT_CHUNK_SIZE: int = Field(default=500)
    TEXT_CHUNK_OVERLAP: int = Field(default=200, env="CHUNK_OVERLAP")
    JSON_MAX_CHUNK_SIZE: int = Field(default=500)

    class Config:
        env_prefix = "SPLITTER_"
        env_file = ".env"
        extra = "allow"
        case_sensitive = True


class EvaluationSettings(BaseSettings):
    """Settings for evaluation."""

    USER_PASSWORD: str = Field(env="USER_PASSWORD")
    PAYMENT_OPTION_ID: str = Field(env="PAYMENT_OPTION_ID")
    # USER_1_EMAIL: str = Field(env="USER_1_EMAIL")
    # USER_1_ORDER_STATUS_DELIVERED_FOR_RETURN: str = Field(
    #     env="USER_1_ORDER_STATUS_DELIVERED_FOR_RETURN"
    # )

    # # User use to test order agent
    # USER_2_EMAIL: str = Field(env="USER_2_EMAIL")
    # USER_2_ORDER_FOR_GET_DETAIL: str = Field(env="USER_2_ORDER_FOR_GET_DETAIL")
    # USER_2_ORDER_STATUS_PENDING_CONFIRM_FOR_CANCEL: str = Field(
    #     env="USER_2_ORDER_STATUS_PENDING_CONFIRM_FOR_CANCEL"
    # )
    # USER_2_ORDER_STATUS_DELIVERED_FOR_RETURN: str = Field(
    #     env="USER_2_ORDER_STATUS_DELIVERED_FOR_RETURN"
    # )
    # USER_2_ORDER_STATUS_PENDING_CONFIRM_FOR_RETURN_NOT_ALLOW: str = Field(
    #     env="USER_2_ORDER_STATUS_PENDING_CONFIRM_FOR_RETURN_NOT_ALLOW"
    # )

    class Config:
        env_prefix = "EVAL_"
        env_file = ".env"
        extra = "allow"
        case_sensitive = True


class Settings(BaseSettings):
    """Main application settings."""

    SERVER_FOLDER: str = "server"
    KNOWLEDGE_BASE_FOLDER: str = Field(default="data/knowledge_base")

    supabase: SupabaseSettings = ProjectSupabaseSettings()
    vector_store: VectorStoreSettings = VectorStoreSettings()
    splitter: SplitterSettings = SplitterSettings()
    eval: EvaluationSettings = EvaluationSettings()

    class Config:
        env_file = ".env"
        extra = "allow"
        case_sensitive = True


settings = Settings()
