# api/schemas/student.py

from pydantic import BaseModel

class StudentBase(BaseModel):
    name: str
    age: int
    classroom_id: int

class StudentCreate(StudentBase):
    pass

class StudentOut(StudentBase):
    id: int

    class Config:
        from_attributes = True  # Use instead of `orm_mode=True` in Pydantic v2
