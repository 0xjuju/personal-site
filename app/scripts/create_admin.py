
import os
import sys
import asyncio
import argparse
import app.models


ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(ROOT)

from app import models

from app.core.database import AsyncSessionLocal
from app.core.security import hash_password, verify_password
from app.models.user import User
from sqlalchemy import select


async def create_or_update_admin(email: str, password: str) -> None:
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.email == email))
        user: User | None = result.scalar_one_or_none()

        if user:
            if verify_password(password, user.hashed_password):
                print(f"✅ Admin user '{email}' already exists and password matches.")
                return
            user.hashed_password = hash_password(password)
            user.is_admin = True
            action = "updated"
        else:
            user = User(
                first_name="Jermol",
                last_name="Jupiter",
                email=email,
                hashed_password=hash_password(password),
                is_admin=True,
            )
            session.add(user)
            action = "created"

        await session.commit()
        print(f"✅ Admin user '{email}' {action} successfully.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Create/Update admin-login user")
    parser.add_argument("--email", required=True, help="Admin e-mail")
    parser.add_argument("--password", required=True, help="Plain-text password")
    args = parser.parse_args()

    asyncio.run(create_or_update_admin(args.email, args.password))


if __name__ == "__main__":
    main()
