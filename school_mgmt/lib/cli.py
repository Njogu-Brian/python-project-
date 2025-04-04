# cli.py
import click
from lib.db import init_db
from lib.models.classroom import Classroom
from lib.models.student import Student
from lib.models.enrollment import Enrollment

@click.group()
def cli():
    """🎓 School Management System CLI"""
    pass

@cli.command()
def setup():
    """Initialize the database."""
    init_db()

@cli.command()
@click.argument("name")
@click.argument("capacity", type=int)
def create_classroom(name, capacity):
    """Create a classroom."""
    classroom = Classroom.create(name, capacity)
    click.echo(f"✅ Classroom created: {classroom}")

@cli.command()
@click.argument("name")
@click.argument("age", type=int)
@click.argument("classroom_id", type=int)
def add_student(name, age, classroom_id):
    """Add a student to a classroom."""
    student = Student.create(name, age, classroom_id)
    click.echo(f"👨‍🎓 Student added: {student}")

@cli.command()
def list_students():
    """List all students."""
    students = Student.get_all()
    for student in students:
        click.echo(student)

@cli.command()
@click.argument("student_id", type=int)
@click.argument("year", type=int)
@click.argument("summary")
def enroll_student(student_id, year, summary):
    """Enroll a student with performance summary."""
    enrollment = Enrollment.create(year, summary, student_id)
    click.echo(f"📝 Enrolled: {enrollment}")

@cli.command()
@click.argument("student_id", type=int)
def delete_student(student_id):
    """Delete a student by ID."""
    student = Student.find_by_id(student_id)
    if student:
        student.delete()
        click.echo(f"🗑️ Deleted student ID {student_id}")
    else:
        click.echo("❌ Student not found.")

if __name__ == "__main__":
    cli()
