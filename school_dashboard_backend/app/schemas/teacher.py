from pydantic import BaseModel

class TeacherBase(BaseModel):
    name: str

class TeacherCreate(TeacherBase):
    pass

class TeacherUpdate(TeacherBase):
    pass

class TeacherOut(TeacherBase):
    id: int

    class Config:
        from_attributes = True
