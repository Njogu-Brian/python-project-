import api from "./axiosConfig";

// Fetch all students
export const fetchStudents = () => api.get("/students");

// Create a new student
export const addStudent = (student) => {
  return api.post("/students", {
    name: student.name,
    age: parseInt(student.age),
    grade: student.grade,
    course_ids: [1], // TODO: Replace with real course selection later
  });
};

// Update student
export const updateStudent = (id, student) => {
  return api.put(`/students/${id}`, {
    name: student.name,
    age: parseInt(student.age),
    grade: student.grade,
    course_ids: [1], // TODO: Replace with selected courses
  });
};

// Delete student
export const deleteStudent = (id) => api.delete(`/students/${id}`);
