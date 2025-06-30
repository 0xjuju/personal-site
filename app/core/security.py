from fastapi import Request, HTTPException
from passlib.context import CryptContext
import secrets


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

