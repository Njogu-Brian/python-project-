from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base
from app.database import Base, engine, get_db 

class Finance(Base):
    __tablename__ = "finances"

    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    amount_paid = Column(Float, nullable=False)

    student = relationship("Student")
