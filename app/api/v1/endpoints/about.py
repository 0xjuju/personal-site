from app.core.database import get_db
from app.models.about import About, Story
from app.schemas.about import About as AboutOut
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload


router = APIRouter(prefix="/about", tags=["about"])


@router.get("", response_model=AboutOut)
async def read_about(db: AsyncSession = Depends(get_db)):
    stmt = (
        select(About)
        .options(
            selectinload(About.stories)
            .selectinload(Story.slides)
        )
    )

    result = await db.execute(stmt)
    about = result.scalars().unique().all()

    return about[0]
