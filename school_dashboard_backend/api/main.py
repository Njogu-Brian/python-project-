from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from db.init_db import session
from models.course import Course
from models.student import Student

app = FastAPI()

# Pydantic schemas
class CourseIn(BaseModel):
    name: str

class StudentIn(BaseModel):
    name: str
    course_id: int

class StudentOut(BaseModel):
    id: int
    name: str
    course_id: int

    class Config:
        orm_mode = True

class CourseOut(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

@app.get("/")
def home():
    return {"message": "Welcome to the School Dashboard API"}

@app.get("/courses", response_model=List[CourseOut])
def get_courses():
    return session.query(Course).all()

@app.post("/courses", response_model=CourseOut)
def create_course(course: CourseIn):
    new_course = Course(name=course.name)
    session.add(new_course)
    session.commit()
    return new_course

@app.get("/students", response_model=List[StudentOut])
def get_students():
    return session.query(Student).all()

@app.post("/students", response_model=StudentOut)
def create_student(student: StudentIn):
    course = session.get(Course, student.course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    new_student = Student(name=student.name, course=course)
    session.add(new_student)
    session.commit()
    return new_student

@app.get("/courses/{course_id}/students", response_model=List[StudentOut])
def get_students_by_course(course_id: int):
    course = session.get(Course, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course.students
