from pydantic import BaseModel

class ClassroomBase(BaseModel):
    name: str
    section: str  # renamed from level

class ClassroomCreate(ClassroomBase):
    pass

class ClassroomUpdate(ClassroomBase):
    pass

class ClassroomOut(ClassroomBase):
    id: int

    class Config:
        orm_mode = True
