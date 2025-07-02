from fastapi import APIRouter
from .endpoints import about, project, resume, home, contact, admin

api_router = APIRouter()
api_router.include_router(about.router)
api_router.include_router(project.router)
api_router.include_router(resume.router)
api_router.include_router(home.router)
api_router.include_router(contact.router)
api_router.include_router(admin.router)
