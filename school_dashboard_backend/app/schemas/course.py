from pydantic import BaseModel
from typing import Optional, List
from .student import StudentOut
from .teacher import TeacherOut

class CourseBase(BaseModel):
    title: str
    teacher_id: int

class CourseCreate(CourseBase):
    pass

class CourseOut(CourseBase):
    id: int
    teacher: Optional[TeacherOut]
    students: List[StudentOut] = []

    model_config = {
    "from_attributes": True
}
class CourseUpdate(BaseModel):
    title: str
    teacher_id: int
