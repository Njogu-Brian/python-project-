from pydantic import BaseModel
from typing import List

class StudentBase(BaseModel):
    name: str

class StudentCreate(BaseModel):
    name: str
    classroom_id: int

class StudentOut(StudentBase):
    id: int
    model_config = {
    "from_attributes": True
}
class StudentUpdate(BaseModel):
    name: str
    course_ids: List[int]
