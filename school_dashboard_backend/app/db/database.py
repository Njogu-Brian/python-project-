from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.db.base import Base
from app.db.session import engine

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
