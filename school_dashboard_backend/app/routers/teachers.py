from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.teacher import TeacherCreate, TeacherUpdate, TeacherOut
from app.crud.teacher import create_teacher, get_teachers, delete_teacher, update_teacher

router = APIRouter()

@router.post("/", response_model=TeacherOut)
def add_teacher(teacher: TeacherCreate):
    return create_teacher(name=teacher.name)

@router.get("/", response_model=List[TeacherOut])
def list_teachers():
    return get_teachers()

@router.put("/{teacher_id}", response_model=TeacherOut)
def edit_teacher(teacher_id: int, update: TeacherUpdate):
    teacher = update_teacher(teacher_id, name=update.name)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher

@router.delete("/{teacher_id}", response_model=TeacherOut)
def remove_teacher(teacher_id: int):
    teacher = delete_teacher(teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher
