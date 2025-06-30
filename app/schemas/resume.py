import enum
from typing import List

from pydantic import BaseModel


class ConfigOrm:
    orm_mode = True


class WorkTypeEnum(str, enum.Enum):
    HYBRID = "Hybrid"
    REMOTE = "Remote"
    ONSITE = "Onsite"


class SkillDescriptionOut(BaseModel):
    id: int
    value: str
    order: int

    class Config(ConfigOrm):
        pass


class SkillOut(BaseModel):
    id: int
    name: str
    featured: bool
    order: int
    skills_expanded: List[SkillDescriptionOut] = []

    class Config(ConfigOrm):
        pass


class WorkSegmentExpansionOut(BaseModel):
    id: int
    bullet: str
    order: int

    class Config(ConfigOrm):
        pass


class WorkSegmentOut(BaseModel):
    id: int
    company: str
    href: str
    title: str
    work_range: str
    location: str
    work_type: WorkTypeEnum
    summary: str
    bullet_1: str
    bullet_2: str
    bullet_3: str
    order: int
    button_text: str
    more_bullets: List[WorkSegmentExpansionOut] = []

    class Config(ConfigOrm):
        pass


class ResumeOut(BaseModel):
    id: int
    title: str
    summary_header: str
    summary: str
    skills_header: str
    work_header: str
    skills: List[SkillOut] = []
    work_segments: List[WorkSegmentOut] = []

    class Config(ConfigOrm):
        pass
