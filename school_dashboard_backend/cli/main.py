from db.init_db import session
from models.student import Student
from models.course import Course

def main_menu():
    while True:
        print("\n--- School Dashboard CLI ---")
        print("1. Create Course")
        print("2. List All Courses")
        print("3. Create Student")
        print("4. List All Students")
        print("5. View Students by Course")
        print("6. Delete Student")
        print("7. Delete Course")
        print("8. Exit")

        choice = input("Choose an option: ")

        if choice == "1":
            name = input("Course name: ")
            course = Course(name=name)
            session.add(course)
            session.commit()
            print(f"Course '{name}' created.")

        elif choice == "2":
            courses = session.query(Course).all()
            for c in courses:
                print(c)

        elif choice == "3":
            name = input("Student name: ")
            course_id = input("Course ID: ")
            course = session.get(Course, int(course_id))
            if course:
                student = Student(name=name, course=course)
                session.add(student)
                session.commit()
                print(f"Student '{name}' created in course '{course.name}'.")
            else:
                print("Course not found.")

        elif choice == "4":
            students = session.query(Student).all()
            for s in students:
                print(s)

        elif choice == "5":
            course_id = input("Course ID: ")
            course = session.get(Course, int(course_id))
            if course:
                for student in course.students:
                    print(student)
            else:
                print("Course not found.")

        elif choice == "6":
            student_id = input("Student ID to delete: ")
            student = session.get(Student, int(student_id))
            if student:
                session.delete(student)
                session.commit()
                print("Student deleted.")
            else:
                print("Student not found.")

        elif choice == "7":
            course_id = input("Course ID to delete: ")
            course = session.get(Course, int(course_id))
            if course:
                if course.students:
                    print("Cannot delete course with enrolled students.")
                else:
                    session.delete(course)
                    session.commit()
                    print("Course deleted.")
            else:
                print("Course not found.")

        elif choice == "8":
            print("Exiting CLI.")
            break

        else:
            print("Invalid choice.")
