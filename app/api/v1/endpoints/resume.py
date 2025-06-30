from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.resume import Resume, Skill, WorkSegment
from app.schemas.resume import ResumeOut


router = APIRouter(prefix="/resume", tags=["resume"])


@router.get("", response_model=ResumeOut)
async def read_resume(db: AsyncSession = Depends(get_db)):

    stmt = (
        select(Resume)
        .options(
            # Resume.skills -> Skill.skills_expanded
            selectinload(Resume.skills)
            .selectinload(Skill.skills_expanded),

            # Resume.work_segments -> WorkSegment.more_bullets
            selectinload(Resume.work_segments)
            .selectinload(WorkSegment.more_bullets),
        )
        .order_by(Resume.id)
        .limit(1)
    )

    result = await db.execute(stmt)
    resume = result.scalars().unique().first()

    return resume
