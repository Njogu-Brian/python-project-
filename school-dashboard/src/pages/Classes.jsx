import React, { useEffect, useState } from "react";
import {
  fetchClassrooms,
  addClassroom,
  updateClassroom,
  deleteClassroom,
} from "../services/classroomService";

const Classes = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [formData, setFormData] = useState({ name: "", section: "" });
  const [editingId, setEditingId] = useState(null);

  const loadClassrooms = async () => {
    const res = await fetchClassrooms();
    setClassrooms(res.data);
  };

  useEffect(() => {
    loadClassrooms();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateClassroom(editingId, formData);
      setEditingId(null);
    } else {
      await addClassroom(formData);
    }
    setFormData({ name: "", section: "" });
    loadClassrooms();
  };

  const handleEdit = (cls) => {
    setFormData({ name: cls.name, section: cls.section });
    setEditingId(cls.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this classroom?")) {
      await deleteClassroom(id);
      loadClassrooms();
    }
  };

  return (
    <div className="container mt-4">
      <h2>📚 Classrooms</h2>

      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          name="name"
          placeholder="Classroom Name"
          className="form-control mb-2"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="section"
          placeholder="Section (e.g., Grade 5)"
          className="form-control mb-2"
          value={formData.section}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          {editingId ? "Update Classroom" : "Create Classroom"}
        </button>
      </form>

      <ul className="list-group">
        {classrooms.map((cls) => (
          <li key={cls.id} className="list-group-item d-flex justify-content-between align-items-center">
            {cls.name} — {cls.section}
            <div>
              <button onClick={() => handleEdit(cls)} className="btn btn-sm btn-secondary me-2">Edit</button>
              <button onClick={() => handleDelete(cls.id)} className="btn btn-sm btn-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Classes;
