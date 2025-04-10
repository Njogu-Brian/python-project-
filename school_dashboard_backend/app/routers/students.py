from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.student import StudentCreate, StudentUpdate, StudentOut
from app.crud import students as crud
from app.db.database import get_db
from typing import List

router = APIRouter()

@router.post("/", response_model=StudentOut)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    return crud.create_student(db=db, student=student)

@router.get("/", response_model=List[StudentOut])
def list_students(db: Session = Depends(get_db)):
    return crud.get_students(db)

@router.get("/{student_id}", response_model=StudentOut)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = crud.get_student_by_id(db, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.put("/{student_id}", response_model=StudentOut)
def update_student(student_id: int, student: StudentUpdate, db: Session = Depends(get_db)):
    return crud.update_student(db, student_id, student)

@router.delete("/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    return crud.delete_student(db, student_id)
