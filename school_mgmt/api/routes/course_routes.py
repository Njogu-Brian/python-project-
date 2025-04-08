from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.db import get_db
from api.schemas.course import CourseCreate, CourseOut, CourseUpdate
from api.crud.course_crud import create_course, get_courses, update_course, delete_course

router = APIRouter()

@router.post("/", response_model=CourseOut)
def add_course(course: CourseCreate, db: Session = Depends(get_db)):
    return create_course(db, course)

@router.get("/", response_model=list[CourseOut])
def list_courses(db: Session = Depends(get_db)):
    return get_courses(db)

@router.put("/{course_id}", response_model=CourseOut)
def update_course_route(course_id: int, course: CourseUpdate, db: Session = Depends(get_db)):
    updated = update_course(db, course_id, course)
    if not updated:
        raise HTTPException(status_code=404, detail="Course not found")
    return updated

@router.delete("/{course_id}")
def delete_course_route(course_id: int, db: Session = Depends(get_db)):
    course = delete_course(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"detail": "Deleted successfully"}
