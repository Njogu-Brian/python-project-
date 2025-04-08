from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.student import StudentCreate, StudentUpdate, StudentOut
from app.crud.student import (
    create_student,
    get_students,
    get_student_by_id,
    update_student,
    delete_student
)

router = APIRouter()

@router.post("/", response_model=StudentOut)
def add_student(student: StudentCreate):
    return create_student(name=student.name, course_ids=student.course_ids)

@router.get("/", response_model=List[StudentOut])
def list_students():
    return get_students()

@router.get("/{student_id}", response_model=StudentOut)
def get_student(student_id: int):
    student = get_student_by_id(student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.put("/{student_id}", response_model=StudentOut)
def edit_student(student_id: int, update: StudentUpdate):
    student = update_student(student_id, name=update.name, course_ids=update.course_ids)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.delete("/{student_id}", response_model=StudentOut)
def remove_student(student_id: int):
    student = delete_student(student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student
