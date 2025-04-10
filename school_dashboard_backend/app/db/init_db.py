from sqlalchemy import create_engine
from app.models.base import Base  # Import Base from your models
from app.models import student, teacher, course, finance, classroom  # Make sure all models are imported

DATABASE_URL = "sqlite:///./school.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

def init_db():
    Base.metadata.create_all(bind=engine)
