import React from "react";

const EditStudentForm = ({ editingStudent, onEditChange, onSaveEdit, onCancelEdit }) => {
    return (
        <form onSubmit={onSaveEdit} style={{ marginBottom: "20px", background: "#f4f4f4", padding: "10px" }}>
            <h3>Editing {editingStudent.name}</h3>
            <input type="text" name="name" value={editingStudent.name} onChange={onEditChange} required />
            <input type="number" name="age" value={editingStudent.age} onChange={onEditChange} required />
            <input type="text" name="grade" value={editingStudent.grade} onChange={onEditChange} required />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onCancelEdit}>Cancel</button>
        </form>
    );
};

export default EditStudentForm;
