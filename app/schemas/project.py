from pydantic import BaseModel


class Project(BaseModel):
    id: int
    title: str
    href: str
    href_name: str
    description: str
    order: int

    class Config:
        from_attributes = True




