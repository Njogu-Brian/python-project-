from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.models.base import Base
from app.database import Base, engine, get_db 


class Classroom(Base):
    __tablename__ = "classrooms"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    section = Column(String, nullable=True)

    students = relationship("Student", back_populates="classroom")
