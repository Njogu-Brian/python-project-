from pydantic import BaseModel
from typing import List

class CourseBase(BaseModel):
    name: str
    teacher_id: int

class CourseCreate(CourseBase):
    pass

class CourseUpdate(CourseBase):
    pass

class CourseOut(CourseBase):
    id: int

    class Config:
        from_attributes = True
