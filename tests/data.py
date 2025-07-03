# tests/data.py

from app.models.user import User
from app.models.about import About, Story, Slide
from sqlalchemy.ext.asyncio import AsyncSession


async def seed_about(session: AsyncSession) -> User:
    user = User(email="test@example.com", is_admin=True, hashed_password="notreal", first_name="Jay", last_name="K")
    session.add(user)
    await session.flush()

    about = About(
        user_id=user.id,
        top_header="About Top",
        top_description="This is the top section",
        bottom_header="About Bottom",
        bottom_description="This is the bottom section",
        img="me.png",
    )
    session.add(about)
    await session.flush()  # get about.id populated

    story = Story(title="First Story", order=1, about_id=about.id)
    session.add(story)
    await session.flush()

    slide1 = Slide(text="Slide one content", page=1, story_id=story.id)
    slide2 = Slide(text="Slide two content", page=2, story_id=story.id)
    session.add_all([slide1, slide2])

    await session.commit()
    return user
