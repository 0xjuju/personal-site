from app.admin.auth import AdminAuth
from app.admin.views import *
from app.api.v1.api import api_router
from app.core.config import get_settings
from app.core.database import engine
from fastapi import FastAPI
from fastapi_limiter import FastAPILimiter
from fastapi.middleware.cors import CORSMiddleware
import redis.asyncio as redis
from sqladmin import Admin
from starlette.middleware.sessions import SessionMiddleware


settings = get_settings()
app = FastAPI(title="Portfolio API")

origins = [
    "https://jermol.dev",
    "https://www.jermol.dev",
    "http://localhost:3000",
]

app.add_middleware(
    SessionMiddleware,
    secret_key=settings.secret_key
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.api_v1_str)


admin = Admin(app, engine, authentication_backend=AdminAuth(settings.secret_key))

views = [
    UserAdmin,
    AboutAdmin,
    StoryAdmin,
    SlideAdmin,
    ProjectAdmin,
    ResumeAdmin,
    SkillAdmin,
    SkillDescriptionAdmin,
    WorkSegmentAdmin,
    WorkSegmentExpansionAdmin,
    CTABoxAdmin,
    TimelineAdmin,
    InfoAdmin
]

for view in views:
    admin.add_view(view)


@app.on_event("startup")
async def startup():

    redis_conn = redis.from_url(
        settings.rediscloud_url, encoding="utf8", decode_responses=True
    )

    await FastAPILimiter.init(redis_conn, prefix="rl")



