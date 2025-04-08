from pydantic import BaseModel

class FinanceBase(BaseModel):
    student_id: int
    amount_paid: float

class FinanceCreate(FinanceBase):
    pass

class FinanceOut(FinanceBase):
    id: int
    model_config = {
    "from_attributes": True
}
class FinanceUpdate(BaseModel):
    amount_paid: float
