from sqlalchemy.orm import Session
from app.models.classroom import Classroom
from app.schemas.classroom import ClassroomCreate, ClassroomUpdate

def create_classroom(db: Session, classroom: ClassroomCreate):
    new_classroom = Classroom(name=classroom.name, section=classroom.section)
    db.add(new_classroom)
    db.commit()
    db.refresh(new_classroom)
    return new_classroom

def get_classrooms(db: Session):
    return db.query(Classroom).all()

def get_classroom_by_id(db: Session, classroom_id: int):
    return db.query(Classroom).filter(Classroom.id == classroom_id).first()

def update_classroom(db: Session, classroom_id: int, classroom: ClassroomUpdate):
    existing = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if existing:
        existing.name = classroom.name
        existing.section = classroom.section
        db.commit()
        db.refresh(existing)
    return existing

def delete_classroom(db: Session, classroom_id: int):
    classroom = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if classroom:
        db.delete(classroom)
        db.commit()
    return classroom
