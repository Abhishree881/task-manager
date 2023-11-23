import React from "react";

const EditDialog = ({
  editTaskId,
  editTaskTitle,
  setEditTaskTitle,
  saveEditedTask,
  closeEditDialog,
}) => {
  return (
    <div className="edit-dialog-overlay">
      <div className="edit-dialog">
        <p>Edit Task:</p>
        <input
          type="text"
          value={editTaskTitle}
          onChange={(e) => setEditTaskTitle(e.target.value)}
        />
        <button onClick={saveEditedTask}>Save</button>
        <button onClick={closeEditDialog}>Cancel</button>
      </div>
    </div>
  );
};

export default EditDialog;
