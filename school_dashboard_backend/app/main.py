from fastapi import FastAPI
from app.db.init_db import init_db
from app.routers import students, teachers, courses, finance

app = FastAPI()

# Initialize the database (creates tables)
init_db()

# Register routers
app.include_router(students.router, prefix="/students", tags=["Students"])
app.include_router(teachers.router, prefix="/teachers", tags=["Teachers"])
app.include_router(courses.router, prefix="/courses", tags=["Courses"])
app.include_router(finance.router, prefix="/finance", tags=["Finance"])

@app.get("/")
def root():
    return {"message": "Welcome to the School Dashboard API"}
