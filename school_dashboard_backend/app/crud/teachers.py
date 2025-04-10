from sqlalchemy.orm import Session
from app.models.teacher import Teacher
from app.schemas.teacher import TeacherCreate, TeacherUpdate

def create_teacher(db: Session, teacher: TeacherCreate):
    new_teacher = Teacher(name=teacher.name)
    db.add(new_teacher)
    db.commit()
    db.refresh(new_teacher)
    return new_teacher

def get_teachers(db: Session):
    return db.query(Teacher).all()

def get_teacher_by_id(db: Session, teacher_id: int):
    return db.query(Teacher).filter(Teacher.id == teacher_id).first()

def update_teacher(db: Session, teacher_id: int, teacher: TeacherUpdate):
    existing = db.query(Teacher).filter(Teacher.id == teacher_id).first()
    if existing:
        existing.name = teacher.name
        db.commit()
        db.refresh(existing)
    return existing

def delete_teacher(db: Session, teacher_id: int):
    teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
    if teacher:
        db.delete(teacher)
        db.commit()
    return teacher
