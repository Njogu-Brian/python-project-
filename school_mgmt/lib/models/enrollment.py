# lib/models/enrollment.py

from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from lib.db import Base

class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    classroom_id = Column(Integer, ForeignKey("classrooms.id"), nullable=False)
    status = Column(String)

    student = relationship("Student", back_populates="enrollments")
    classroom = relationship("Classroom", back_populates="enrollments")

    def __repr__(self):
        return f"<Enrollment {self.id}: Student {self.student_id} -> Classroom {self.classroom_id}>"

    @property
    def status(self):
        return self._status

    @status.setter
    def status(self, value):
        if value in ["active", "completed", "dropped"]:
            self._status = value
        else:
            raise ValueError("Status must be one of: active, completed, dropped")
