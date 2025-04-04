# api/models/finance.py

from sqlalchemy import Column, Integer, Float, String, ForeignKey
from api.db import Base

class Finance(Base):
    __tablename__ = "finance"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    term = Column(String, nullable=False)
    amount_paid = Column(Float, nullable=False)

    def __repr__(self):
        return f"<Finance {self.id}: Student {self.student_id}, Term {self.term}, Paid: {self.amount_paid}>"
