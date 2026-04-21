import { useState, useEffect } from "react";
import "./App.css";

import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

// Load tasks from localStorage
const getInitialTasks = () => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
};

function App() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = () => {
    if (!newTask.trim()) return;

    const newTaskObject = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObject]);
    setNewTask("");
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task
  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updated);
  };

  // Edit task
  const editTask = (id, newText) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, text: newText }
        : task
    );

    setTasks(updated);
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <TaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        onAdd={addTask}
      />

      {/* Filters */}
      <div className="filters">
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
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;