from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.init_db import init_db
from app.routers import students, teachers, courses, finance, classroom
from app.database import Base, engine, get_db  # ✅ FIXED THIS LINE
from app.models import student, classroom, teacher, course

app = FastAPI()

# Initialize the database (creates tables)
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(students.router, prefix="/students", tags=["Students"])
app.include_router(teachers.router, prefix="/teachers", tags=["Teachers"])
app.include_router(courses.router, prefix="/courses", tags=["Courses"])
app.include_router(finance.router, prefix="/finance", tags=["Finance"])
app.include_router(classroom.router, prefix="/classrooms", tags=["Classrooms"])

@app.get("/")
def root():
    return {"message": "Welcome to the School Dashboard API"}
