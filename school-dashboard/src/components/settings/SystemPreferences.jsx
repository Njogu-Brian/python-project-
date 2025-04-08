import React, { useState } from "react";

const SystemPreferences = ({ settings, setSettings }) => {
  const [theme, setTheme] = useState(settings.theme);

  const handleSave = () => {
    const updatedSettings = { ...settings, theme };

    fetch("http://localhost:4000/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSettings),
    })
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error updating theme:", err));
  };

  return (
    <div className="card p-3 mb-4">
      <h4 className="text-dark">🎨 System Preferences</h4>
      <label className="form-label">Theme:</label>
      <select className="form-select mb-3" value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <button className="btn btn-primary w-100" onClick={handleSave}>Save</button>
    </div>
  );
};

export default SystemPreferences;
