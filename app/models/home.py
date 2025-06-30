from app.core.database import Base
from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column


class CTABox(Base):
    __tablename__ = "ctabox"
    title: Mapped[str] = mapped_column(String(50), default="")
    description: Mapped[str] = mapped_column(Text, default="")
    href: Mapped[str] = mapped_column(String(50), default="")
    href_text: Mapped[str] = mapped_column(String(50), default="")
    order: Mapped[int] = mapped_column(Integer, default=1)

    def __str__(self):
        return self.title


class Timeline(Base):
    __tablename__ = "timeline"
    title: Mapped[str] = mapped_column(String(50), default="")
    year_range: Mapped[str] = mapped_column(String(50), default="")
    summary: Mapped[str] = mapped_column(Text, default="")
    order: Mapped[int] = mapped_column(Integer, default=1)

    def __string__(self):
        return self.title



