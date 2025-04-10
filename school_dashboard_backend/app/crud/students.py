from sqlalchemy.orm import Session
from app.models.student import Student
from app.schemas.student import StudentCreate, StudentUpdate

def create_student(db: Session, student: StudentCreate):
    new_student = Student(name=student.name, classroom_id=student.classroom_id)
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

def get_students(db: Session):
    return db.query(Student).all()

def get_student_by_id(db: Session, student_id: int):
    return db.query(Student).filter(Student.id == student_id).first()

def update_student(db: Session, student_id: int, student: StudentUpdate):
    existing = db.query(Student).filter(Student.id == student_id).first()
    if existing:
        existing.name = student.name
        existing.classroom_id = student.classroom_id
        db.commit()
        db.refresh(existing)
    return existing

def delete_student(db: Session, student_id: int):
    student = db.query(Student).filter(Student.id == student_id).first()
    if student:
        db.delete(student)
        db.commit()
    return student
