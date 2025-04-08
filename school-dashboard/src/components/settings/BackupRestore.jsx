import React from "react";

const BackupRestore = () => {
  const handleBackup = () => {
    alert("Backup feature will be implemented soon!");
  };

  const handleRestore = () => {
    alert("Restore feature will be implemented soon!");
  };

  return (
    <div className="card p-3 mb-4">
      <h4 className="text-dark">💾 Backup & Restore</h4>
      <div className="d-flex gap-2">
        <button className="btn btn-warning flex-grow-1" onClick={handleBackup}>Backup Data</button>
        <button className="btn btn-danger flex-grow-1" onClick={handleRestore}>Restore Data</button>
      </div>
    </div>
  );
};

export default BackupRestore;
