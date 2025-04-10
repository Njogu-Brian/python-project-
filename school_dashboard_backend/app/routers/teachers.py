from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.teacher import TeacherCreate, TeacherOut, TeacherUpdate
from app.crud import teachers as crud
from app.db.database import get_db
from typing import List

router = APIRouter()

@router.post("/", response_model=TeacherOut)
def create_teacher(teacher: TeacherCreate, db: Session = Depends(get_db)):
    return crud.create_teacher(db, teacher)

@router.get("/", response_model=List[TeacherOut])
def get_teachers(db: Session = Depends(get_db)):
    return crud.get_teachers(db)

@router.get("/{teacher_id}", response_model=TeacherOut)
def get_teacher(teacher_id: int, db: Session = Depends(get_db)):
    teacher = crud.get_teacher_by_id(db, teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher

@router.put("/{teacher_id}", response_model=TeacherOut)
def update_teacher(teacher_id: int, update: TeacherUpdate, db: Session = Depends(get_db)):
    return crud.update_teacher(db, teacher_id, update)

@router.delete("/{teacher_id}", response_model=TeacherOut)
def delete_teacher(teacher_id: int, db: Session = Depends(get_db)):
    return crud.delete_teacher(db, teacher_id)
