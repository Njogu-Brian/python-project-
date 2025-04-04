from sqlalchemy import Column, Integer, String
from lib.db import Base, session

class Staff(Base):
    __tablename__ = "staff"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    role = Column(String)

    def __repr__(self):
        return f"<Staff {self.id}: {self.name} - {self.role}>"

    @classmethod
    def create(cls, name, role):
        staff = cls(name=name, role=role)
        session.add(staff)
        session.commit()
        return staff

    @classmethod
    def get_all(cls):
        return session.query(cls).all()

    def delete(self):
        session.delete(self)
        session.commit()
