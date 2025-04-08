from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.schemas.staff import StaffCreate, StaffOut, StaffUpdate
from api.crud.staff_crud import (
    create_staff, get_staff, get_staff_by_id, update_staff, delete_staff
)
from api.db import get_db

router = APIRouter()

@router.post("/", response_model=StaffOut)
def add_staff(staff: StaffCreate, db: Session = Depends(get_db)):
    return create_staff(db, staff)

@router.get("/", response_model=list[StaffOut])
def list_staff(db: Session = Depends(get_db)):
    return get_staff(db)

@router.get("/{staff_id}", response_model=StaffOut)
def retrieve_staff(staff_id: int, db: Session = Depends(get_db)):
    staff = get_staff_by_id(db, staff_id)
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    return staff

@router.put("/{staff_id}", response_model=StaffOut)
def update_staff_route(staff_id: int, staff: StaffUpdate, db: Session = Depends(get_db)):
    updated = update_staff(db, staff_id, staff)
    if not updated:
        raise HTTPException(status_code=404, detail="Staff not found")
    return updated

@router.delete("/{staff_id}")
def delete_staff_route(staff_id: int, db: Session = Depends(get_db)):
    deleted = delete_staff(db, staff_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Staff not found")
    return {"message": "Staff deleted successfully"}
