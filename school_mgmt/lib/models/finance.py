from sqlalchemy import Column, Integer, String, Float, ForeignKey
from lib.db import Base, session
from lib.models.student import Student

class Finance(Base):
    __tablename__ = "finance"

    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    term = Column(String)
    amount_paid = Column(Float)

    def __repr__(self):
        return f"<Finance {self.id}: Student ID {self.student_id}, Term {self.term}, Paid: {self.amount_paid}>"

    @classmethod
    def create(cls, student_id, term, amount_paid):
        f = cls(student_id=student_id, term=term, amount_paid=amount_paid)
        session.add(f)
        session.commit()
        return f

    @classmethod
    def get_all(cls):
        return session.query(cls).all()

    def delete(self):
        session.delete(self)
        session.commit()
