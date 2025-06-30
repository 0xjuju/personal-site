from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models import CTABox, Timeline
from app.schemas.home import HomeOut

router = APIRouter(prefix="/home", tags=["home"])


@router.get("", response_model=HomeOut)
async def read_home(db: AsyncSession = Depends(get_db)):

    cta_boxes = (await db.execute(select(CTABox).order_by(CTABox.order))).scalars().all()
    timelines = (await db.execute(select(Timeline).order_by(Timeline.order))).scalars().all()

    return {"cta": cta_boxes, "timeline": timelines}
