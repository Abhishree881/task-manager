import React from "react";

const TaskCounts = ({ totalTasks, completedTasks, incompleteTasks }) => {
  return (
    <div className="task-counts">
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
      <p>Incomplete Tasks: {incompleteTasks}</p>
    </div>
  );
};

export default TaskCounts;
