import React, { useState, useEffect } from "react";
import TeacherList from "../components/teachers/TeacherList";
import AddTeacherForm from "../components/teachers/AddTeacherForm";
import EditTeacherForm from "../components/teachers/EditTeacherForm";
import {
  fetchTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../services/teacherService";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);

  // Load teachers from backend
  const loadTeachers = async () => {
    try {
      const res = await fetchTeachers();
      setTeachers(res.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleAddTeacher = async (teacherData) => {
    try {
      await addTeacher(teacherData);
      loadTeachers();
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const handleEditChange = (e) => {
    setEditingTeacher({
      ...editingTeacher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await updateTeacher(editingTeacher.id, editingTeacher);
      setEditingTeacher(null);
      loadTeachers();
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await deleteTeacher(id);
      setTeachers((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">👩‍🏫 Teachers Management</h2>
      <AddTeacherForm onAddTeacher={handleAddTeacher} />
      {editingTeacher && (
        <EditTeacherForm
          editingTeacher={editingTeacher}
          onEditChange={handleEditChange}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={() => setEditingTeacher(null)}
        />
      )}
      <TeacherList
        teachers={teachers}
        onEditClick={setEditingTeacher}
        onDeleteClick={handleDeleteTeacher}
      />
    </div>
  );
};

export default Teachers;
