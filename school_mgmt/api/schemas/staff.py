from pydantic import BaseModel

class StaffCreate(BaseModel):
    name: str
    role: str

class StaffOut(StaffCreate):
    id: int

    class Config:
        orm_mode = True
