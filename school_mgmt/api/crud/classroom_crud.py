from sqlalchemy.orm import Session
from api.models.classroom import Classroom
from api.schemas.classroom import ClassroomCreate, ClassroomUpdate

def create_classroom(db: Session, classroom: ClassroomCreate):
    db_classroom = Classroom(name=classroom.name, capacity=classroom.capacity)
    db.add(db_classroom)
    db.commit()
    db.refresh(db_classroom)
    return db_classroom

def get_all_classrooms(db: Session):
    return db.query(Classroom).all()

def update_classroom(db: Session, classroom_id: int, updated: ClassroomUpdate):
    classroom = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if classroom is None:
        return None
    classroom.name = updated.name
    classroom.capacity = updated.capacity
    db.commit()
    db.refresh(classroom)
    return classroom

def delete_classroom(db: Session, classroom_id: int):
    classroom = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if classroom is None:
        return None
    db.delete(classroom)
    db.commit()
    return True
