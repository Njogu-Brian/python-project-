from sqlalchemy.orm import Session, joinedload
from app.models.course import Course
from app.schemas.course import CourseCreate, CourseUpdate

def create_course(db: Session, course: CourseCreate):
    new_course = Course(
        name=course.name,
        duration=course.duration,   
        teacher_id=course.teacher_id
    )
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

def update_course(db: Session, course_id: int, course: CourseUpdate):
    existing = db.query(Course).filter(Course.id == course_id).first()
    if existing:
        existing.name = course.name
        existing.duration = course.duration 
        existing.teacher_id = course.teacher_id
        db.commit()
        db.refresh(existing)
    return existing


def get_courses(db: Session):
    return db.query(Course).options(joinedload(Course.teacher)).all()

def get_course_by_id(db: Session, course_id: int):
    return db.query(Course).filter(Course.id == course_id).first()

def delete_course(db: Session, course_id: int):
    course = db.query(Course).filter(Course.id == course_id).first()
    if course:
        db.delete(course)
        db.commit()
    return course
