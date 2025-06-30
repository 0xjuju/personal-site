from sqladmin import ModelView

from app.models.about import About, Slide, Story
from app.models.contact import Info
from app.models.home import CTABox, Timeline
from app.models.project import Project
from app.models.resume import *
from app.models.user import User



class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.first_name, User.last_name, User.email, User.is_admin]
    form_columns = [User.first_name, User.last_name, User.email, User.hashed_password, User.is_admin]


class AboutAdmin(ModelView, model=About):
    column_list = [About.id, About.top_header, About.bottom_header]


class StoryAdmin(ModelView, model=Story):
    column_list = [Story.id, Story.title, Story.order, Story.about_id]


class SlideAdmin(ModelView, model=Slide):
    column_list = ["name", Slide.page]
    column_display_pk = False


class ProjectAdmin(ModelView, model=Project):
    column_list = ["title", "href", "href_name", "order"]


class ResumeAdmin(ModelView, model=Resume):
    pass


class SkillAdmin(ModelView, model=Skill):
    column_list = ["name", "featured", "order"]


class SkillDescriptionAdmin(ModelView, model=SkillDescription):
    column_list = ["skill", "preview", "order"]


class WorkSegmentAdmin(ModelView, model=WorkSegment):
    column_list = ["company", "order"]


class WorkSegmentExpansionAdmin(ModelView, model=WorkSegmentExpansion):
    column_list = ["bullet", "order"]


class CTABoxAdmin(ModelView, model=CTABox):
    column_list = ["title", "description", "order"]


class TimelineAdmin(ModelView, model=Timeline):
    column_list = ["title", "year_range", "summary", "order"]

class InfoAdmin(ModelView, model=Info):
    column_list = ["email", "linkedin", "calendly", "github", "resume_download", "order"]