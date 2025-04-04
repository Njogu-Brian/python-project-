from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.schemas.teacher import TeacherCreate, TeacherOut
from api.crud.teacher_crud import create_teacher, get_teachers
from api.db import get_db

router = APIRouter()

@router.post("/", response_model=TeacherOut)
def add_teacher(teacher: TeacherCreate, db: Session = Depends(get_db)):
    return create_teacher(db, teacher)

@router.get("/", response_model=list[TeacherOut])
def list_teachers(db: Session = Depends(get_db)):
    return get_teachers(db)
