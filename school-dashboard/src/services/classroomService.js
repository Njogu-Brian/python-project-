import api from "./axiosConfig";

export const fetchClassrooms = () => api.get("/classrooms");
export const addClassroom = (data) => api.post("/classrooms", data);
export const updateClassroom = (id, data) => api.put(`/classrooms/${id}`, data);
export const deleteClassroom = (id) => api.delete(`/classrooms/${id}`);
