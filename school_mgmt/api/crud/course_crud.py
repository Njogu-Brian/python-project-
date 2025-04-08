from sqlalchemy.orm import Session
from api.models.course import Course
from api.schemas.course import CourseCreate, CourseUpdate

def create_course(db: Session, course_data: CourseCreate):
    new_course = Course(**course_data.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

def get_courses(db: Session):
    return db.query(Course).all()

def update_course(db: Session, course_id: int, updated_data: CourseUpdate):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        return None
    for field, value in updated_data.dict().items():
        setattr(course, field, value)
    db.commit()
    db.refresh(course)
    return course

def delete_course(db: Session, course_id: int):
    course = db.query(Course).filter(Course.id == course_id).first()
    if course:
        db.delete(course)
        db.commit()
    return course
