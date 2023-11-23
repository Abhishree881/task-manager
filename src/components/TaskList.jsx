import React from "react";

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
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task.id, task.completed)}
          />
          {task.completed ? (
            <span className="completed-task">{task.title}</span>
          ) : (
            <span>{task.title}</span>
          )}
          <button
            className="edit-button"
            onClick={() => openEditDialog(task.id, task.title)}
          >
            Edit
          </button>
          <button className="delete-button" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
