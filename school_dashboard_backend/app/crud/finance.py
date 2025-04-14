from sqlalchemy.orm import Session
from app.models.finance import Finance
from app.schemas.finance import FinanceCreate, FinanceUpdate
from datetime import datetime, date

def create_record(db: Session, record: FinanceCreate):
    data = record.dict()
    if isinstance(data["date"], str):
        data["date"] = datetime.strptime(data["date"], "%Y-%m-%d").date()
    elif isinstance(data["date"], datetime):
        data["date"] = data["date"].date()
    elif not isinstance(data["date"], date):
        raise ValueError("Invalid date format.")

    new_record = Finance(**data)
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
        for key, value in record.dict().items():
            setattr(existing, key, value)
        db.commit()
        db.refresh(existing)
    return existing

def delete_record(db: Session, record_id: int):
    record = db.query(Finance).filter(Finance.id == record_id).first()
    if record:
        db.delete(record)
        db.commit()
    return record
