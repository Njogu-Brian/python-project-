from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.course import CourseCreate, CourseUpdate, CourseOut
from app.crud import courses as crud
from app.db.database import get_db
from typing import List

router = APIRouter()

@router.post("/", response_model=CourseOut)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    return crud.create_course(db=db, course=course)

@router.get("/", response_model=List[CourseOut])
def list_courses(db: Session = Depends(get_db)):
    return crud.get_courses(db)

@router.get("/{course_id}", response_model=CourseOut)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = crud.get_course_by_id(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.put("/{course_id}", response_model=CourseOut)
def update_course(course_id: int, course: CourseUpdate, db: Session = Depends(get_db)):
    return crud.update_course(db, course_id, course)

@router.delete("/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    return crud.delete_course(db, course_id)
