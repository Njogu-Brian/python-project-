import api from "./axiosConfig";

export const fetchCourses = () => api.get("/courses");

export const addCourse = (course) =>
  api.post("/courses", {
    name: course.name,
    duration: parseInt(course.duration),
    teacher_id: parseInt(course.teacher_id),
  });

export const updateCourse = (id, course) =>
  api.put(`/courses/${id}`, {
    name: course.name,
    duration: parseInt(course.duration),
    teacher_id: parseInt(course.teacher_id),
  });

export const deleteCourse = (id) => api.delete(`/courses/${id}`);
