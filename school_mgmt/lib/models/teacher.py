from sqlalchemy import Column, Integer, String
from lib.db import Base, session

class Teacher(Base):
    __tablename__ = 'teachers'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    subject = Column(String)

    def __repr__(self):
        return f"<Teacher {self.id}: {self.name}, Teaches: {self.subject}>"

    def save(self):
        session.add(self)
        session.commit()

    def delete(self):
        session.delete(self)
        session.commit()

    @classmethod
    def create(cls, name, subject):
        teacher = cls(name=name, subject=subject)
        teacher.save()
        return teacher

    @classmethod
    def get_all(cls):
        return session.query(cls).all()
