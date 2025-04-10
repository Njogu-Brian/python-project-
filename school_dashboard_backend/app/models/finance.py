from sqlalchemy import Column, Integer, String
from app.models.base import Base

class Finance(Base):
    __tablename__ = "finance"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    amount = Column(Integer, nullable=False)
