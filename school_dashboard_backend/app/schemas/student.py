from pydantic import BaseModel
from typing import Optional, List

class StudentBase(BaseModel):
    name: str
    classroom_id: int

class StudentCreate(StudentBase):
    pass

class StudentUpdate(StudentBase):
    pass

class StudentOut(StudentBase):
    id: int
    class Config:
        from_attributes = True
