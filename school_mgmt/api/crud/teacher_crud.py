from sqlalchemy.orm import Session
from api.models.teacher import Teacher
from api.schemas.teacher import TeacherCreate

def create_teacher(db: Session, teacher: TeacherCreate):
    t = Teacher(**teacher.dict())
    db.add(t)
    db.commit()
    db.refresh(t)
    return t

def get_teachers(db: Session):
    return db.query(Teacher).all()

def get_teacher(db: Session, id: int):
    return db.query(Teacher).filter(Teacher.id == id).first()

def update_teacher(db: Session, id: int, teacher: TeacherCreate):
    t = get_teacher(db, id)
    if t:
        for key, value in teacher.dict().items():
            setattr(t, key, value)
        db.commit()
        db.refresh(t)
    return t

def delete_teacher(db: Session, id: int):
    t = get_teacher(db, id)
    if t:
        db.delete(t)
        db.commit()
    return t
