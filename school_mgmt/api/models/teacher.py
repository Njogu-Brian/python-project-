# api/models/teacher.py

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from api.db import Base

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    subject = Column(String, nullable=False)

    classroom_id = Column(Integer, ForeignKey("classrooms.id"), nullable=False)

    # Optional: define a relationship to Classroom (not strictly required)
    classroom = relationship("Classroom", back_populates="teachers")

    def __repr__(self):
        return f"<Teacher {self.id}: {self.name}, Subject: {self.subject}>"
