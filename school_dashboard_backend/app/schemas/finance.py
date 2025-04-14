from pydantic import BaseModel
from typing import Optional
from datetime import date  

class FinanceBase(BaseModel):
    description: str
    amount: int
    type: str
    date: date 
    student_id: Optional[int] = None
    teacher_id: Optional[int] = None

class FinanceCreate(FinanceBase):
    pass

class FinanceUpdate(FinanceBase):
    pass

class FinanceOut(FinanceBase):
    id: int

    class Config:
        from_attributes = True
