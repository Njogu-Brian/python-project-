from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.db import get_db
from api.schemas.teacher import TeacherCreate, TeacherOut
from api.crud import teacher_crud

router = APIRouter()

@router.post("/", response_model=TeacherOut)
def add_teacher(teacher: TeacherCreate, db: Session = Depends(get_db)):
    return teacher_crud.create_teacher(db, teacher)

@router.get("/", response_model=list[TeacherOut])
def list_teachers(db: Session = Depends(get_db)):
    return teacher_crud.get_teachers(db)

@router.get("/{id}", response_model=TeacherOut)
def get_teacher(id: int, db: Session = Depends(get_db)):
    teacher = teacher_crud.get_teacher(db, id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher

@router.put("/{id}", response_model=TeacherOut)
def update_teacher(id: int, teacher: TeacherCreate, db: Session = Depends(get_db)):
    return teacher_crud.update_teacher(db, id, teacher)

@router.delete("/{id}")
def delete_teacher(id: int, db: Session = Depends(get_db)):
    teacher_crud.delete_teacher(db, id)
    return {"message": "Deleted successfully"}
