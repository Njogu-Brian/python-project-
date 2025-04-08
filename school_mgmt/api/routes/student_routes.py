from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.db import get_db
from api.crud import student_crud
from api.schemas.student import StudentCreate, StudentOut

router = APIRouter()

@router.post("/", response_model=StudentOut)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    return student_crud.create_student(db, student)

@router.get("/", response_model=list[StudentOut])
def list_students(db: Session = Depends(get_db)):
    return student_crud.get_all_students(db)

@router.get("/{student_id}", response_model=StudentOut)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = student_crud.get_student(db, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.put("/{student_id}", response_model=StudentOut)
def update_student(student_id: int, student: StudentCreate, db: Session = Depends(get_db)):
    return student_crud.update_student(db, student_id, student)

@router.delete("/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student_crud.delete_student(db, student_id)
    return {"message": "Deleted successfully"}
