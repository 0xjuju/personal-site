from fastapi import APIRouter, Depends, Request
from fastapi_limiter.depends import RateLimiter


router = APIRouter()


@router.post("/logout", dependencies=[Depends(RateLimiter(times=10, seconds=60))])
async def logout(request: Request):
    request.session.clear()
    return {"message": "Logged out"}


