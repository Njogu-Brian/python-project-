from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.schemas.finance import FinanceCreate, FinanceOut
from api.crud.finance_crud import create_payment, get_payments
from api.db import get_db

router = APIRouter()

@router.post("/", response_model=FinanceOut)
def add_payment(payment: FinanceCreate, db: Session = Depends(get_db)):
    return create_payment(db, payment)

@router.get("/", response_model=list[FinanceOut])
def list_payments(db: Session = Depends(get_db)):
    return get_payments(db)
