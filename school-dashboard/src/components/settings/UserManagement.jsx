import React, { useState } from "react";

const UserManagement = ({ settings, setSettings }) => {
  const [users, setUsers] = useState(settings.users);
  const [newUser, setNewUser] = useState({ name: "", role: "teacher" });

  const handleAddUser = () => {
    const updatedUsers = [...users, { id: `u${users.length + 1}`, ...newUser }];

    fetch("http://localhost:4000/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...settings, users: updatedUsers }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setSettings(data);
      })
      .catch((err) => console.error("Error updating users:", err));
  };

  return (
    <div className="card p-3 mb-4">
      <h4 className="text-dark">👥 User Management</h4>

      {/* List Users */}
      <ul className="list-group mb-3">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            {user.name} - <span className="text-muted">{user.role}</span>
          </li>
        ))}
      </ul>

      {/* Add User Form */}
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="User Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <select
          className="form-select"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
        </select>
        <button className="btn btn-success" onClick={handleAddUser}>
          Add User
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
