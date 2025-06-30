from app.core.database import get_db
from app.models import Project
from app.schemas.project import Project as ProjectOut
from fastapi import APIRouter, Depends
from fastapi_limiter.depends import RateLimiter
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=list[ProjectOut], dependencies=[Depends(RateLimiter(times=10, seconds=60))])
async def read_projects(db: AsyncSession = Depends(get_db)):

    result = await db.execute(select(Project).order_by(Project.order))
    projects = result.scalars().all()
    return projects

