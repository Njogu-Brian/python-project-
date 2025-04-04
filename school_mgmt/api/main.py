from fastapi import FastAPI
from api.database import engine, Base
from api.routes import classroom_routes, student_routes, teacher_routes, staff_routes, finance_routes

Base.metadata.create_all(bind=engine)

app = FastAPI(title="School Management API")

# Include all routers
app.include_router(classroom_routes.router, prefix="/classrooms", tags=["Classrooms"])
app.include_router(student_routes.router, prefix="/students", tags=["Students"])
app.include_router(teacher_routes.router, prefix="/teachers", tags=["Teachers"])
app.include_router(staff_routes.router, prefix="/staff", tags=["Staff"])
app.include_router(finance_routes.router, prefix="/finance", tags=["Finance"])
