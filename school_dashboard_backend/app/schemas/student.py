from pydantic import BaseModel
from typing import List

class StudentBase(BaseModel):
    name: str

class StudentCreate(StudentBase):
    course_ids: List[int]

class StudentOut(StudentBase):
    id: int
    model_config = {
    "from_attributes": True
}
class StudentUpdate(BaseModel):
    name: str
    course_ids: List[int]
