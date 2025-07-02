from fastapi import APIRouter, Request, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.user import User
from app.core.security import verify_password
from sqlalchemy import select

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.post("/login")
async def admin_login(request: Request, db: AsyncSession = Depends(get_db)):
    body = await request.json()
    email: str | None = body.get("email")
    password: str | None = body.get("password")

    if not (email and password):
        raise HTTPException(status_code=400, detail="Missing credentials")

    result = await db.execute(select(User).where(User.email == email))
    user: User | None = result.scalar_one_or_none()

    if not user or not user.is_admin or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    request.session["is_admin"] = True
    request.session["user_id"] = user.id
    return {"message": "Admin login successful"}


@router.post("/logout")
async def admin_logout(request: Request):
    request.session.clear()
    return {"message": "Admin logged out"}
