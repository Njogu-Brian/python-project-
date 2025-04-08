# api/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.database import engine, Base
from api.routes import (
    classroom_routes,
    student_routes,
    teacher_routes,
    staff_routes,
    finance_routes,
    course_routes  # ✅ Make sure this is imported
)

# ✅ Create the app FIRST before including routers
app = FastAPI(title="School Management API")

# ✅ Database table creation
Base.metadata.create_all(bind=engine)

# ✅ CORS settings to allow React frontend to talk to backend
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include your API routers (order doesn't matter)
app.include_router(classroom_routes.router, prefix="/classrooms", tags=["Classrooms"])
app.include_router(student_routes.router, prefix="/students", tags=["Students"])
app.include_router(teacher_routes.router, prefix="/teachers", tags=["Teachers"])
app.include_router(staff_routes.router, prefix="/staff", tags=["Staff"])
app.include_router(finance_routes.router, prefix="/finance", tags=["Finance"])
app.include_router(course_routes.router, prefix="/courses", tags=["Courses"])  # ✅ NEW
