from pydantic import BaseModel, EmailStr


class InfoOut(BaseModel):
    id: int
    email: EmailStr
    linked_in: str
    calendly: str
    location: str
    citizenship: str
    github: str
    resume_download: str
    order: int

    class Config:
        from_attributes = True
