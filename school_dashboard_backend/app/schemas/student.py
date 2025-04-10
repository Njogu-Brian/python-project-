from pydantic import BaseModel
from typing import Optional
from app.schemas.classroom import ClassroomOut  # ✅ Import the nested schema

class StudentBase(BaseModel):
    name: str
    classroom_id: int

class StudentCreate(StudentBase):
    pass

class StudentUpdate(StudentBase):
    pass

class StudentOut(StudentBase):
    id: int
    classroom: Optional[ClassroomOut]  # ✅ Include full classroom object

    class Config:
        from_attributes = True
