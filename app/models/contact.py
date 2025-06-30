from app.core.database import Base
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column


class Info(Base):
    __tablename__ = "info"

    email: Mapped[str] = mapped_column(String(100), unique=True, default="")
    linked_in: Mapped[str] = mapped_column(String(100),  default="")
    calendly: Mapped[str] = mapped_column(String(100),  default="")
    location: Mapped[str] = mapped_column(String(30),  default="")
    citizenship: Mapped[str] = mapped_column(String(75),  default="")
    github: Mapped[str] = mapped_column(String(100),  default="")
    resume_download: Mapped[str] = mapped_column(String(75),  default="")
    order: Mapped[int] = mapped_column(Integer, default=1)






