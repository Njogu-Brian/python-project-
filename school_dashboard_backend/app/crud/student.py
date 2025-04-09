from sqlalchemy.orm import Session
from app.models.student import Student
from app.models.course import Course
from app.db.session import SessionLocal

def create_student(name: str, classroom_id: int, db: Session):
    new_student = Student(name=name, classroom_id=classroom_id)
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

def get_students():
    db = SessionLocal()
    students = db.query(Student).all()
    db.close()
    return students

def get_student_by_id(student_id: int):
    db = SessionLocal()
    student = db.query(Student).get(student_id)
    db.close()
    return student

def delete_student(student_id: int):
    db = SessionLocal()
    student = db.query(Student).get(student_id)
    if student:
        db.delete(student)
        db.commit()
    db.close()
    return student
def update_student(student_id: int, name: str, course_ids: list[int]):
    db = SessionLocal()
    student = db.query(Student).get(student_id)
    if student:
        student.name = name
        student.courses = db.query(Course).filter(Course.id.in_(course_ids)).all()
        db.commit()
        db.refresh(student)
    db.close()
    return student
