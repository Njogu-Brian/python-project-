from fastapi import APIRouter, HTTPException
from app.schemas.course import CourseCreate, CourseOut, CourseUpdate
from app.crud.course import create_course, get_courses, get_course_by_id, delete_course, update_course
from typing import List

router = APIRouter()

@router.post("/", response_model=CourseOut)
def add_course(course: CourseCreate):
    return create_course(title=course.title, teacher_id=course.teacher_id)

@router.get("/", response_model=List[CourseOut])
def list_courses():
    return get_courses()

@router.get("/{course_id}", response_model=CourseOut)
def get_course(course_id: int):
    course = get_course_by_id(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.put("/{course_id}", response_model=CourseOut)
def edit_course(course_id: int, update: CourseUpdate):
    course = update_course(course_id, title=update.title, teacher_id=update.teacher_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.delete("/{course_id}", response_model=CourseOut)
def remove_course(course_id: int):
    course = delete_course(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course