from sqlalchemy import Column, Integer, String
from api.database import Base

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    instructor = Column(String, nullable=False)
    duration = Column(Integer, nullable=False)
