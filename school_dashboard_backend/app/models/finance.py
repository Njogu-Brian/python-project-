from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.models.base import Base

class Finance(Base):
    __tablename__ = "finance"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    amount = Column(Integer, nullable=False)
    type = Column(String, nullable=False)  
    date = Column(Date, nullable=False)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=True)
    teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=True)

    student = relationship("Student", back_populates="transactions")
    teacher = relationship("Teacher", back_populates="transactions")
