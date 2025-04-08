from app.models.teacher import Teacher
from app.db.session import SessionLocal

def create_teacher(name: str):
    db = SessionLocal()
    teacher = Teacher(name=name)
    db.add(teacher)
    db.commit()
    db.refresh(teacher)
    db.close()
    return teacher

def get_teachers():
    db = SessionLocal()
    teachers = db.query(Teacher).all()
    db.close()
    return teachers
def delete_teacher(teacher_id: int):
    db = SessionLocal()
    teacher = db.query(Teacher).get(teacher_id)
    if teacher:
        db.delete(teacher)
        db.commit()
    db.close()
    return teacher

def update_teacher(teacher_id: int, name: str):
    db = SessionLocal()
    teacher = db.query(Teacher).get(teacher_id)
    if teacher:
        teacher.name = name
        db.commit()
        db.refresh(teacher)
    db.close()
    return teacher
