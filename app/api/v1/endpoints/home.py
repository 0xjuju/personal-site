from app.core.database import get_db
from app.models import CTABox, Timeline
from app.schemas.home import HomeOut
from fastapi import APIRouter, Depends
from fastapi_limiter.depends import RateLimiter
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(prefix="/home", tags=["home"])


@router.get("", response_model=HomeOut, dependencies=[Depends(RateLimiter(times=10, seconds=60))])
async def read_home(db: AsyncSession = Depends(get_db)):

    cta_boxes = (await db.execute(select(CTABox).order_by(CTABox.order))).scalars().all()
    timelines = (await db.execute(select(Timeline).order_by(Timeline.order))).scalars().all()

    return {"cta": cta_boxes, "timeline": timelines}
