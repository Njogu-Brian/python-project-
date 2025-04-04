from sqlalchemy.orm import Session
from api.models.teacher import Teacher
from api.schemas.teacher import TeacherCreate

def create_teacher(db: Session, teacher_data: TeacherCreate):
    teacher = Teacher(**teacher_data.dict())
    db.add(teacher)
    db.commit()
    db.refresh(teacher)
    return teacher

def get_teachers(db: Session):
    return db.query(Teacher).all()
