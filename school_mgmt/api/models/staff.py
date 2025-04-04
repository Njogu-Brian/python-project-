# api/models/staff.py

from sqlalchemy import Column, Integer, String
from api.db import Base

class Staff(Base):
    __tablename__ = "staff"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)

    def __repr__(self):
        return f"<Staff {self.id}: {self.name}, {self.role}>"
