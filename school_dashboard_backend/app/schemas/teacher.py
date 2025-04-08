from pydantic import BaseModel

class TeacherBase(BaseModel):
    name: str

class TeacherCreate(TeacherBase):
    pass

class TeacherOut(TeacherBase):
    id: int
    model_config = {
    "from_attributes": True
}
class TeacherUpdate(BaseModel):
    name: str

