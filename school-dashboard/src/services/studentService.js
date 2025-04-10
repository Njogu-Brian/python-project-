import api from "./axiosConfig";

// Fetch all students
export const fetchStudents = () => api.get("/students");

// Create a new student
export const addStudent = (student) =>
  api.post("/students", {
    name: student.name,
    classroom_id: parseInt(student.classroom_id),
  });

// Update student
export const updateStudent = (id, student) => {
  return api.put(`/students/${id}`, {
    name: student.name,
    classroom_id: parseInt(student.classroom_id),
    // course_ids: [1], // Optional: add later if needed
  });
};

// Delete student
export const deleteStudent = (id) => api.delete(`/students/${id}`);
