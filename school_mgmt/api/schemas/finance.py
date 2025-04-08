from pydantic import BaseModel

class FinanceBase(BaseModel):
    student_id: int
    term: str
    amount_paid: float

class FinanceCreate(FinanceBase):
    pass

class FinanceUpdate(FinanceBase):
    pass

class FinanceOut(FinanceBase):
    id: int

    class Config:
        from_attributes = True
