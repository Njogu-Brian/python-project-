import React from "react";

const EditTeacherForm = ({ editingTeacher, onEditChange, onSaveEdit, onCancelEdit }) => {
    if (!editingTeacher) {
        return null; // Prevents rendering the form if there's no teacher selected
    }

    return (
        <div className="card p-3 mt-3 shadow-sm bg-light">
            <h4 className="text-center">Edit Teacher</h4>
            <form onSubmit={onSaveEdit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        value={editingTeacher?.name || ""} 
                        onChange={onEditChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="subject" 
                        value={editingTeacher?.subject || ""} 
                        onChange={onEditChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Years of Experience</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="experience" 
                        value={editingTeacher?.experience || ""} 
                        onChange={onEditChange} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={onCancelEdit}>Cancel</button>
            </form>
        </div>
    );
};

export default EditTeacherForm;
