# api/models/classroom.py

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from api.db import Base

class Classroom(Base):
    __tablename__ = "classrooms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False)

    # Relationships
    students = relationship("Student", back_populates="classroom")
    teachers = relationship("Teacher", back_populates="classroom")

    def __repr__(self):
        return f"<Classroom {self.id}: {self.name}, Capacity: {self.capacity}>"
