from app.db.database import Base, engine
from app.models import student, teacher, course, classroom, finance

def init_db():
    Base.metadata.create_all(bind=engine)
