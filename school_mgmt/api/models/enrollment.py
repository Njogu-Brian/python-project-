# api/models/enrollment.py

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from api.db import Base

class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer, nullable=False)
    summary = Column(String, nullable=True)

    # Foreign key to Student
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)

    # Relationship back to student
    student = relationship("Student", back_populates="enrollments")

    def __repr__(self):
        return f"<Enrollment {self.id}: Student ID {self.student_id}, Year {self.year}, Summary: {self.summary}>"
