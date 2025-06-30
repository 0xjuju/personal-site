from typing import List

from typing import Optional
from pydantic import BaseModel, Field


class ConfigOrm:
    orm_mode = True
    validate_assignment = True


# ---------------------------------------------------------------------------
# CTABox
# ---------------------------------------------------------------------------

class CTABoxBase(BaseModel):
    title: str = Field("", max_length=50)
    description: str = Field("")
    href: str = Field("", max_length=50)
    href_text: str = Field("", max_length=50)
    order: int = 1

    class Config(ConfigOrm):
        pass


class CTABoxOut(CTABoxBase):
    id: int


class CTABoxCreate(CTABoxBase):
    pass


class CTABoxUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    href: Optional[str] = None
    href_text: Optional[str] = None
    order: Optional[int] = None

    class Config(ConfigOrm):
        pass


class TimelineBase(BaseModel):
    title: str = Field("", max_length=50)
    year_range: str = Field("", max_length=50)
    summary: str = Field("")
    order: int = 1

    class Config(ConfigOrm):
        pass


class TimelineOut(TimelineBase):
    id: int


class TimelineCreate(TimelineBase):
    pass


class TimelineUpdate(BaseModel):
    title: Optional[str] = None
    year_range: Optional[str] = None
    summary: Optional[str] = None
    order: Optional[int] = None

    class Config(ConfigOrm):
        pass


class HomeOut(BaseModel):
    cta: List[CTABoxOut]
    timeline: List[TimelineOut]

    class Config:
        orm_mode = True