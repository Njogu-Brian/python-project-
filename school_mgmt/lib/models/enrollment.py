# lib/models/enrollment.py

from sqlalchemy import Column, Integer, String, ForeignKey
from lib.db import Base, session
from sqlalchemy.orm import relationship
from datetime import datetime

class Enrollment(Base):
    __tablename__ = 'enrollments'

    id = Column(Integer, primary_key=True)
    year = Column(Integer)
    summary = Column(String)

    student_id = Column(Integer, ForeignKey('students.id'))
    student = relationship("Student", back_populates="enrollments")

    def __init__(self, year, summary, student_id):
        self.year = year
        self.summary = summary
        self.student_id = student_id

    def __repr__(self):
        return f"<Enrollment {self.id} - {self.year}: {self.summary}>"

    def save(self):
        session.add(self)
        session.commit()

    def delete(self):
        session.delete(self)
        session.commit()

    @classmethod
    def create(cls, year, summary, student_id):
        enrollment = cls(year, summary, student_id)
        enrollment.save()
        return enrollment

    @classmethod
    def get_all(cls):
        return session.query(cls).all()

    @classmethod
    def find_by_id(cls, id):
        return session.query(cls).filter_by(id=id).first()
