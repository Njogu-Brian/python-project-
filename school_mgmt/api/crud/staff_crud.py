from sqlalchemy.orm import Session
from api.models.staff import Staff
from api.schemas.staff import StaffCreate


def create_staff(db: Session, staff: StaffCreate):
    db_staff = Staff(name=staff.name, role=staff.role)
    db.add(db_staff)
    db.commit()
    db.refresh(db_staff)
    return db_staff


def get_staff(db: Session):
    return db.query(Staff).all()
