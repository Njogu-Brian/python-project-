from fastapi import FastAPI
from app.db.init_db import init_db
from app.routers import student_router, teacher_router, course_router, classroom_router, finance_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student_router, prefix="/students", tags=["Students"])
app.include_router(teacher_router, prefix="/teachers", tags=["Teachers"])
app.include_router(course_router, prefix="/courses", tags=["Courses"])
app.include_router(classroom_router, prefix="/classrooms", tags=["Classrooms"])
app.include_router(finance_router, prefix="/finance", tags=["Finance"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the School Dashboard API"}
