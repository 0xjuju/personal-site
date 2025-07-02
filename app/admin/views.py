from sqladmin import ModelView

from app.models.about import About, Slide, Story
from app.models.contact import Info
from app.models.home import CTABox, Timeline
from app.models.project import Project
from app.models.resume import *
from app.models.user import User
from app.utils.cache import invalidate_cache


class CacheModelView(ModelView):
    """
    Adds after-save/delete cache invalidation.
    Override `cache_tag` per model or let it default to the table name.
    """
    cache_tag: str | None = None

    async def after_model_change(self, form, model, is_created, request) -> None:
        if self.cache_tag:
            await invalidate_cache(self.cache_tag)

    async def after_model_delete(self, data, model) -> None:
        if self.cache_tag:
            await invalidate_cache(self.cache_tag)


class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.first_name, User.last_name, User.email, User.is_admin]
    form_columns = [User.first_name, User.last_name, User.email, User.hashed_password, User.is_admin]


class AboutAdmin(CacheModelView, model=About):
    column_list = [About.id, About.top_header, About.bottom_header]
    cache_tag = "about"


class StoryAdmin(CacheModelView, model=Story):
    column_list = [Story.id, Story.title, Story.order, Story.about_id]
    cache_tag = "about"


class SlideAdmin(CacheModelView, model=Slide):
    column_list = ["name", Slide.page]
    column_display_pk = False
    cache_tag = "about"


class ProjectAdmin(CacheModelView, model=Project):
    column_list = ["title", "href", "href_name", "order"]
    cache_tag = "projects"


class ResumeAdmin(CacheModelView, model=Resume):
    cache_tag = "resume"


class SkillAdmin(CacheModelView, model=Skill):
    column_list = ["name", "featured", "order"]
    cache_tag = "resume"


class SkillDescriptionAdmin(CacheModelView, model=SkillDescription):
    column_list = ["skill", "preview", "order"]
    cache_tag = "resume"


class WorkSegmentAdmin(CacheModelView, model=WorkSegment):
    column_list = ["company", "order"]
    cache_tag = "resume"


class WorkSegmentExpansionAdmin(CacheModelView, model=WorkSegmentExpansion):
    column_list = ["bullet", "order"]
    cache_tag = "resume"


class CTABoxAdmin(CacheModelView, model=CTABox):
    column_list = ["title", "description", "order"]
    cache_tag = "home"


class TimelineAdmin(CacheModelView, model=Timeline):
    column_list = ["title", "year_range", "summary", "order"]
    cache_tag = "home"


class InfoAdmin(CacheModelView, model=Info):
    column_list = ["email", "linkedin", "calendly", "github", "resume_download", "order"]
    cache_tag = "contact"


