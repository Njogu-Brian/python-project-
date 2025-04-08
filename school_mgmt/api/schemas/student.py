from pydantic import BaseModel

class StudentCreate(BaseModel):
    name: str
    age: int
    classroom_id: int

class StudentOut(StudentCreate):
    id: int

    class Config:
        from_attributes = True
