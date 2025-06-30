from typing import List
from pydantic import BaseModel


class Slide(BaseModel):
    id:   int
    text: str
    page: int

    class Config:
        from_attributes = True


class Story(BaseModel):
    id:    int
    title: str
    order: int
    slides: List[Slide]

    class Config:
        from_attributes = True


class About(BaseModel):
    id: int
    top_header: str
    top_description: str
    bottom_header: str
    bottom_description: str
    img: str
    stories: List[Story]

    class Config:
        from_attributes = True
