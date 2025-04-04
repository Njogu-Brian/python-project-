# cli.py

import click
from lib.db import init_db
from lib.models.classroom import Classroom
from lib.models.student import Student
from lib.models.enrollment import Enrollment
from lib.models.teacher import Teacher
from lib.models.staff import Staff
from lib.models.finance import Finance

@click.group()
def cli():
    """🎓 School Management CLI"""
    pass

# -------- INIT --------
@cli.command()
def init():
    """Initialize the database and create tables."""
    init_db()
    click.echo("✅ Database initialized successfully!")

# -------- CLASSROOM COMMANDS --------
@cli.command()
@click.argument("name")
@click.argument("capacity", type=int)
def add_classroom(name, capacity):
    """Add a new classroom."""
    classroom = Classroom.create(name, capacity)
    click.echo(f"✅ Created classroom: {classroom}")

@cli.command()
def list_classrooms():
    """List all classrooms."""
    classrooms = Classroom.get_all()
    for c in classrooms:
        click.echo(f"{c.id}: {c.name} ({c.capacity} students)")

# -------- STUDENT COMMANDS --------
@cli.command()
@click.argument("name")
@click.argument("age", type=int)
@click.argument("classroom_id", type=int)
def add_student(name, age, classroom_id):
    """Add a new student."""
    student = Student.create(name, age, classroom_id)
    click.echo(f"✅ Created student: {student}")

@cli.command()
def list_students():
    """List all students."""
    students = Student.get_all()
    for s in students:
        click.echo(f"{s.id}: {s.name}, Age: {s.age}, Classroom ID: {s.classroom_id}")

# -------- ENROLLMENT COMMANDS --------
@cli.command()
@click.argument("year", type=int)
@click.argument("summary")
@click.argument("student_id", type=int)
def enroll_student(year, summary, student_id):
    """Enroll a student with a performance summary."""
    enrollment = Enrollment.create(year, summary, student_id)
    click.echo(f"✅ Enrolled student {student_id} for year {year}")

@cli.command()
def list_enrollments():
    """List all enrollments."""
    enrollments = Enrollment.get_all()
    for e in enrollments:
        click.echo(f"{e.id}: Student ID {e.student_id}, Year {e.year} - {e.summary}")

# -------- FINANCE COMMANDS --------
@cli.command()
@click.argument("student_id", type=int)
@click.argument("term")
@click.argument("amount_paid", type=float)
def add_payment(student_id, term, amount_paid):
    """Record a fee payment."""
    payment = Finance.create(student_id, term, amount_paid)
    click.echo(f"✅ Payment recorded: {payment}")

@cli.command()
def list_payments():
    """List all fee payments."""
    payments = Finance.get_all()
    for p in payments:
        click.echo(f"{p.id}: Student {p.student_id}, Term {p.term}, Paid {p.amount_paid}")

# -------- STAFF COMMANDS --------
@cli.command()
@click.argument("name")
@click.argument("role")
def add_staff(name, role):
    """Add a staff member."""
    staff = Staff.create(name, role)
    click.echo(f"✅ Added staff: {staff}")

@cli.command()
def list_staff():
    """List all staff members."""
    staff_list = Staff.get_all()
    for s in staff_list:
        click.echo(f"{s.id}: {s.name} - {s.role}")

# -------- TEACHER COMMANDS --------
@cli.command()
@click.argument("name")
@click.argument("subject")
@click.argument("classroom_id", type=int)
def add_teacher(name, subject, classroom_id):
    """Add a teacher to a classroom."""
    teacher = Teacher.create(name, subject, classroom_id)
    click.echo(f"✅ Created teacher: {teacher}")

@cli.command()
def list_teachers():
    """List all teachers."""
    teachers = Teacher.get_all()
    for t in teachers:
        click.echo(f"{t.id}: {t.name} teaches {t.subject} in Classroom {t.classroom_id}")

# ✅ Entry Point
if __name__ == "__main__":
    cli()
