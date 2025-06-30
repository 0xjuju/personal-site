import enum
from typing import List

from app.core.database import Base
from sqlalchemy import Boolean, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship


class WorkType(enum.Enum):
    HYBRID = "Hybrid"
    REMOTE = "Remote"
    ONSITE = "Onsite"


class Resume(Base):
    __tablename__ = "resume"
    title: Mapped[str] = mapped_column(String(50), default="")
    summary_header: Mapped[str] = mapped_column(String(50), default="")
    summary: Mapped[str] = mapped_column(Text, default="")
    skills_header: Mapped[str] = mapped_column(String(50), default="")
    work_header: Mapped[str] = mapped_column(String(50), default="")
    skills: Mapped[List["Skill"]] = relationship(back_populates="resume")
    work_segments: Mapped[List["WorkSegment"]] = relationship(cascade="all, delete-orphan", back_populates="resume",
                                                              order_by="WorkSegment.order")


class Skill(Base):
    __tablename__ = "skill"
    name: Mapped[str] = mapped_column(String(50), default="")
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    order: Mapped[int] = mapped_column(Integer, default=1)
    resume_id: Mapped[int] = mapped_column(ForeignKey(Resume.id, ondelete="CASCADE"))
    resume = relationship("Resume", back_populates="skills")
    skills_expanded: Mapped[List["SkillDescription"]] = relationship(cascade="all, delete-orphan", back_populates="skill",
                                                               order_by="SkillDescription.order")

    def __str__(self):
        return self.name


class SkillDescription(Base):
    __tablename__ = "skilldescription"
    value: Mapped[str] = mapped_column(Text, default="")
    skill_id: Mapped[int] = mapped_column(ForeignKey(Skill.id, ondelete="CASCADE"))
    skill: Mapped["Skill"] = relationship(back_populates="skills_expanded")
    order: Mapped[int] = mapped_column(Integer, default=1)

    @property
    def preview(self):
        return f"{self.value[0:15]}...{self.value[-15:]}"


class WorkSegment(Base):
    __tablename__ = "worksegment"
    company: Mapped[str] = mapped_column(String(50), default="")
    href: Mapped[str] = mapped_column(String(50), default="")
    title: Mapped[str] = mapped_column(String(50), default="")
    work_range: Mapped[str] = mapped_column(String(50), default="")
    location: Mapped[str] = mapped_column(String(50), default="")
    work_type: Mapped[str] = mapped_column(Enum(WorkType), default=WorkType.REMOTE)
    summary: Mapped[str] = mapped_column(Text, default="")
    bullet_1: Mapped[str] = mapped_column(Text, default="")
    bullet_2: Mapped[str] = mapped_column(Text, default="")
    bullet_3: Mapped[str] = mapped_column(Text, default="")
    order: Mapped[int] = mapped_column(Integer, default=1)
    button_text: Mapped[str] = mapped_column(String(25), default="")
    resume_id: Mapped[int] = mapped_column(ForeignKey(Resume.id, ondelete="CASCADE"))
    resume: Mapped["Resume"] = relationship(back_populates="work_segments")
    more_bullets: Mapped[List["WorkSegmentExpansion"]] = relationship(cascade="all, delete-orphan",
                                                                back_populates="work_segment",
                                                                order_by="WorkSegmentExpansion.order")

    def __str__(self):
        return self.company


class WorkSegmentExpansion(Base):
    __tablename__ = "worksegmentexpansion"
    bullet: Mapped[str] = mapped_column(String, default="")
    work_segment_id: Mapped[int] = mapped_column(ForeignKey(WorkSegment.id, ondelete="CASCADE"))
    work_segment: Mapped["WorkSegment"] = relationship(back_populates="more_bullets")
    order: Mapped[int] = mapped_column(Integer, default=1)








