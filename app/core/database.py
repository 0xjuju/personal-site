
from .config import get_settings
from sqlalchemy import Integer
from sqlalchemy.ext.asyncio import (create_async_engine, async_sessionmaker, AsyncSession)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


settings = get_settings()
engine = create_async_engine(settings.db_url_async, echo=False, future=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)


async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session

