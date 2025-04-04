# api/models/student.py

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from api.db import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    classroom_id = Column(Integer, ForeignKey("classrooms.id"))

    classroom = relationship("Classroom", back_populates="students")
    enrollments = relationship("Enrollment", back_populates="student")
    payments = relationship("Finance", backref="student")

    def __repr__(self):
        return f"<Student {self.id}: {self.name}, Age: {self.age}>"
