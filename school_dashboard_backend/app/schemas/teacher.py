from pydantic import BaseModel

class TeacherBase(BaseModel):
    name: str
    experience: int
class TeacherCreate(TeacherBase):
    pass

class TeacherUpdate(TeacherBase):
    pass

class TeacherOut(BaseModel):
    id: int
    name: str
    experience: int

    class Config:
        from_attributes = True
