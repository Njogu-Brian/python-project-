# api/crud/student_crud.py

from sqlalchemy.orm import Session
from api.models.student import Student
from api.schemas.student import StudentCreate

def create_student(db: Session, student_data: StudentCreate):
    new_student = Student(
        name=student_data.name,
        age=student_data.age,
        classroom_id=student_data.classroom_id
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

def get_all_students(db: Session):
    return db.query(Student).all()
