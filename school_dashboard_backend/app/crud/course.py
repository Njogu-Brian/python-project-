from app.models.course import Course
from app.models.teacher import Teacher
from app.db.session import SessionLocal

def create_course(title: str, teacher_id: int):
    db = SessionLocal()
    teacher = db.query(Teacher).get(teacher_id)
    course = Course(title=title, teacher=teacher)
    db.add(course)
    db.commit()
    db.refresh(course)
    db.close()
    return course

def get_courses():
    db = SessionLocal()
    courses = db.query(Course).all()
    db.close()
    return courses

def get_course_by_id(course_id: int):
    db = SessionLocal()
    course = db.query(Course).get(course_id)
    db.close()
    return course

def delete_course(course_id: int):
    db = SessionLocal()
    course = db.query(Course).get(course_id)
    if course:
        db.delete(course)
        db.commit()
    db.close()
    return course
def update_course(course_id: int, title: str, teacher_id: int):
    db = SessionLocal()
    course = db.query(Course).get(course_id)
    if course:
        course.title = title
        course.teacher_id = teacher_id
        db.commit()
        db.refresh(course)
    db.close()
    return course
