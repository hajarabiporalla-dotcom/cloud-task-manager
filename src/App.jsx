import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <div className="container">
        <h1>☁️ Cloud Task Manager</h1>
        <p className="subtitle">
          Manage your student tasks efficiently
        </p>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Add your first task!</p>
          ) : (
            tasks.map((item) => (
              <div className="task" key={item.id}>
                <span
                  className={item.completed ? "completed" : ""}
                  onClick={() => toggleTask(item.id)}
                >
                  {item.title}
                </span>

                <div>
                  <button
                    className="complete-btn"
                    onClick={() => toggleTask(item.id)}
                  >
                    {item.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="footer">
          <p>
            Tasks: <strong>{tasks.length}</strong>
          </p>

          <p>
            Completed:{" "}
            <strong>
              {tasks.filter((item) => item.completed).length}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;