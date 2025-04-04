# lib/models/classroom.py

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from lib.db import Base

class Classroom(Base):
    __tablename__ = "classrooms"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    subject = Column(String)

    enrollments = relationship("Enrollment", back_populates="classroom", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Classroom {self.id}: {self.name} - {self.subject}>"

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if isinstance(value, str) and value.strip():
            self._name = value.strip()
        else:
            raise ValueError("Name must be a non-empty string")
