from app.core.config import get_settings
from fastapi import Depends, Request, HTTPException
from fastapi_limiter.depends import RateLimiter
from passlib.context import CryptContext
import secrets


settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)


async def is_logged_in(request: Request):
    if not request.session.get("is_admin"):
        raise HTTPException(status_code=403, detail="Not authenticated")


def generate_secret_key(length: int = 64) -> str:

    # Each byte becomes ~1.33 chars > overshoot then truncate
    raw = secrets.token_urlsafe(length)
    return raw[:length]


def rate_limiter():
    if settings.debug is True:
        return Depends(RateLimiter(times=10, seconds=60))
    else:
        async def skip_dep():
            return

        return Depends(skip_dep)


