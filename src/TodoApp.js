// TodoApp.js
import React, { useContext, useState } from "react";
import { TaskContext } from "./TaskContext";
import "./TodoApp.css"; // Import the CSS file for styling
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const TodoApp = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  const filteredTasks = (() => {
    let tasksToDisplay = state.tasks;

    switch (filter) {
      case "completed":
        tasksToDisplay = tasksToDisplay.filter((task) => task.completed);
        break;
      case "incomplete":
        tasksToDisplay = tasksToDisplay.filter((task) => !task.completed);
        break;
      default:
        break;
    }

    return tasksToDisplay.sort((a, b) => b.id - a.id);
  })();

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        id: Date.now(),
        title: newTask,
        completed: false,
      };
      dispatch({ type: "ADD_TASK", payload: newTaskObject });
      setNewTask("");
    } else {
      Swal.fire("error", "Field can not be empty", "error");
    }
  };

  const openEditDialog = (taskId, taskTitle) => {
    setEditTaskId(taskId);
    setEditTaskTitle(taskTitle);
  };

  const closeEditDialog = () => {
    setEditTaskId(null);
    setEditTaskTitle("");
  };

  const saveEditedTask = () => {
    console.log(editTaskTitle);
    if (editTaskTitle.trim() !== "") {
      dispatch({
        type: "UPDATE_TASK",
        payload: { id: editTaskId, title: editTaskTitle },
      });
      closeEditDialog();
    } else {
      Swal.fire("error", "Field can not be empty", "error");
    }
  };

  const toggleTaskCompletion = (taskId, completed) => {
    dispatch({ type: "TOGGLE_TASK", payload: { id: taskId, completed } });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter((task) => task.completed).length;
  const incompleteTasks = totalTasks - completedTasks;

  return (
    <div className="todo-app-container">
      <div className="logo-container">
        <div className="logo">T</div>
        <h1>Todo App</h1>
      </div>
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "incomplete" ? "active" : ""}
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </button>
      </div>
      <div className="task-counts">
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Incomplete Tasks: {incompleteTasks}</p>
      </div>
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
            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="add-task-container">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="add-task-button" onClick={addTask}>
          Add Task
        </button>
      </div>
      {editTaskId !== null && (
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
      )}
    </div>
  );
};

export default TodoApp;
