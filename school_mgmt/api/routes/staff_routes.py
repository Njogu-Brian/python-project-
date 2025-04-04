from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.schemas.staff import StaffCreate, StaffOut
from api.crud.staff_crud import create_staff, get_staff
from api.db import get_db

router = APIRouter()

@router.post("/", response_model=StaffOut)
def add_staff(staff: StaffCreate, db: Session = Depends(get_db)):
    return create_staff(db, staff)

@router.get("/", response_model=list[StaffOut])
def list_staff(db: Session = Depends(get_db)):
    return get_staff(db)
