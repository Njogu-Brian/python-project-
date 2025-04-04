from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.db import get_db
from api.crud.student_crud import create_student, get_all_students
from api.schemas.student import StudentCreate, StudentOut

router = APIRouter()

@router.post("/", response_model=StudentOut)
def create_new_student(student: StudentCreate, db: Session = Depends(get_db)):
    return create_student(db, student)

@router.get("/", response_model=list[StudentOut])
def list_students(db: Session = Depends(get_db)):
    return get_all_students(db)
