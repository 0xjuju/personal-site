from functools import lru_cache
import re
from typing import Annotated

from pydantic_settings import BaseSettings, SettingsConfigDict


POSTGRES_SYNC = "postgresql+psycopg2"
POSTGRES_ASYNC = "postgresql+asyncpg"


class Settings(BaseSettings):
    secret_key: str
    revalidation_key: str
    api_v1_str: str = "/api"

    database_url: Annotated[str, "Heroku-style Postgres URL"]

    db_url_sync: str = ""
    db_url_async: str = ""
    redis_cloud_url: str = "redis://redis:6379/0"
    redi_url: str = ""

    frontend_internal: str = ""

    def model_post_init(self, _):
        base = re.sub(r"^postgres://", "postgresql://", self.database_url, count=1)

        self.db_url_sync = re.sub(r"^postgresql://", f"{POSTGRES_SYNC}://", base, 1)
        self.db_url_async = re.sub(r"^postgresql://", f"{POSTGRES_ASYNC}://", base, 1)

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()
