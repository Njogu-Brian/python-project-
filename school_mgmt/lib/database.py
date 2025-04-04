from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Create SQLite database
engine = create_engine('sqlite:///school.db')
Session = sessionmaker(bind=engine)
session = Session()

# Base class for models
Base = declarative_base()
