# lib/models/student.py

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from lib.db import Base, session

class Student(Base):
    __tablename__ = 'students'

    id = Column(Integer, primary_key=True)
    _name = Column("name", String)
    _age = Column("age", Integer)
    classroom_id = Column(Integer, ForeignKey('classrooms.id'))

    classroom = relationship("Classroom", back_populates="students")
    enrollments = relationship("Enrollment", back_populates="student")

    def __init__(self, name, age, classroom_id=None):
        self.name = name
        self.age = age
        self.classroom_id = classroom_id

    def __repr__(self):
        return f"<Student {self.id}: {self.name}, Age: {self.age}>"

    # Property: name
    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if isinstance(value, str) and len(value.strip()):
            self._name = value
        else:
            raise ValueError("Name must be a non-empty string.")

    # Property: age
    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if isinstance(value, int) and value > 0:
            self._age = value
        else:
            raise ValueError("Age must be a positive integer.")

    # ORM Methods
    def save(self):
        session.add(self)
        session.commit()

    def delete(self):
        session.delete(self)
        session.commit()

    @classmethod
    def create(cls, name, age, classroom_id=None):
        student = cls(name, age, classroom_id)
        student.save()
        return student

    @classmethod
    def get_all(cls):
        return session.query(cls).all()

    @classmethod
    def find_by_id(cls, id):
        return session.query(cls).filter_by(id=id).first()
