from sqlalchemy.orm import Session
from app.models.finance import Finance
from app.schemas.finance import FinanceCreate, FinanceUpdate

def create_record(db: Session, record: FinanceCreate):
    new_record = Finance(description=record.description, amount=record.amount)
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record

def get_finance_records(db: Session):
    return db.query(Finance).all()

def get_finance_by_id(db: Session, record_id: int):
    return db.query(Finance).filter(Finance.id == record_id).first()

def update_record(db: Session, record_id: int, record: FinanceUpdate):
    existing = db.query(Finance).filter(Finance.id == record_id).first()
    if existing:
        existing.description = record.description
        existing.amount = record.amount
        db.commit()
        db.refresh(existing)
    return existing

def delete_record(db: Session, record_id: int):
    record = db.query(Finance).filter(Finance.id == record_id).first()
    if record:
        db.delete(record)
        db.commit()
    return record
