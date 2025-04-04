from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.db import get_db
from api.crud.classroom_crud import create_classroom, get_all_classrooms
from api.schemas.classroom import ClassroomCreate, ClassroomOut

router = APIRouter()

@router.post("/", response_model=ClassroomOut)
def create_new_classroom(classroom: ClassroomCreate, db: Session = Depends(get_db)):
    return create_classroom(db, classroom)

@router.get("/", response_model=list[ClassroomOut])
def list_classrooms(db: Session = Depends(get_db)):
    return get_all_classrooms(db)
