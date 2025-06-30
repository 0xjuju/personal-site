from app.models import Info
from app.schemas.contact import InfoOut
from app.core.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(prefix="/contact", tags=["contact"])


@router.get("", response_model=InfoOut)
async def get_contact_info(db: AsyncSession = Depends(get_db)):
    stmt = select(Info).order_by(Info.order)
    result = await db.execute(stmt)
    info = result.scalars().first()
    return info
