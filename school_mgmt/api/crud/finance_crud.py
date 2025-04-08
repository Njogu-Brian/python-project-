from sqlalchemy.orm import Session
from api.models.finance import Finance
from api.schemas.finance import FinanceCreate, FinanceUpdate

def create_payment(db: Session, payment_data: FinanceCreate):
    payment = Finance(**payment_data.dict())
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment

def get_payments(db: Session):
    return db.query(Finance).all()

def get_payment_by_id(db: Session, payment_id: int):
    return db.query(Finance).filter(Finance.id == payment_id).first()

def update_payment(db: Session, payment_id: int, payment_data: FinanceUpdate):
    payment = get_payment_by_id(db, payment_id)
    if payment:
        for key, value in payment_data.dict(exclude_unset=True).items():
            setattr(payment, key, value)
        db.commit()
        db.refresh(payment)
    return payment

def delete_payment(db: Session, payment_id: int):
    payment = get_payment_by_id(db, payment_id)
    if payment:
        db.delete(payment)
        db.commit()
    return payment
