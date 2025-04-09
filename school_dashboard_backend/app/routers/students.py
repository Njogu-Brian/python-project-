from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.student import StudentCreate, StudentOut
from app.database import  get_db
from app.crud.student import (
    get_students,
    create_student,
    update_student,
    delete_student,
)

router = APIRouter()

@router.post("/students/", response_model=StudentOut)
def add_student(student: StudentCreate, db: Session = Depends(get_db)):
    return create_student(name=student.name, classroom_id=student.classroom_id, db=db)

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
