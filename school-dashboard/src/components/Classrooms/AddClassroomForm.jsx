import React, { useState } from "react";
import { createClassroom, updateClassroom, deleteClassroom } from "../../services/classroomService";

const AddClassroomForm = ({ onCreated, classrooms, refresh }) => {
  const [form, setForm] = useState({ id: null, name: "", section: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (form.id) {
      await updateClassroom(form.id, {
        name: form.name,
        section: form.section,
      });
    } else {
      await createClassroom({
        name: form.name,
        section: form.section,
      });
    }
  
    setForm({ id: null, name: "", section: "" });
    refresh();
  };
  

  const handleEdit = (cls) => {
    setForm(cls);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this classroom?")) {
      await deleteClassroom(id);
      refresh();
    }
  };

  return (
    <div className="card p-3 shadow-sm mb-4">
      <h5>{form.id ? "Edit Classroom" : "Add Classroom"}</h5>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Classroom Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="section"
          placeholder="Section (e.g., Grade 5)"
          value={form.section}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-100" type="submit">
          {form.id ? "Update" : "Create"} Classroom
        </button>
      </form>

      {classrooms.length > 0 && (
        <ul className="list-group">
          {classrooms.map((cls) => (
            <li key={cls.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{cls.name} — {cls.section}</span>
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(cls)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cls.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddClassroomForm;
