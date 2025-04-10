from pydantic import BaseModel

class FinanceBase(BaseModel):
    description: str
    amount: int

class FinanceCreate(FinanceBase):
    pass

class FinanceUpdate(FinanceBase):
    pass

class FinanceOut(FinanceBase):
    id: int

    class Config:
        from_attributes = True
