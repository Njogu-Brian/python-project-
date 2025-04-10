from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.finance import FinanceCreate, FinanceUpdate, FinanceOut
from app.crud import finance as crud
from app.db.database import get_db
from typing import List

router = APIRouter()

@router.post("/", response_model=FinanceOut)
def create_finance(record: FinanceCreate, db: Session = Depends(get_db)):
    return crud.create_record(db=db, record=record)

@router.get("/", response_model=List[FinanceOut])
def list_finance_records(db: Session = Depends(get_db)):
    return crud.get_finance_records(db)

@router.get("/{record_id}", response_model=FinanceOut)
def get_finance_record(record_id: int, db: Session = Depends(get_db)):
    record = crud.get_finance_by_id(db, record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    return record

@router.put("/{record_id}", response_model=FinanceOut)
def update_finance_record(record_id: int, record: FinanceUpdate, db: Session = Depends(get_db)):
    return crud.update_record(db, record_id, record)

@router.delete("/{record_id}")
def delete_finance_record(record_id: int, db: Session = Depends(get_db)):
    return crud.delete_record(db, record_id)
