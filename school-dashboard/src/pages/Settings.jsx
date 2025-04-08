import React, { useState, useEffect } from "react";
import GeneralSettings from "../components/settings/GeneralSettings";
import UserManagement from "../components/settings/UserManagement";
import SystemPreferences from "../components/settings/SystemPreferences";
import BackupRestore from "../components/settings/BackupRestore";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const Settings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-primary">⚙️ Settings</h2>

      {settings ? (
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            <GeneralSettings settings={settings} setSettings={setSettings} />
            <UserManagement settings={settings} setSettings={setSettings} />
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <SystemPreferences settings={settings} setSettings={setSettings} />
            <BackupRestore />
          </div>
        </div>
      ) : (
        <p>Loading settings...</p>
      )}
    </div>
  );
};

export default Settings;
