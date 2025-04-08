import React, { useState } from "react";

const GeneralSettings = ({ settings, setSettings }) => {
  const [schoolName, setSchoolName] = useState(settings.school_name);
  const [academicYear, setAcademicYear] = useState(settings.academic_year);

  const handleSave = () => {
    const updatedSettings = { ...settings, school_name: schoolName, academic_year: academicYear };

    fetch("http://localhost:4000/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSettings),
    })
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error updating settings:", err));
  };

  return (
    <div className="card p-3 mb-4">
      <h4 className="text-dark">📌 General Settings</h4>
      <div className="mb-3">
        <label className="form-label">School Name</label>
        <input
          className="form-control"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Academic Year</label>
        <input
          className="form-control"
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
        />
      </div>
      <button className="btn btn-primary w-100" onClick={handleSave}>Save</button>
    </div>
  );
};

export default GeneralSettings;
