# lib/models/classroom.py

from sqlalchemy import Column, Integer, String
from lib.db import Base, session
from sqlalchemy.orm import relationship

class Classroom(Base):
    __tablename__ = 'classrooms'

    id = Column(Integer, primary_key=True)
    _name = Column("name", String)
    _capacity = Column("capacity", Integer)

    students = relationship("Student", back_populates="classroom")

    def __init__(self, name, capacity):
        self.name = name
        self.capacity = capacity

    def __repr__(self):
        return f"<Classroom {self.id}: {self.name}, Capacity: {self.capacity}>"

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if isinstance(value, str) and len(value.strip()):
            self._name = value
        else:
            raise ValueError("Name must be a non-empty string.")

    @property
    def capacity(self):
        return self._capacity

    @capacity.setter
    def capacity(self, value):
        if isinstance(value, int) and value > 0:
            self._capacity = value
        else:
            raise ValueError("Capacity must be a positive integer.")

    # ORM Methods
    def save(self):
        session.add(self)
        session.commit()

    def delete(self):
        session.delete(self)
        session.commit()

    @classmethod
    def create(cls, name, capacity):
        classroom = cls(name=name, capacity=capacity)
        classroom.save()
        return classroom

    @classmethod
    def get_all(cls):
        return session.query(cls).all()

    @classmethod
    def find_by_id(cls, id):
        return session.query(cls).filter_by(id=id).first()
