import React from "react";

const EditStudentForm = ({ editingStudent, classrooms, onEditChange, onSaveEdit, onCancelEdit }) => {
  return (
    <form onSubmit={onSaveEdit} style={{ marginBottom: "20px", background: "#f4f4f4", padding: "10px" }}>
      <h3>Editing {editingStudent.name}</h3>
      <input type="text" name="name" value={editingStudent.name} onChange={onEditChange} required />
      <select
        name="classroom_id"
        value={editingStudent.classroom_id}
        onChange={onEditChange}
        required
      >
        <option value="">Select a class</option>
        {classrooms.map((classroom) => (
          <option key={classroom.id} value={classroom.id}>
            {classroom.name}
          </option>
        ))}
      </select>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancelEdit}>Cancel</button>
    </form>
  );
};

export default EditStudentForm;
