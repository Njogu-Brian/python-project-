# api/models/models.py

from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from api.db import Base

class Classroom(Base):
    __tablename__ = 'classrooms'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    capacity = Column(Integer)

    students = relationship("Student", back_populates="classroom")
    teachers = relationship("Teacher", back_populates="classroom")


class Student(Base):
    __tablename__ = 'students'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age = Column(Integer)
    classroom_id = Column(Integer, ForeignKey("classrooms.id"))

    classroom = relationship("Classroom", back_populates="students")
    enrollments = relationship("Enrollment", back_populates="student")
    payments = relationship("Finance", back_populates="student")


class Teacher(Base):
    __tablename__ = 'teachers'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    subject = Column(String)
    classroom_id = Column(Integer, ForeignKey("classrooms.id"))

    classroom = relationship("Classroom", back_populates="teachers")


class Staff(Base):
    __tablename__ = 'staff'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)


class Finance(Base):
    __tablename__ = 'finance'
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    term = Column(String)
    amount_paid = Column(Float)

    student = relationship("Student", back_populates="payments")


class Enrollment(Base):
    __tablename__ = 'enrollments'
    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer)
    summary = Column(String)
    student_id = Column(Integer, ForeignKey("students.id"))

    student = relationship("Student", back_populates="enrollments")
