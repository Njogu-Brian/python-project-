from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.models.base import Base

class Classroom(Base):
    __tablename__ = "classrooms"

    id = Column(Integer, primary_key=True, index=True)
    section = Column(String, nullable=False)
    name = Column(String, nullable=False)

    students = relationship("Student", back_populates="classroom")
