# lib/db.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# ✅ Create SQLite database engine
engine = create_engine('sqlite:///school.db')

# ✅ Create a configured "Session" class
Session = sessionmaker(bind=engine)

# ✅ Create a Session instance
session = Session()

# ✅ Base class for models
Base = declarative_base()


# ✅ Function to create all tables
def init_db():
    from lib.models.classroom import Classroom
    from lib.models.student import Student
    from lib.models.enrollment import Enrollment

    Base.metadata.create_all(engine)
    print("✅ Database and tables created successfully!")
