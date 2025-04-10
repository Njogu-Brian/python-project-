import api from "./axiosConfig";

// Get all teachers
export const fetchTeachers = () => api.get("/teachers");

// Add a new teacher
export const addTeacher = (teacher) =>
  api.post("/teachers", {
    name: teacher.name,
    experience: parseInt(teacher.experience),
  });

// Update teacher
export const updateTeacher = (id, teacher) =>
  api.put(`/teachers/${id}`, {
    name: teacher.name,
    experience: parseInt(teacher.experience),
  });

// Delete teacher
export const deleteTeacher = (id) => api.delete(`/teachers/${id}`);
