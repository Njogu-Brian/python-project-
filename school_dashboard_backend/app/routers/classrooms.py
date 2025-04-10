from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.classroom import ClassroomCreate, ClassroomUpdate, ClassroomOut
from app.crud import classrooms as crud
from app.db.database import get_db

router = APIRouter()

@router.post("/", response_model=ClassroomOut)
def create_classroom(classroom: ClassroomCreate, db: Session = Depends(get_db)):
    return crud.create_classroom(db, classroom)

@router.get("/", response_model=List[ClassroomOut])
def list_classrooms(db: Session = Depends(get_db)):
    return crud.get_classrooms(db)

@router.get("/{classroom_id}", response_model=ClassroomOut)
def get_classroom(classroom_id: int, db: Session = Depends(get_db)):
    classroom = crud.get_classroom_by_id(db, classroom_id)
    if not classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
    return classroom

@router.put("/{classroom_id}", response_model=ClassroomOut)
def update_classroom(classroom_id: int, classroom: ClassroomUpdate, db: Session = Depends(get_db)):
    return crud.update_classroom(db, classroom_id, classroom)

@router.delete("/{classroom_id}")
def delete_classroom(classroom_id: int, db: Session = Depends(get_db)):
    return crud.delete_classroom(db, classroom_id)
