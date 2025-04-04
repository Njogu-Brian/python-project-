from pydantic import BaseModel

class TeacherCreate(BaseModel):
    name: str
    subject: str
    classroom_id: int

class TeacherOut(TeacherCreate):
    id: int

    class Config:
        orm_mode = True
