from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.finance import FinanceCreate, FinanceUpdate, FinanceOut
from app.crud.finance import (
    create_finance_record,
    get_finance_records,
    get_finance_by_student,
    update_finance_record,
    delete_finance_record,
)

router = APIRouter()

@router.post("/", response_model=FinanceOut)
def add_payment(record: FinanceCreate):
    return create_finance_record(student_id=record.student_id, amount_paid=record.amount_paid)

@router.get("/", response_model=List[FinanceOut])
def list_all_finance():
    return get_finance_records()

@router.get("/student/{student_id}", response_model=List[FinanceOut])
def get_student_payments(student_id: int):
    return get_finance_by_student(student_id)

@router.put("/{record_id}", response_model=FinanceOut)
def update_payment(record_id: int, update: FinanceUpdate):
    updated = update_finance_record(record_id, amount_paid=update.amount_paid)
    if not updated:
        raise HTTPException(status_code=404, detail="Record not found")
    return updated

@router.delete("/{record_id}", response_model=FinanceOut)
def remove_payment(record_id: int):
    record = delete_finance_record(record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    return record
