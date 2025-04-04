# api/app.py

from fastapi import FastAPI

from api.routes.classroom_routes import router as classroom_router
from api.routes.student_routes import router as student_router
from api.routes.teacher_routes import router as teacher_router
from api.routes.staff_routes import router as staff_router
from api.routes.finance_routes import router as finance_router

app = FastAPI(title="School Management API")

# Register routers
app.include_router(classroom_router, prefix="/classrooms", tags=["Classrooms"])
app.include_router(student_router, prefix="/students", tags=["Students"])
app.include_router(teacher_router, prefix="/teachers", tags=["Teachers"])
app.include_router(staff_router, prefix="/staff", tags=["Staff"])
app.include_router(finance_router, prefix="/finance", tags=["Finance"])
