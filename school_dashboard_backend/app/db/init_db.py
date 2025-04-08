from app.db.session import engine
from app.models.base import Base
from app.models import student, teacher, course, finance

def init_db():
    Base.metadata.create_all(bind=engine)
