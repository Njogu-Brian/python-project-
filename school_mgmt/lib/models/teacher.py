from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from lib.db import Base, session
from lib.models.classroom import Classroom

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    subject = Column(String)
    classroom_id = Column(Integer, ForeignKey("classrooms.id"))

    classroom = relationship("Classroom", back_populates="teachers")

    def __repr__(self):
        return f"<Teacher {self.id}: {self.name}, {self.subject}>"

    @classmethod
    def create(cls, name, subject, classroom_id):
        teacher = cls(name=name, subject=subject, classroom_id=classroom_id)
        session.add(teacher)
        session.commit()
        return teacher

    @classmethod
    def get_all(cls):
        return session.query(cls).all()

    @classmethod
    def find_by_id(cls, id):
        return session.query(cls).filter_by(id=id).first()

    def delete(self):
        session.delete(self)
        session.commit()

Classroom.teachers = relationship("Teacher", back_populates="classroom", cascade="all, delete-orphan")
