from sqlalchemy import String, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Project(Base):
    __tablename__ = "project"
    title: Mapped[str] = mapped_column(String(50), default="")
    href: Mapped[str] = mapped_column(String(50), default="")
    href_name: Mapped[str] = mapped_column(String(50), default="")
    description: Mapped[str] = mapped_column(Text, default="")
    order: Mapped[int] = mapped_column(Integer, default=1)

    def __str__(self):
        return self.title

