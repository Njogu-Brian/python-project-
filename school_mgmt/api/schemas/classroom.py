from pydantic import BaseModel

class ClassroomCreate(BaseModel):
    name: str
    capacity: int

class ClassroomOut(ClassroomCreate):
    id: int

    class Config:
        from_attributes = True  # This replaces orm_mode=True in Pydantic v2
