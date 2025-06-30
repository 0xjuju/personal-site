from app.core.database import Base
from sqlalchemy import String, Integer, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


class About(Base):
    __tablename__ = "about"
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), unique=True
    )
    top_header: Mapped[str] = mapped_column(String(25), default="")
    top_description: Mapped[str] = mapped_column(Text, default="")
    bottom_header: Mapped[str] = mapped_column(String(25), default="")
    bottom_description: Mapped[str] = mapped_column(Text, default="")
    img: Mapped[str] = mapped_column(String, default="")

    user = relationship("User", back_populates="about")
    stories = relationship("Story", back_populates="about", cascade="all, delete-orphan", order_by="Story.order")


class Story(Base):
    __tablename__ = "story"
    title: Mapped[str] = mapped_column(String(25), default="")
    order: Mapped[int] = mapped_column(Integer, default=1)
    about_id: Mapped[int] = mapped_column(
        ForeignKey("about.id", ondelete="CASCADE")
    )
    about = relationship("About", back_populates="stories")
    slides = relationship("Slide", back_populates="story", cascade="all, delete-orphan", order_by="Slide.page")

    def __str__(self):
        return f"{self.title}"


class Slide(Base):
    __tablename__ = "slide"
    text: Mapped[str] = mapped_column(Text, default="")
    page: Mapped[int] = mapped_column(Integer, default=1)
    story_id: Mapped[int] = mapped_column(
        ForeignKey("story.id", ondelete="CASCADE")
    )
    story = relationship("Story", back_populates="slides")

    @property
    def name(self) -> str:
        return f"{self.story} - {self.text[0:15]}...{self.text[-15:]}"
