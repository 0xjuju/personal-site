from app.core.database import AsyncSessionLocal
from app.core.security import verify_password
from app.models.user import User
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi_limiter.depends import RateLimiter
from sqlalchemy import select


router = APIRouter()


@router.post("/login", dependencies=[Depends(RateLimiter(times=10, seconds=60))])
async def login(request: Request, response: Response):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")

    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(User).where(User.email == email)
        )
        user = result.scalar_one_or_none()

    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    request.session["user_id"] = user.id
    request.session["is_admin"] = user.is_admin
    return {"message": "Logged in"}
