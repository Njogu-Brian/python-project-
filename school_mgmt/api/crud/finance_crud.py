from sqlalchemy.orm import Session
from api.models.finance import Finance
from api.schemas.finance import FinanceCreate


def create_payment(db: Session, payment: FinanceCreate):
    db_payment = Finance(
        student_id=payment.student_id,
        term=payment.term,
        amount_paid=payment.amount_paid
    )
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment


def get_payments(db: Session):
    return db.query(Finance).all()
