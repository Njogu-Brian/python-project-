from sqlalchemy.orm import Session
from api.models.classroom import Classroom
from api.schemas.classroom import ClassroomCreate

def create_classroom(db: Session, classroom_data: ClassroomCreate):
    classroom = Classroom(name=classroom_data.name, capacity=classroom_data.capacity)
    db.add(classroom)
    db.commit()
    db.refresh(classroom)
    return classroom

def get_all_classrooms(db: Session):
    return db.query(Classroom).all()
