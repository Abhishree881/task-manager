import React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const TaskList = ({
  filteredTasks,
  toggleTaskCompletion,
  openEditDialog,
  deleteTask,
}) => {
  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <div className="task">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id, task.completed)}
            />
            {task.completed ? (
              <span className="completed-task">{task.title}</span>
            ) : (
              <span>{task.title}</span>
            )}
          </div>
          <div className="task-buttons">
            <EditNoteIcon
              className="edit-button"
              onClick={() => openEditDialog(task.id, task.title)}
            />
            <DeleteOutlineIcon
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
