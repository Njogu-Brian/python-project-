from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.schemas.finance import FinanceCreate, FinanceOut, FinanceUpdate
from api.crud.finance_crud import (
    create_payment, get_payments, get_payment_by_id, update_payment, delete_payment
)
from api.db import get_db

router = APIRouter()

@router.post("/", response_model=FinanceOut)
def add_payment(payment: FinanceCreate, db: Session = Depends(get_db)):
    return create_payment(db, payment)

@router.get("/", response_model=list[FinanceOut])
def list_payments(db: Session = Depends(get_db)):
    return get_payments(db)

@router.get("/{payment_id}", response_model=FinanceOut)
def get_payment(payment_id: int, db: Session = Depends(get_db)):
    payment = get_payment_by_id(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

@router.put("/{payment_id}", response_model=FinanceOut)
def update_payment_route(payment_id: int, data: FinanceUpdate, db: Session = Depends(get_db)):
    updated = update_payment(db, payment_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Payment not found")
    return updated

@router.delete("/{payment_id}")
def delete_payment_route(payment_id: int, db: Session = Depends(get_db)):
    deleted = delete_payment(db, payment_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"message": "Payment deleted successfully"}
