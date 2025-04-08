from sqlalchemy.orm import Session
from api.models.staff import Staff
from api.schemas.staff import StaffCreate, StaffUpdate

def create_staff(db: Session, staff_data: StaffCreate):
    staff = Staff(**staff_data.dict())
    db.add(staff)
    db.commit()
    db.refresh(staff)
    return staff

def get_staff(db: Session):
    return db.query(Staff).all()

def get_staff_by_id(db: Session, staff_id: int):
    return db.query(Staff).filter(Staff.id == staff_id).first()

def update_staff(db: Session, staff_id: int, staff_data: StaffUpdate):
    staff = get_staff_by_id(db, staff_id)
    if staff:
        for key, value in staff_data.dict(exclude_unset=True).items():
            setattr(staff, key, value)
        db.commit()
        db.refresh(staff)
    return staff

def delete_staff(db: Session, staff_id: int):
    staff = get_staff_by_id(db, staff_id)
    if staff:
        db.delete(staff)
        db.commit()
    return staff
