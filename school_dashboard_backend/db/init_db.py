from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.base import Base
from models import Student, Course

engine = create_engine("sqlite:///school.db")
Session = sessionmaker(bind=engine)
session = Session()

def init_db():
    Base.metadata.create_all(engine)
