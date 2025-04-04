from sqlalchemy import Column, Integer, String, Float
from lib.db import Base, session

class Finance(Base):
    __tablename__ = 'finances'

    id = Column(Integer, primary_key=True)
    description = Column(String)
    amount = Column(Float)
    type = Column(String)  # "income" or "expense"

    def __repr__(self):
        return f"<Finance {self.id}: {self.type.title()} - {self.description} (${self.amount})>"

    def save(self):
        session.add(self)
        session.commit()

    def delete(self):
        session.delete(self)
        session.commit()

    @classmethod
    def create(cls, description, amount, type):
        record = cls(description=description, amount=amount, type=type)
        record.save()
        return record

    @classmethod
    def get_all(cls):
        return session.query(cls).all()
