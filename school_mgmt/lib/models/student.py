# lib/models/student.py

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from lib.db import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    age = Column(Integer)
    grade = Column(String)

    enrollments = relationship("Enrollment", back_populates="student", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Student {self.id}: {self.name}, Grade: {self.grade}>"

    # Validations
    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if isinstance(value, str) and value.strip():
            self._name = value.strip()
        else:
            raise ValueError("Name must be a non-empty string")
