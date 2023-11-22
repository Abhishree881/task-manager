// App.js
import React from "react";
import TodoApp from "./TodoApp";
import { TaskProvider } from "./TaskContext";

const App = () => {
  return (
    <TaskProvider>
      <TodoApp />
    </TaskProvider>
  );
};

export default App;
