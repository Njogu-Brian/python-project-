from sqlalchemy.orm import Session
from app.models.classroom import Classroom
from app.schemas.classroom import ClassroomCreate, ClassroomUpdate

def create_classroom(db: Session, classroom: ClassroomCreate):
    new_classroom = Classroom(
        section=classroom.section,
        name=classroom.name
    )
    db.add(new_classroom)
    db.commit()
    db.refresh(new_classroom)
    return new_classroom

def get_classrooms(db: Session):
    return db.query(Classroom).all()

def get_classroom_by_id(db: Session, classroom_id: int):
    return db.query(Classroom).filter(Classroom.id == classroom_id).first()

def update_classroom(db: Session, classroom_id: int, data: ClassroomUpdate):
    classroom = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if classroom:
        classroom.section = data.section
        classroom.class_name = data.class_name
        db.commit()
        db.refresh(classroom)
    return classroom

def delete_classroom(db: Session, classroom_id: int):
    classroom = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if classroom:
        db.delete(classroom)
        db.commit()
    return classroom
