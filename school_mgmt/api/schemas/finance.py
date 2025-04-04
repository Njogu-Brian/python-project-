from pydantic import BaseModel

class FinanceCreate(BaseModel):
    student_id: int
    term: str
    amount_paid: float

class FinanceOut(FinanceCreate):
    id: int

    class Config:
        orm_mode = True
