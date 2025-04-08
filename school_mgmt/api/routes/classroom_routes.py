from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.db import get_db
from api.crud.classroom_crud import (
    create_classroom,
    get_all_classrooms,
    update_classroom,
    delete_classroom,
)
from api.schemas.classroom import ClassroomCreate, ClassroomOut, ClassroomUpdate

router = APIRouter()

@router.post("/", response_model=ClassroomOut)
def create_new_classroom(classroom: ClassroomCreate, db: Session = Depends(get_db)):
    return create_classroom(db, classroom)

@router.get("/", response_model=list[ClassroomOut])
def list_classrooms(db: Session = Depends(get_db)):
    return get_all_classrooms(db)

@router.put("/{classroom_id}", response_model=ClassroomOut)
def update_existing_classroom(classroom_id: int, classroom: ClassroomUpdate, db: Session = Depends(get_db)):
    updated = update_classroom(db, classroom_id, classroom)
    if not updated:
        raise HTTPException(status_code=404, detail="Classroom not found")
    return updated

@router.delete("/{classroom_id}")
def remove_classroom(classroom_id: int, db: Session = Depends(get_db)):
    success = delete_classroom(db, classroom_id)
    if not success:
        raise HTTPException(status_code=404, detail="Classroom not found")
    return {"message": "Classroom deleted"}
