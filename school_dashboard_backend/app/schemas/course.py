from pydantic import BaseModel
from typing import List, Optional
from app.schemas.teacher import TeacherOut

class CourseBase(BaseModel):
    name: str
    duration: int
    teacher_id: int

class CourseCreate(CourseBase):
    pass

class CourseUpdate(CourseBase):
    pass

class CourseOut(BaseModel):
    id: int
    name: str
    duration: int
    teacher_id: Optional[int] = None
    teacher: Optional[TeacherOut] = None

    class Config:
        orm_mode = True
