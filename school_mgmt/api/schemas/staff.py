from pydantic import BaseModel

class StaffBase(BaseModel):
    name: str
    role: str

class StaffCreate(StaffBase):
    pass

class StaffUpdate(StaffBase):
    pass

class StaffOut(StaffBase):
    id: int

    class Config:
        from_attributes = True
