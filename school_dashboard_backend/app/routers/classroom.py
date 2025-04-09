from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.classroom import ClassroomCreate, ClassroomOut, ClassroomUpdate
from app.crud.classroom import create_classroom, get_classrooms, update_classroom, delete_classroom

router = APIRouter()

@router.post("/", response_model=ClassroomOut)
def add_classroom(classroom: ClassroomCreate):
    return create_classroom(name=classroom.name, section=classroom.section)

@router.get("/", response_model=List[ClassroomOut])
def list_classrooms():
    return get_classrooms()

@router.put("/{classroom_id}", response_model=ClassroomOut)
def edit_classroom(classroom_id: int, update: ClassroomUpdate):
    classroom = update_classroom(classroom_id, name=update.name, section=update.section)
    if not classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
    return classroom

@router.delete("/{classroom_id}", response_model=ClassroomOut)
def remove_classroom(classroom_id: int):
    classroom = delete_classroom(classroom_id)
    if not classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
    return classroom
