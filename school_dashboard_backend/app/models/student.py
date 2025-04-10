from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.models.base import Base

# Association table for many-to-many between students and courses
student_course_table = Table(
    "student_courses",
    Base.metadata,
    Column("student_id", ForeignKey("students.id"), primary_key=True),
    Column("course_id", ForeignKey("courses.id"), primary_key=True)
)

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    classroom_id = Column(Integer, ForeignKey("classrooms.id"))

    classroom = relationship("Classroom", back_populates="students")
    courses = relationship("Course", secondary=student_course_table, back_populates="students")
