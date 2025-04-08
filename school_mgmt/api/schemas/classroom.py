from pydantic import BaseModel

class ClassroomCreate(BaseModel):
    name: str
    capacity: int

class ClassroomUpdate(BaseModel):
    name: str
    capacity: int

class ClassroomOut(BaseModel):
    id: int
    name: str
    capacity: int

    class Config:
        from_attributes = True  # use `orm_mode` if using Pydantic v1
