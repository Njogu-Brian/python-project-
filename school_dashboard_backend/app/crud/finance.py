from app.models.finance import Finance
from app.db.session import SessionLocal

def create_finance_record(student_id: int, amount_paid: float):
    db = SessionLocal()
    finance = Finance(student_id=student_id, amount_paid=amount_paid)
    db.add(finance)
    db.commit()
    db.refresh(finance)
    db.close()
    return finance

def get_finance_records():
    db = SessionLocal()
    records = db.query(Finance).all()
    db.close()
    return records

def get_finance_by_student(student_id: int):
    db = SessionLocal()
    records = db.query(Finance).filter(Finance.student_id == student_id).all()
    db.close()
    return records

def update_finance_record(record_id: int, amount_paid: float):
    db = SessionLocal()
    record = db.query(Finance).get(record_id)
    if record:
        record.amount_paid = amount_paid
        db.commit()
        db.refresh(record)
    db.close()
    return record

def delete_finance_record(record_id: int):
    db = SessionLocal()
    record = db.query(Finance).get(record_id)
    if record:
        db.delete(record)
        db.commit()
    db.close()
    return record
