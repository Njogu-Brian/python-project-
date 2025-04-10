from pydantic import BaseModel

class ClassroomBase(BaseModel):
    section: str
    name: str

class ClassroomCreate(ClassroomBase):
    pass

class ClassroomUpdate(ClassroomBase):
    pass

class ClassroomOut(ClassroomBase):
    id: int

    class Config:
        from_attributes = True
