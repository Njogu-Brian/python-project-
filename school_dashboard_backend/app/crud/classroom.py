from app.models.classroom import Classroom
from app.db.session import SessionLocal

def create_classroom(name: str, section: str):
    db = SessionLocal()
    classroom = Classroom(name=name, section=section)
    db.add(classroom)
    db.commit()
    db.refresh(classroom)
    db.close()
    return classroom

def get_classrooms():
    db = SessionLocal()
    classrooms = db.query(Classroom).all()
    db.close()
    return classrooms

def update_classroom(classroom_id: int, name: str, section: str):
    db = SessionLocal()
    classroom = db.query(Classroom).get(classroom_id)
    if classroom:
        classroom.name = name
        classroom.section = section
        db.commit()
        db.refresh(classroom)
    db.close()
    return classroom

def delete_classroom(classroom_id: int):
    db = SessionLocal()
    classroom = db.query(Classroom).get(classroom_id)
    if classroom:
        db.delete(classroom)
        db.commit()
    db.close()
    return classroom
