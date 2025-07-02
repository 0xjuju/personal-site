from fastapi import Request, HTTPException, status
from sqladmin.authentication import AuthenticationBackend
from sqlalchemy import select

from app.core.database import AsyncSessionLocal
from app.core.security import verify_password
from app.models.user import User


class AdminAuth(AuthenticationBackend):
    """
    Admin authentication
    • authenticate() → called on every /admin-login request
    • login()  → called by /admin-login/login POST
    • logout() → called by /admin-login/logout GET
    """

    # Main gate (every request)
    async def authenticate(self, request: Request) -> bool:
        return bool(request.session.get("is_admin") is True)

    # /admin/login
    async def login(self, request: Request) -> bool:
        form = await request.form()
        email: str | None = form.get("username")
        password: str | None = form.get("password")

        if not (email and password):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Missing credentials")

        async with AsyncSessionLocal() as session:
            result = await session.execute(select(User).where(User.email == email))
            user: User | None = result.scalar_one_or_none()

        if not user or not user.is_admin or not verify_password(password, user.hashed_password):
            return False

        request.session["is_admin"] = True
        request.session["user_id"] = user.id
        return True

    # /admin/logout
    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True
